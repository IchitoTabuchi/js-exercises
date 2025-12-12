// テキスト P610 ~ 620 のコードを写経
class Tile {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  static *tiles(width, height, numRows, numCols) {
    const columnWidth = Math.ceil(width / numCols);
    const rowHeight = Math.ceil(height / numRows);

    for (let row = 0; row < numRows; row++) {
      const tileHeight =
        row < numRows - 1 ? rowHeight : height - row * (numRows - 1);
      for (let col = 0; col < numCols; col++) {
        const tileWidth =
          col < numCols - 1 ? columnWidth : width - columnWidth * (numCols - 1);

        yield new Tile(
          col * columnWidth,
          row * rowHeight,
          tileWidth,
          tileHeight
        );
      }
    }
  }
}

class WorkerPool {
  constructor(numWorkers, workerSource) {
    this.idleWorkers = [];
    this.workQueue = [];
    this.workerMap = new Map();

    for (let i = 0; i < numWorkers; i++) {
      const worker = new Worker(workerSource);
      worker.onmessage = (message) => {
        this._workerDone(worker, null, message.data);
      };

      worker.onerror = (error) => {
        this._workerDone(worker, error, null);
      };
      this.idleWorkers[i] = worker;
    }
  }

  _workerDone(worker, error, response) {
    const [resolver, rejector] = this.workerMap.get(worker);
    this.workerMap.delete(worker);

    if (this.workQueue.length === 0) {
      this.idleWorkers.push(worker);
    } else {
      const [work, resolver, rejector] = this.workQueue.shift();
      this.workerMap.set(worker, [resolver, rejector]);
      worker.postMessage(work);
    }
    error === null ? resolver(response) : rejector(error);
  }

  addWork(work) {
    return new Promise((resolve, reject) => {
      if (this.idleWorkers.length > 0) {
        const worker = this.idleWorkers.pop();
        this.workerMap.set(worker, [resolve, reject]);
        worker.postMessage(work);
      } else {
        this.workQueue.push([work, resolve, reject]);
      }
    });
  }
}

class PageState {
  static initialState() {
    const s = new PageState();
    s.cx = -0.5;
    s.cy = 0;
    s.perPixel = 3 / window.innerHeight;
    s.maxIntegrations = 500;
    return s;
  }

  static fromURL(url) {
    const s = new PageState();
    const u = new URL(url);
    s.cx = parseFloat(u.searchParams.get('cx'));
    s.cy = parseFloat(u.searchParams.get('cy'));
    s.perPixel = parseFloat(u.searchParams.get('pp'));
    s.maxIntegrations = parseInt(u.searchParams.get('it'));
    return isNaN(s.cx) ||
      isNaN(s.cy) ||
      isNaN(s.perPixel) ||
      isNaN(s.maxIntegrations)
      ? null
      : s;
  }

  toURL() {
    const u = new URL(window.location);
    u.searchParams.set('cx', this.cx);
    u.searchParams.set('cy', this.cy);
    u.searchParams.set('pp', this.perPixel);
    u.searchParams.set('it', this.maxIntegrations);
    return u.href;
  }
}

const ROWS = 3,
  COLS = 4,
  NUMWORKERS = navigator.hardwareConcurrency || 2;

class MandelbrotCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.workerPool = new WorkerPool(NUMWORKERS, 'mandelbrotWorker.js');

    this.tiles = null;
    this.pendingRerender = null;
    this.wantRerender = false;
    this.resizeTimer = null;
    this.colorTable = null;

    this.canvas.addEventListener('pointerdown', (e) => this.handlePointer(e));
    window.addEventListener('keydown', (e) => this.handleKey(e));
    window.addEventListener('resize', () => this.handleResize());
    window.addEventListener('popstate', (e) =>
      this.handlePopState(e.state, false)
    );

    this.state = PageState.fromURL(window.location) || PageState.initialState();

    history.replaceState(this.state, '', this.state.toURL());

    this.setSize();

    this.render();
  }

  setSize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.tiles = [...Tile.tiles(this.width, this.height, ROWS, COLS)];
  }

  setState(f, save = true) {
    if (typeof f === 'function') {
      f(this.state);
    } else {
      for (const property in f) {
        this.state[property] = f[property];
      }
    }

    this.render();

    if (save) {
      history.pushState(this.state, '', this.state.toURL());
    }
  }

  render() {
    if (this.pendingRerender) {
      this.wantsRerender = true;
      return;
    }

    const { cx, cy, perPixel, maxIntegrations } = this.state;
    const x0 = cx - perPixel * (this.width / 2);
    const y0 = cy - perPixel * (this.height / 2);

    const promises = this.tiles.map((tile) =>
      this.workerPool.addWork({
        tile: tile,
        x0: x0 + tile.x * perPixel,
        y0: y0 + tile.y * perPixel,
        perPixel: perPixel,
        maxIntegrations: maxIntegrations,
      })
    );

    this.pendingRerender = Promise.all(promises)
      .then((responses) => {
        let min = maxIntegrations,
          max = 0;
        for (const r of responses) {
          if (r.min < min) min = r.min;
          if (r.max > max) max = r.max;
        }

        if (
          !this.colorTable ||
          this.colorTable.length !== maxIntegrations + 1
        ) {
          this.colorTable = new Uint32Array(maxIntegrations + 1);
        }

        if (min === max) {
          if (min === maxIntegrations) {
            this.colorTable[min] = 0xff000000;
          } else {
            this.colorTable[min] = 0;
          }
        } else {
          const maxlog = Math.log(1 + max - min);
          for (let i = min; i <= max; i++) {
            this.colorTable[i] = ((Math.log(1 + i - min) / maxlog) * 255) << 24;
          }
        }

        for (const r of responses) {
          const integrations = new Uint32Array(r.imageData.data.buffer);
          for (let i = 0; i < integrations.length; i++) {
            integrations[i] = this.colorTable[integrations[i]];
          }
        }

        this.canvas.style.transform = '';
        for (const r of responses) {
          this.context.putImageData(r.imageData, r.tile.x, r.tile.y);
        }
      })
      .catch((reason) => {
        console.error('Promise rejected in render():', reason);
      })
      .finally(() => {
        this.pendingRerender = null;
        if (this.wantsRerender) {
          this.wantsRerender = false;
          this.render();
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleResize(event) {
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
    this.resizeTimer = setTimeout(() => {
      this.setSizeTimer = null;
      this.setSize();
      this.render();
    }, 200);
  }

  handleKey(event) {
    switch (event.key) {
      case 'Escape':
        this.setState(PageState.initialState());
        break;
      case '+':
        this.setState((s) => {
          s.maxIntegrations = Math.round(s.maxIntegrations * 1.5);
        });
        break;
      case '-':
        this.setState((s) => {
          s.maxIntegrations = Math.round(s.maxIntegrations / 1.5);
          if (s.maxIntegrations < 1) s.maxIntegrations = 1;
        });
        break;
      case 'o':
        this.setState((s) => (s.perPixel *= 2));
        break;
      case 'ArrowUp':
        this.setState((s) => (s.cy -= (this.height / 10) * s.perPixel));
        break;
      case 'ArrowDown':
        this.setState((s) => (s.cy += (this.height / 10) * s.perPixel));
        break;
      case 'ArrowLeft':
        this.setState((s) => (s.cx -= (this.width / 10) * s.perPixel));
        break;
      case 'ArrowRight':
        this.setState((s) => (s.cx += (this.width / 10) * s.perPixel));
        break;
    }
  }

  handlePointer(event) {
    const x0 = event.clientX,
      y0 = event.clientY,
      t0 = Date.now();

    const pointerMoveHandler = (event) => {
      const dx = event.clientX - x0,
        dy = event.clientY - y0,
        dt = Date.now() - t0;

      if (dx > 10 || dy > 10 || dt > 500) {
        this.canvas.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    const pointerUpHandler = (event) => {
      this.canvas.removeEventListener('pointermove', pointerMoveHandler);
      this.canvas.removeEventListener('pointerup', pointerUpHandler);

      const dx = event.clientX - x0,
        dy = event.clientY - y0,
        dt = Date.now() - t0;

      const { cx, cy, perPixel } = this.state;

      if (dx > 10 || dy > 10 || dt > 500) {
        this.setState({ cx: cx - dx * perPixel, cy: cy - dy * perPixel });
      } else {
        const cdx = x0 - this.width / 2;
        const cdy = y0 - this.height / 2;

        this.canvas.style.transform = `translate(${-cdx * 2}px, ${-cdy * 2}px) scale(2)`;

        this.setState((s) => {
          s.cx += cdx * s.perPixel;
          s.cy += cdy * s.perPixel;
          s.perPixel /= 2;
        });
      }
    };
    this.canvas.addEventListener('pointermove', pointerMoveHandler);
    this.canvas.addEventListener('pointerup', pointerUpHandler);
  }
}

const canvas = document.createElement('canvas');
document.body.append(canvas);
document.body.style = 'margin:0';
canvas.style.width = '100%';
canvas.style.height = '100%';

new MandelbrotCanvas(canvas);

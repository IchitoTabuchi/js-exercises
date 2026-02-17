/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = {
    /***/ './constants.js':
      /*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ COLS: () => /* binding */ COLS,
          /* harmony export */ RESOLUTION: () => /* binding */ RESOLUTION,
          /* harmony export */ ROWS: () => /* binding */ ROWS,
          /* harmony export */
        });
        const ROWS = 50;
        const COLS = 50;
        const RESOLUTION = 10;

        /***/
      },

    /***/ './renderGrid.js':
      /*!***********************!*\
  !*** ./renderGrid.js ***!
  \***********************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ renderGrid: () => /* binding */ renderGrid,
          /* harmony export */
        });
        /* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./constants.js */ './constants.js');

        // grid を canvas に描画する
        function renderGrid(grid, ctx) {
          for (
            let row = 0;
            row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS;
            row++
          ) {
            for (
              let col = 0;
              col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS;
              col++
            ) {
              const cell = grid[row][col];
              ctx.beginPath();
              ctx.rect(
                col * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION,
                row * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION,
                _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION,
                _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION
              );
              ctx.fillStyle = cell ? 'black' : 'white';
              ctx.fill();
              ctx.stroke();
            }
          }
        }

        /***/
      },

    /***/ './updateGrid.js':
      /*!***********************!*\
  !*** ./updateGrid.js ***!
  \***********************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ updateGrid: () => /* binding */ updateGrid,
          /* harmony export */
        });
        /* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./constants.js */ './constants.js');

        // Life Game のルールに従ってセルを更新する
        function updateGrid(grid) {
          // 新しいグリッドを作成
          const nextGrid = grid.map((arr) => [...arr]);

          for (
            let row = 0;
            row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS;
            row++
          ) {
            for (
              let col = 0;
              col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS;
              col++
            ) {
              // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する
              // 自分自身を除く周囲8セルを調べる
              let aliveCount = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (dy === 0 && dx === 0) {
                    continue;
                  } // 自分自身は除外
                  const r = row + dy;
                  const c = col + dx;
                  if (
                    r < 0 ||
                    r >= _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS ||
                    c < 0 ||
                    c >= _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS
                  ) {
                    continue;
                  } // 境界外は無視
                  if (grid[r][c]) {
                    aliveCount++;
                  } // 生存セルであればカウント
                }
              }
              const centerIsAlive = grid[row][col]; // 中央のセルの状態 (true: 生存, false: 死亡)
              // ライフゲームの基本ルール
              // 誕生: 死亡セルの周囲にちょうど3つの生存セル -> 中央のセルは生存状態になる
              // 生存: 生存セルの周囲に2または3つの生存セル -> 中央のセルは生存状態のまま
              // 過疎/過密: それ以外 -> 中央のセルは死亡する
              if (!centerIsAlive && aliveCount === 3) {
                nextGrid[row][col] = true; // 誕生
              } else if (
                centerIsAlive &&
                (aliveCount === 2 || aliveCount === 3)
              ) {
                nextGrid[row][col] = true; // 生存
              } else {
                nextGrid[row][col] = false; // 過疎/過密で死亡
              }
            }
          }
          return nextGrid;
        }

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
  (() => {
    /*!******************!*\
  !*** ./index.js ***!
  \******************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(/*! ./constants.js */ './constants.js');
    /* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(/*! ./updateGrid.js */ './updateGrid.js');
    /* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(/*! ./renderGrid.js */ './renderGrid.js');

    const canvas = document.querySelector('#screen');
    const ctx = canvas.getContext('2d');
    const startButton = document.querySelector('#start');
    const pauseButton = document.querySelector('#pause');

    canvas.width =
      _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS *
      _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;
    canvas.height =
      _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS *
      _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;

    // https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
    let animationId = null;

    // NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
    const sound = new Audio('decision1.mp3');

    // ライフゲームのセル (true or false) をランダムに初期化する
    let grid = new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS)
      .fill(null)
      .map(() =>
        new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS)
          .fill(null)
          .map(() => !!Math.floor(Math.random() * 2))
      );

    // canvas がクリックされたときの処理 (セルの値を反転する)
    canvas.addEventListener('click', (evt) => {
      const rect = canvas.getBoundingClientRect();
      const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

      const row = Math.floor(
        pos.y / _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION
      );
      const col = Math.floor(
        pos.x / _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION
      );
      grid[row][col] = !grid[row][col];
      sound.cloneNode().play();
      (0, _renderGrid_js__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(grid, ctx);
    });

    // requestAnimationFrame によって一定間隔で更新・描画を行う
    // 経過時間を計測して更新を一定間隔 (TARGET_FPS) に制限する
    const TARGET_FPS = 10; // 1秒あたりの更新回数
    const FRAME_INTERVAL = 1000 / TARGET_FPS; // ミリ秒間隔
    let lastTime = 0; // 前回更新基準時刻 (ms)

    function update(timestamp) {
      if (!lastTime) {
        lastTime = timestamp;
      } // 初回フレームで基準時間を設定
      const elapsed = timestamp - lastTime; // 前回フレームからの経過時間 (ms)

      // FRAME_INTERVAL の時間が経過したら盤面を1ステップ進める
      if (elapsed >= FRAME_INTERVAL) {
        // ドリフト補正: ドリフト(繰り返し処理のタイミングが少しずつずれていく現象)を防ぐため、過剰な経過時間の余りを次フレーム基準に残す
        lastTime = timestamp - (elapsed % FRAME_INTERVAL);
        grid = (0, _updateGrid_js__WEBPACK_IMPORTED_MODULE_1__.updateGrid)(
          grid
        ); // セルの論理更新
        (0, _renderGrid_js__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(grid, ctx); // 画面描画
      }

      // 次フレームのコールを予約する
      animationId = requestAnimationFrame(update);
    }

    startButton.addEventListener('click', () => {
      // 既にアニメーションが動いている場合は何もしない
      if (animationId) {
        return;
      }
      update();
    });

    pauseButton.addEventListener('click', () => {
      // アニメーションが停止している場合は何もしない
      if (!animationId) {
        return;
      }
      cancelAnimationFrame(animationId);
      animationId = null;
    });

    (0, _renderGrid_js__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(grid, ctx);
  })();

  /******/
})();
//# sourceMappingURL=bundle.js.map

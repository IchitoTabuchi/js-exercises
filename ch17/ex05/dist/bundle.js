(() => {
  'use strict';
  const t = 10;
  function e(e, n) {
    for (let l = 0; l < 50; l++)
      for (let o = 0; o < 50; o++) {
        const c = e[l][o];
        (n.beginPath(),
          n.rect(o * t, l * t, t, t),
          (n.fillStyle = c ? 'black' : 'white'),
          n.fill(),
          n.stroke());
      }
  }
  const n = document.querySelector('#screen'),
    l = n.getContext('2d'),
    o = document.querySelector('#start'),
    c = document.querySelector('#pause');
  ((n.width = 500), (n.height = 500));
  let r = null;
  const i = new Audio('decision1.mp3');
  let a = new Array(50)
    .fill(null)
    .map(() =>
      new Array(50).fill(null).map(() => !!Math.floor(2 * Math.random()))
    );
  n.addEventListener('click', (o) => {
    const c = n.getBoundingClientRect(),
      r = o.clientX - c.left,
      s = o.clientY - c.top,
      u = Math.floor(s / t),
      f = Math.floor(r / t);
    ((a[u][f] = !a[u][f]), i.cloneNode().play(), e(a, l));
  });
  let s = 0;
  function u(t) {
    s || (s = t);
    const n = t - s;
    (n >= 100 &&
      ((s = t - (n % 100)),
      (a = (function (t) {
        const e = t.map((t) => [...t]);
        for (let n = 0; n < 50; n++)
          for (let l = 0; l < 50; l++) {
            let o = 0;
            for (let e = -1; e <= 1; e++)
              for (let c = -1; c <= 1; c++) {
                if (0 === e && 0 === c) continue;
                const r = n + e,
                  i = l + c;
                r < 0 || r >= 50 || i < 0 || i >= 50 || (t[r][i] && o++);
              }
            const c = t[n][l];
            e[n][l] = (!c && 3 === o) || !(!c || (2 !== o && 3 !== o));
          }
        return e;
      })(a)),
      e(a, l)),
      (r = requestAnimationFrame(u)));
  }
  (o.addEventListener('click', () => {
    r || u();
  }),
    c.addEventListener('click', () => {
      r && (cancelAnimationFrame(r), (r = null));
    }),
    e(a, l));
})();

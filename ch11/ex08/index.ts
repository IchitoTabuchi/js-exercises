import { performance } from 'node:perf_hooks';

const n = Number(process.argv[2] ?? 50);
const s = 'a'.repeat(n) + '!';
const re = /^(a|aa)+$/;

console.log({ n, length: s.length });

const t0 = performance.now();
const ok = re.test(s);
const t1 = performance.now();

console.log({ ok, ms: Math.round(t1 - t0) });

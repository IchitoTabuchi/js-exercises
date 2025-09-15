import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  readdirPromise,
  readdirPromisified,
  statPromise,
  statPromisified,
} from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Promise vs promisify results', () => {
  const cases = [
    {
      name: 'readdir',
      promiseFn: () => readdirPromise(__dirname),
      promisifyFn: () => readdirPromisified(__dirname, 'utf8'),
    },
    {
      name: 'stat',
      promiseFn: () => statPromise(__filename),
      promisifyFn: () => statPromisified(__filename),
    },
  ];

  for (const { name, promiseFn, promisifyFn } of cases) {
    test(`${name}: Promise constructor and promisify give same result`, async () => {
      const r1 = await promiseFn();
      const r2 = await promisifyFn();
      expect(r1).toEqual(r2);
    });
  }
});

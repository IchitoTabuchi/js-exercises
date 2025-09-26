/* eslint-disable no-irregular-whitespace */
import * as fs from 'fs/promises';
import { tmpdir } from 'os';
import * as path from 'path';
import { walk } from './index.ts';
describe('walk (async generator)', () => {
    let testDir;
    beforeAll(async () => {
        // 一時ディレクトリを作成
        testDir = await fs.mkdtemp(path.join(tmpdir(), 'walk-test-'));
        // NOTE: walk に与えたパスが以下のようなディレクトリ・ファイルを持つ時を考える
        // .
        // ├── A
        // ├── B
        // │   └── C
        // │       └── buz.txt
        // └── foo.txt
        //
        // この時 `walk` は以下を返す (順序は任意):
        // - { path: "A", isDirectory: true }
        // - { path: "B", isDirectory: true }
        // - { path: "B/C", isDirectory: true }
        // - { path: "B/C/buz.txt", isDirectory: false }
        // - { path: "foo.txt", isDirectory: false }
        // ディレクトリ構造を作成
        await fs.mkdir(path.join(testDir, 'A'));
        await fs.mkdir(path.join(testDir, 'B'));
        await fs.mkdir(path.join(testDir, 'B', 'C'));
        await fs.writeFile(path.join(testDir, 'foo.txt'), 'foo');
        await fs.writeFile(path.join(testDir, 'B', 'C', 'buz.txt'), 'buz');
    });
    afterAll(async () => {
        await fs.rm(testDir, { recursive: true, force: true });
    });
    it('should return all entries recursively', async () => {
        const entries = [];
        for await (const entry of walk(testDir)) {
            const relativePath = path.relative(testDir, entry.path) || '.';
            entries.push({ path: relativePath, isDirectory: entry.isDirectory });
        }
        const withoutRoot = entries.filter((e) => e.path !== '.');
        const expected = [
            { path: 'A', isDirectory: true },
            { path: 'B', isDirectory: true },
            { path: path.join('B', 'C'), isDirectory: true },
            { path: path.join('B', 'C', 'buz.txt'), isDirectory: false },
            { path: 'foo.txt', isDirectory: false },
        ];
        // 順序は任意なので、sortして比較する
        const sortFn = (a, b) => a.path.localeCompare(b.path);
        expect(withoutRoot.sort(sortFn)).toEqual(expected.sort(sortFn));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNENBQTRDO0FBQzVDLE9BQU8sS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDNUIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVsQyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLElBQUksT0FBZSxDQUFDO0lBRXBCLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNuQixjQUFjO1FBQ2QsT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFFOUQsOENBQThDO1FBQzlDLElBQUk7UUFDSixRQUFRO1FBQ1IsUUFBUTtRQUNSLFlBQVk7UUFDWixzQkFBc0I7UUFDdEIsY0FBYztRQUNkLEVBQUU7UUFDRiw2QkFBNkI7UUFDN0IscUNBQXFDO1FBQ3JDLHFDQUFxQztRQUNyQyx1Q0FBdUM7UUFDdkMsZ0RBQWdEO1FBQ2hELDRDQUE0QztRQUU1QyxjQUFjO1FBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RCxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRSxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNsQixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNyRCxNQUFNLE9BQU8sR0FBNkMsRUFBRSxDQUFDO1FBRTdELElBQUksS0FBSyxFQUFFLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDL0QsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRTFELE1BQU0sUUFBUSxHQUFHO1lBQ2YsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7WUFDaEMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7WUFDaEMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtZQUNoRCxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUM1RCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtTQUN4QyxDQUFDO1FBRUYsc0JBQXNCO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBbUIsRUFBRSxDQUFtQixFQUFFLEVBQUUsQ0FDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=
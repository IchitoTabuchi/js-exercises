import * as fs from 'node:fs/promises';
import * as path from 'node:path';
export async function* walk(rootPath) {
    const stats = await fs.stat(rootPath);
    const isDirectory = stats.isDirectory();
    yield { path: rootPath, isDirectory };
    if (isDirectory) {
        const entries = await fs.readdir(rootPath);
        for (const entry of entries) {
            const fullPath = path.join(rootPath, entry);
            yield* walk(fullPath);
        }
    }
}
// ディレクトリでもファイルでもない場合も処理する。
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sS0FBSyxJQUFJLE1BQU0sV0FBVyxDQUFDO0FBT2xDLE1BQU0sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFnQjtJQUMxQyxNQUFNLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXhDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBRXRDLElBQUksV0FBVyxFQUFFLENBQUM7UUFDaEIsTUFBTSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEtBQUssTUFBTSxLQUFLLElBQUksT0FBTyxFQUFFLENBQUM7WUFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUVELDJCQUEyQiJ9
import * as fs from 'fs';
import * as path from 'path';
export function* walk(rootPath) {
    const stats = fs.statSync(rootPath);
    const isDirectory = stats.isDirectory();
    yield { path: rootPath, isDirectory };
    if (isDirectory) {
        const entries = fs.readdirSync(rootPath);
        for (const entry of entries) {
            const fullPath = path.join(rootPath, entry);
            yield* walk(fullPath);
        }
    }
}
// ファイルがディレクトリでもファイルでもない場合の分岐も書く必要あり
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQU83QixNQUFNLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFnQjtJQUNwQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUV4QyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUV0QyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1QyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQsb0NBQW9DIn0=
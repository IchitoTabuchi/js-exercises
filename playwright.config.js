import { defineConfig } from "@playwright/test";
export default defineConfig({
    webServer: {
        command: "npm run server",
        port: 3000,
    },
    use: {
        headless: true,
        // 会社 PC は拡張機能オフで起動できない
        launchOptions: { ignoreDefaultArgs: ["--disable-extensions"] },
    },
    testDir: ".",
    testMatch: /(.+\.)?spec\.[jt]s/,
    workers: 1,
    maxFailures: 1,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheXdyaWdodC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGF5d3JpZ2h0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFaEQsZUFBZSxZQUFZLENBQUM7SUFDMUIsU0FBUyxFQUFFO1FBQ1QsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsUUFBUSxFQUFFLElBQUk7UUFDZCx1QkFBdUI7UUFDdkIsYUFBYSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO0tBQy9EO0lBQ0QsT0FBTyxFQUFFLEdBQUc7SUFDWixTQUFTLEVBQUUsb0JBQW9CO0lBQy9CLE9BQU8sRUFBRSxDQUFDO0lBQ1YsV0FBVyxFQUFFLENBQUM7Q0FDZixDQUFDLENBQUMifQ==
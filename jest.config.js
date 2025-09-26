const jestConfig = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
    extensionsToTreatAsEsm: [".ts"],
    testPathIgnorePatterns: ["/node_modules/", "/exercises/"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.ts$": "$1",
    },
};
export default jestConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVzdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqZXN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLFVBQVUsR0FBeUI7SUFDdkMsTUFBTSxFQUFFLFNBQVM7SUFDakIsZUFBZSxFQUFFLE1BQU07SUFDdkIsU0FBUyxFQUFFO1FBQ1QsYUFBYSxFQUFFO1lBQ2IsU0FBUztZQUNUO2dCQUNFLE1BQU0sRUFBRSxJQUFJO2FBQ2I7U0FDRjtLQUNGO0lBQ0Qsc0JBQXNCLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDL0Isc0JBQXNCLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUM7SUFDekQsZ0JBQWdCLEVBQUU7UUFDaEIsc0JBQXNCLEVBQUUsSUFBSTtLQUM3QjtDQUNGLENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBQyJ9
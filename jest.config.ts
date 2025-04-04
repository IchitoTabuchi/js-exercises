import { type JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
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

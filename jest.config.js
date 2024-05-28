module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>"], // Adjust this if your source files are located elsewhere
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"], // Adjust this to match your test files pattern
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

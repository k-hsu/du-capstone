module.exports = {
  testEnvironment: "jsdom",
  verbose: false,
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 90,
      statements: 0,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
};

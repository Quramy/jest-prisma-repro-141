export default {
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { diagnostics: false }],
  },
  testEnvironment: "@quramy/jest-prisma-node/environment",
  setupFilesAfterEnv: [],
  testEnvironmentOptions: {
    verboseQuery: true,
  },
};

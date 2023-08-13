module.exports = {
  // preset: 'jest-preset.json',
  
  modulePaths: ["<rootDir>"],

  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],

    transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":"<rootDir>/__mocks__/fileMock.js",
    "^Stores(.*)$": "<rootDir>/src/store",
    "^Utils(.*)$": "<rootDir>/src/utils",
    "^Services(.*)$": "<rootDir>/src/services",
    "^Navigation(.*)$": "<rootDir>/src/navigation",
    "^Pages(.*)$": "<rootDir>/src/view/pages",
    "^Components(.*)$": "<rootDir>/src/view/components",
    "^Images(.*)$": "<rootDir>/src/assets/images",
    "^Icons(.*)$": "<rootDir>/src/assets/icons",
    // ".+\\.(svg|png|jpg)$": "identity-obj-proxy",
  },
  // reporters: [
  //     'default',
  //     [
  //         './node_modules/jest-html-reporter',
  //         {
  //             pageTitle: 'Test Report',
  //         },
  //     ],
  // ],
  // testResultsProcessor: './node_modules/jest-html-reporter',
//   testRegex: "/*.test.js$",
//   collectCoverage: true,
//   coverageReporters: ["lcov"],
//   coverageDirectory: "UnitTest-coverage",
//   coverageThreshold: {
//     global: {
//       branches: 0,
//       functions: 0,
//       lines: 0,
//       statements: 0,
//     },
//   },
  moduleDirectories: ["node_modules", "src"],
//   testMatch: ["**/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?(x)"],
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)",
    "node_modules/(?!react-file-drops)",
  ],

//   transform: {}

  // transform: {
  //   "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
  //     "<rootDir>/fileTransformer.js",
  // },

  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  }
};




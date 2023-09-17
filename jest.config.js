module.exports = {
  modulePaths: ["<rootDir>"],

  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],

  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "^Stores(.*)$": "<rootDir>/src/store",
    "^Utils(.*)$": "<rootDir>/src/utils",
    "^Services(.*)$": "<rootDir>/src/services",
    "^Navigation(.*)$": "<rootDir>/src/navigation",
    "^Pages(.*)$": "<rootDir>/src/view/pages",
    "^Components(.*)$": "<rootDir>/src/view/components",
    "^Images(.*)$": "<rootDir>/src/assets/images",
    "^Icons(.*)$": "<rootDir>/src/assets/icons",
  },

  moduleDirectories: ["node_modules", "src"],
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)",
    "node_modules/(?!react-file-drops)",
  ],

  moduleFileExtensions: ["json", "js", "jsx", "ts", "tsx", "cjs"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};

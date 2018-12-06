module.exports = {
  moduleFileExtensions: ['js', 'jsx'],
  "transform": {
    "^.+\\.(js|jsx)?$": "babel-jest"
  },
  "setupTestFrameworkScriptFile": "<rootDir>/setupTests.js",
  "testMatch": [
    "<rootDir>/src/views/**/*.test.js",
  ],
  "setupFiles": [
    "raf/polyfill"
  ],
};
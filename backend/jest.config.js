module.exports = {
    setupFiles: ["./.jest/setEnvVars.js"],
    testPathIgnorePatterns:["/node_modules/","/.history/"],
    testMatch: [ "**/?(*.)+(spec|tests).[jt]s?(x)" ]
  };
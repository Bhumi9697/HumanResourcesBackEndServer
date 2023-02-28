
let setupFiles = ["./.jest/setEnvVars.js"];
let testPathIgnorePatterns = ["/node_modules/", "/.history/"];
let testMatch = ["**/__tests__/?(*.)+(spec|tests).[jt]s?(x)"];

export default { setupFiles, testPathIgnorePatterns, testMatch };

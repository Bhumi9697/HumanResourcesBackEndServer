
let setupFiles = ["./.jest/setEnvVars.js"];
let testPathIgnorePatterns = ["/node_modules/", "/.history/"];
let testMatch = ["**/?(*.)+(spec|tests).[jt]s?(x)"];

export default { setupFiles, testPathIgnorePatterns, testMatch };

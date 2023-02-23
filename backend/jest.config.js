
let setupFiles = ["./.jest/setEnvVars.js"];
let testPathIgnorePatterns = ["/node_modules/", "/.history/"];
//let testMatch = ["**/?(*.)+(spec|tests).[jt]s?(x)"];
let testMatch = ["**/user.tests.js"];

export default { setupFiles, testPathIgnorePatterns, testMatch };

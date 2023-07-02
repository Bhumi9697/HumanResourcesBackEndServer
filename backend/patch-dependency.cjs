//
// While we patch the dependency, need to patch it here. More information here:
//
//  https://github.com/99x/serverless-dynamodb-local/pull/298
//  https://stackoverflow.com/questions/76592141/aws-js-sdk-suddenly-throws-the-access-key-id-or-security-token-is-invalid
//
console.log( 'patching serverless-dynamodb-local...' )

var fs = require('fs');
var fileList = './node_modules/serverless-dynamodb-local/index.js';

fs.readFile(fileList, function(err, data) {
    if(err) throw err;

    data = data.toString();
    data = data.replace('MOCK_ACCESS_KEY_ID', 'MOCKACCESSKEYID');
    data = data.replace('MOCK_SECRET_ACCESS_KEY', 'MOCKSECRETACCESSKEY');

    fs.writeFile(fileList, data, function(err) {
        err || console.log('Successfully patched ./node_modules/serverless-dynamodb-local/index.js', );
    });
});



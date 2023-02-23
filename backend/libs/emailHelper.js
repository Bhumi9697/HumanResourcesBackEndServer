export function sendEmail(emailAdresses, body, subject){

  // =================
  // Don't really send emails
  return;

  var aws = require('aws-sdk');
  //var ses = new aws.SES({region: 'us-west-2'});
  var ses = new aws.SES();

  var params = {
    Destination: {
        ToAddresses: emailAdresses
    },
    Message: {
        Body: {
              Html:
              {
                Data: body
              }
        },

        Subject:
        {
          Data: subject
        }
    },
    Source: "no-reply@cavnesshr.com"
  };

  ses.sendEmail(params, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
  });
}
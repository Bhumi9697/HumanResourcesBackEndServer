// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var aws = require('aws-sdk');
//var ses = new aws.SES({region: 'us-west-2'});
var ses = new aws.SES();

export function sendEmail(emailAdresses,body,subject){
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
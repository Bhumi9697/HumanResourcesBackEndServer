

let CavnessURL = 'https://dev.cavnesshr.com';
if(process.env.stage === 'production'){
  CavnessURL = 'https://staging.cavnesshr.com';
}

exports.handler = (event, context, callback) => {

  let userAttributes = event.request.userAttributes;
  let user = userAttributes["name"] || event.request.usernameParameter;
  let username = event.request.usernameParameter || userAttributes["email"];
  let codeParameter = event.request.codeParameter;

  if(event.triggerSource === "CustomMessage_SignUp") {
    event.response.emailSubject = "Sign Up Email";
    event.response.emailMessage = `
    <p>Thank you ${user} for signing up.</p>
    <a href="${CavnessURL}/verify?confirmation_code=${codeParameter}&user_name=${username}">Verify Email</a>`;
    }

  if(event.triggerSource === 'CustomMessage_ForgotPassword'){
    event.response.emailMessage = `<style>;
    p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    }
    </style>

    <div id=":x9" class="a3s aXjCH " role="gridcell" tabindex="-1"><p>Hello,</p>
    <p>Follow this link to reset your Password. </p>
    <p><a href="${CavnessURL}/reset-password?confirmation_code=${codeParameter}&user_name=${username}"> Reset Password </a></p>
    <p>If you didn’t ask to change password, you can ignore this email.</p>
    <p>Thanks,</p>
    <p>Your website team</p>
    </div>`;
  };

  if(event.triggerSource === 'CustomMessage_AdminCreateUser'){
    event.response.emailSubject = "Admin User Create";
    event.response.emailMessage = `
    <p>Welcome! ${user} Verify your email to get started with Cavness HR</p>
    <p>user: ${username}</p>
    <p>temp password: ${codeParameter}</p>
    <a href="${CavnessURL}">Click here to go to Cavness HR</a>`;
  };
    callback(null, event);
};

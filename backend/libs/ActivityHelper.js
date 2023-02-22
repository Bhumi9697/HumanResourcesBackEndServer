import * as dbActivityLog from '../dynamo/ActivityLog';
import * as dbUsers from '../dynamo/Users';
import uuid from 'uuid/v1';
import * as emailHelper from './emailHelper';
// ActionTypeEnum:{
//   USERDOCUMENTADDED:'userdocumentadded',
//   UPLOADNEEDED:'uploadneeded',
//   USERSTATUSCHANGE:'userstatuschange',
//   DOCUMENTDELETED:'documentdeleted',
//   EMPLOYEEADDED:'employeeadded'
// },
const siteURL =
    process.env.stage == 'dev' ?
      'https://dev.cavnesshr.com' : 'https://staging.cavnesshr.com';

async function addActivity (args) {
  let timestamp = Date.now();
  args.timestamp = timestamp;
  args.activityId = uuid();
  dbActivityLog.create(args);
  if(args.notify){
    if(args.type === 'user'){
      notifyEmployee(args);
    }
    if(args.type === 'company'){
      notifyCompanyAdmin(args);
    }
  }
}

function notifyEmployee(args){
  const emails = [args.userId];
  const subject = 'automated message';
  const body = 'You are recieving this message to inform you that: \n' + args.textBody;
  emailHelper.sendEmail(emails,body,subject);
}

async function notifyCompanyAdmin(args){
  console.log('activity link',args.link);
  const emails = await getCompanyAdminEmails(args.companyId);
  console.log('emails',emails);
  const subject = 'automated message';
  let body = '<p>You are recieving this message to inform you that: \n' + args.textBody + '</p>';
  if(args.link){
    console.log('adding link to message');
    body+= '<p><a href="'+ args.link +'">' + 'check it out</a></p>';
  }
  console.log('email body',body);
  emailHelper.sendEmail(emails,body,subject);
}

async function getCompanyAdminEmails(companyId){
  const admins = await dbUsers.getCompanyAdmins(companyId);
  const emailList = admins.map(item => {
    return item.email;
  });
  // let emailList = [];
  // admins.map(item => {
  //   emailList.push(item.email);
  // });
  console.log('email list',emailList);
  return emailList;
}

// export async function employeeUploads (args) {
//   let newActivity  = {
//     userId: args.userId,
//     companyId: args.companyId,
//     userDocId: args.userDocId
//   } = args;
//   newActivity.type = 'user';
//   newActivity.action = 'userdocumentadded';
//   newActivity.notify = true;
//   addActivity(newActivity);
// }

// export async function companyUploads (args) {
//   let newActivity  = {
//     userId: args.userId,
//     companyId: args.companyId,
//     userDocId: args.userDocId
//   } = args;
//   newActivity.type = 'company';
//   newActivity.action = 'userdocumentadded';
//   newActivity.notify = true;
//   addActivity(newActivity);
// }

export async function notifyCompanyDocumentAdded (args) {

  let newActivity  = {
    companyId: args.companyId,

  };
  if(args.userDocId){
    newActivity.textBody = 'User document added';
    newActivity.userId = args.userDocId.split('$')[0];
    newActivity.userDocId = args.userDocId;
    newActivity.action = 'userdocumentadded';
    newActivity.link = siteURL + '/employee-documents/view/' + args.companyId + '/' + args.userDocId;
  }
  if(args.documentId){
    newActivity.textBody = 'Company document added';
    newActivity.userId = 'company';
    newActivity.documentId = args.documentId;
    newActivity.action = 'companydocumentadded';
    newActivity.link = siteURL + '/company-documents/view/' + args.documentId + '?type=' + args.documentType;
  }
  newActivity.type = 'company';
  newActivity.notify = true;
  addActivity(newActivity);
}

export async function logDocumentDeleted (args) {

  let newActivity  = {
    companyId: args.companyId,

  };
  if(args.userDocId){
    newActivity.userId = args.userDocId.split('$')[0];
    newActivity.userDocId = args.userDocId;
    newActivity.action = 'userdocumentdeleted';
    newActivity.textBody = 'user document was deleted';
  }
  if(args.documentId){
    newActivity.documentId = args.documentId;
    newActivity.userId = 'company';
    newActivity.action = 'companydocumentdeleted';
    newActivity.textBody = 'company document was deleted';
  }
  newActivity.type = 'company';
  newActivity.notify = false;
  addActivity(newActivity);
}

export async function adminUploadsUserDoc (args) {
  let newActivity  = {
    companyId: args.companyId,
    userDocId: args.userDocId
  };
  newActivity.userId = args.userDocId.split('$')[0];
  newActivity.textBody = 'new documents have been uploaded to your account';
  newActivity.type = 'user';
  newActivity.action = 'userdocumentadded';
  newActivity.notify = true;
  addActivity(newActivity);
}

export async function employeeAdded (args) {
  let name = args.first && args.last ? args.first + ' ' + args.last : args.email;
  let newActivity  = {
    userId: args.userId,
    companyId: args.companyId
  } = args;
  newActivity.textBody = name + ' was added to CavnessHR';
  newActivity.type = 'company';
  newActivity.link = siteURL + '/employees/view/' + args.userId + '?companyId=' + args.companyId;
  newActivity.action = 'employeeadded';
  newActivity.notify = true;
  addActivity(newActivity);
}

export async function statusChange (args) {
  let newActivity  = {
    userId: args.userId,
    companyId: args.companyId
  } = args;
  newActivity.textBody = args.first + ' ' + args.last + ' status was changed to: ' + args.userStatus;
  newActivity.type = 'company';
  newActivity.action = 'userstatuschange';
  newActivity.notify = false;
  addActivity(newActivity);
}

export async function documentDeleted (args) {
  let newActivity  = {
    userId: args.userId,
    companyId: args.companyId,
   // documentName: args.documentName
  } = args;
  newActivity.textBody = 'Document ' + args.documentName + 'was deleted';
  newActivity.type = 'company';
  newActivity.action = 'documentdeleted';
  newActivity.notify = false;
  addActivity(newActivity);
}
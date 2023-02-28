import * as dbActivityLog from '../dynamo/ActivityLog.js';
import * as dbUsers from '../dynamo/Users.js';
import { v4 as uuid } from 'uuid';
import * as emailHelper from './emailHelper.js';

const siteURL = 'https://contoso.com';

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
  const emails = await getCompanyAdminEmails(args.companyId);
  const subject = 'automated message';
  let body = '<p>You are recieving this message to inform you that: \n' + args.textBody + '</p>';
  if(args.link){
    body+= '<p><a href="'+ args.link +'">' + 'check it out</a></p>';
  }
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
  return emailList;
}

export async function employeeAdded (args) {
  let name = args.first && args.last ? args.first + ' ' + args.last : args.email;
  let newActivity  = {
    userId: args.userId,
    companyId: args.companyId
  } = args;
  newActivity.textBody = name + ' was added';
  newActivity.type = 'company';
  newActivity.link = siteURL + '/employees/view/' + args.userId + '?companyId=' + args.companyId;
  newActivity.action = 'employeeadded';
  newActivity.notify = true;
  addActivity(newActivity);
}
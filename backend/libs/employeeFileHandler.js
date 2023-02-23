import { putObjectPresignedUrl, getObjectPresignedUrl, postObjectPresignedUrl } from './fileUtils.js';
import * as dbEmployeeDocs from '../dynamo/EmployeeDocuments.js';
const DocumentsBucket = process.env.IS_OFFLINE ?  'dev-bucket-private-documents' : process.env.privateDocumentsBucket;


export function uploadEmployeeDocument(args,context){
  return new Promise((resolve, reject) => {

    let filename = args.filename;
    let userDocId = args.userDocId;
    let userId = args.userDocId.split("$")[0];
    console.log('getting presigned url for cavness doc upload:',args);


    let fileExtension = filename.split('.').pop();
    let key = args.companyId + '/' + userId + '/'+ userDocId + '.' + fileExtension;

    let params = {
      key:key,
      bucket: DocumentsBucket,
      contentType: args.contentType
    };

    return putObjectPresignedUrl(params).then( url => {
      let updateParams = {
        companyId: args.companyId,
        userDocId: args.userDocId,
        documentKey: key,
        filename: args.filename,
        updatedBy: args.updatedBy
      };
      dbEmployeeDocs.update(updateParams).then((doc) => {
        console.log('updating documen:',doc);
        resolve(url);
      }).catch(
         dynamoErr => {
           console.log(dynamoErr);
           reject(dynamoErr);
         });

       }).catch(s3error => {
         console.log(s3error);
         reject(s3error);
       });
  });
}

export function uploadEmployeeDocumentUppy(args,context){
  return new Promise((resolve, reject) => {

    let filename = args.filename;
    let userDocId = args.userDocId;
    let userId = args.userDocId.split("$")[0];
    console.log('getting presigned url for cavness doc upload:',args);


    let fileExtension = filename.split('.').pop();
    let key = args.companyId + '/' + userId + '/'+ userDocId + '.' + fileExtension;

    let params = {
      key:key,
      bucket: DocumentsBucket,
      contentType: args.contentType
    };

    return postObjectPresignedUrl(params).then( data => {
      let updateParams = {
        companyId: args.companyId,
        userDocId: args.userDocId,
        documentKey: key,
        filename: args.filename,
        updatedBy: args.updatedBy
      };
      dbEmployeeDocs.update(updateParams).then((doc) => {
        console.log('updating document:',doc);
        let string = JSON.stringify(data);
        resolve(string);
      }).catch(
         dynamoErr => {
           console.log(dynamoErr);
           reject(dynamoErr);
         });

       }).catch(s3error => {
         console.log(s3error);
         reject(s3error);
       });
  });
}

export function getEmployeeDocument(args){
  if(args.documentKey){
    let params = {
      bucket: DocumentsBucket,
      key: args.documentKey
    };
    return getObjectPresignedUrl(params);
  }
  return null;
}

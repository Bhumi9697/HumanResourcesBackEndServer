import { putObjectPresignedUrl, getObjectPresignedUrl, postObjectPresignedUrl } from './fileUtils.js';
import * as dbCompanies from '../dynamo/Companies.js';
import * as dbUsers from '../dynamo/Users.js';
const ProfilePhotosBucket = process.env.IS_OFFLINE ?  'dev-bucket-profile-photos' : process.env.profilePhotosBucket;
const DocumentsBucket = process.env.IS_OFFLINE ?  'dev-bucket-public-documents' : process.env.publicDocumentsBucket;

export function uploadProfilePicture(args){
  return new Promise((resolve, reject) => {

    let filename = args.filename;
    let userId = args.userId;
    let companyId = args.companyId;
    console.log('getting presigned url for profile picture');

    let fileExtension = filename.split('.').pop();
    let key = companyId + '/users/' + userId + '/profile.' + fileExtension;

    let params = {
      key:key,
      bucket: ProfilePhotosBucket,
      contentType: 'image/' + fileExtension
    };

    return putObjectPresignedUrl(params).then( url => {
      let updateParams = {
       userId:args.userId,
       companyId: args.companyId,
       profilePhoto: key
      };
      dbUsers.updateUser(updateParams).then((user) => {
       console.log('updating profile pic in db:',user);
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
        // res.json({ success : true, message : ‘AWS SDK S3 Pre-signed urls generated successfully.’, urls : fileurls});
  });
}

export function uploadCompanyLogo(args){
  return new Promise((resolve, reject) => {

    let filename = args.filename;
    let companyId = args.companyId;
    console.log('getting presigned url for company logo:',args);

    let fileExtension = filename.split('.').pop();
    let key = companyId + '/public/profile.' + fileExtension;

    let params = {
      key:key,
      bucket: ProfilePhotosBucket,
      contentType: 'image/' + fileExtension
    };

    return putObjectPresignedUrl(params).then( url => {
      let updateParams = {
       companyId: args.companyId,
       companyLogo: key
      };
      dbCompanies.update(updateParams).then((user) => {
       console.log('updating company logo in db:',user);
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
        // res.json({ success : true, message : ‘AWS SDK S3 Pre-signed urls generated successfully.’, urls : fileurls});
  });
}

export function uploadCavnessDocument(args,context){
  return new Promise((resolve, reject) => {

    let filename = args.filename;
    let documentId = args.documentId;
    console.log('getting presigned url for cavness doc upload:',args);


    let fileExtension = filename.split('.').pop();
    let key = args.documentType + '/' + documentId + '.' + fileExtension;

    let params = {
      key:key,
      bucket: DocumentsBucket,
      contentType: args.contentType
    };

    return putObjectPresignedUrl(params).then( url => {
      let updatedBy = {
        userId:context.user.userId,
        companyId: context.user.companyId,
        first: context.user.first,
        last: context.user.last
      };

      let updateParams = {
       documentId: args.documentId,
       documentType: args.documentType,
       documentKey: key,
       filename: args.filename,
       updatedBy: updatedBy
      };
      dbDocuments.update(updateParams).then((doc) => {
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
        // res.json({ success : true, message : ‘AWS SDK S3 Pre-signed urls generated successfully.’, urls : fileurls});
  });
}

export function uploadCavnessDocumentUppy(args,context){
  return new Promise((resolve, reject) => {

    let filename = args.filename;
    let documentId = args.documentId;
    console.log('getting presigned url for cavness doc upload:',args);


    let fileExtension = filename.split('.').pop();
    let key = args.documentType + '/' + documentId + '.' + fileExtension;

    let params = {
      key:key,
      bucket: DocumentsBucket,
      contentType: args.contentType
    };

    return postObjectPresignedUrl(params).then( data => {
      let updatedBy = {
        userId:context.user.userId,
        companyId: context.user.companyId,
        first: context.user.first,
        last: context.user.last
      };

      let updateParams = {
       documentId: args.documentId,
       documentType: args.documentType,
       documentKey: key,
       filename: args.filename,
       updatedBy: updatedBy
      };
      dbDocuments.update(updateParams).then((doc) => {
       console.log('updating documen:',doc);
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

export function getCavnessDocument(args){
  if(args.documentKey){
    let params = {
      bucket: DocumentsBucket,
      key: args.documentKey
    };
    return getObjectPresignedUrl(params);
  }
  return null;
}

export function getCompanyLogo(args){
  let params = {
    bucket: ProfilePhotosBucket,
    key: args.companyLogo
  };
  return getObjectPresignedUrl(params);
}

export function getProfilePicture(args){
  let params = {
    bucket: ProfilePhotosBucket,
    key: args.profilePhoto
  };
  return getObjectPresignedUrl(params);
}
import AWS from 'aws-sdk';
const s3 = new AWS.S3({
  signatureVersion: 'v4'
});
export function getObjectPresignedUrl(args){
    return new Promise((resolve, reject) => {
      let params = {
        Bucket: args.bucket,
        Key: args.key
      };

      if(args.filename){
        params.ResponseContentDisposition = 'attachment; filename ="' + args.filename + '"';
      }


      s3.getSignedUrl('getObject', params, (err, url) => {
        if(err){
         console.log('Error getting presigned url from AWS S3:',err.message);
         reject(err);
        }
        else{
         resolve(url);
        }
      });
    });
  }

  export function putObjectPresignedUrl(args){
    console.log('getting presigned url for args:',args);
    return new Promise((resolve, reject) => {
      let params = {
        Bucket: args.bucket,
        Key: args.key,
        Expires: 60*60,
        ACL: 'bucket-owner-full-control',
        ContentType: args.contentType
      };

      s3.getSignedUrl('putObject', params, (err, url) => {
        if(err){
         console.log('Error getting presigned url from AWS S3:',err.message);
         reject(err);
        }
        else{
         resolve(url);
        }
      });
    });
  }

  export function postObjectPresignedUrl(args){
    return new Promise((resolve, reject) => {
      let params = {
        Bucket: args.bucket,
        Expires: 60*60,
        ACL: 'bucket-owner-full-control',
        Key: args.key,
        Fields: {
          success_action_status:'201',
          key: args.key
        }
      };

      console.log('params',params);
      s3.createPresignedPost( params, (err, data) => {
        if(err){
         console.log('Error getting presigned url from AWS S3:',err.message);
         reject(err);
        }
        else{
         resolve(data);
        }
      });
    });
  }

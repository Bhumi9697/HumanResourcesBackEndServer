import { putObjectPresignedUrl, getObjectPresignedUrl } from "./fileUtils.js";
import * as dbCompanies from "../dynamo/Companies.js";

const ProfilePhotosBucket = process.env.IS_OFFLINE
  ? "dev-bucket-profile-photos"
  : process.env.profilePhotosBucket;

export function uploadCompanyLogo(args) {
  return new Promise((resolve, reject) => {
    let filename = args.filename;
    let companyId = args.companyId;
    console.log("getting presigned url for company logo:", args);

    let fileExtension = filename.split(".").pop();
    let key = companyId + "/pub/profile." + fileExtension;

    let params = {
      key: key,
      bucket: ProfilePhotosBucket,
      contentType: "image/" + fileExtension,
    };

    return putObjectPresignedUrl(params)
      .then((url) => {
        let updateParams = {
          companyId: args.companyId,
          companyLogo: key,
        };
        dbCompanies
          .update(updateParams)
          .then((user) => {
            console.log("updating company logo in db:", user);
            resolve(url);
          })
          .catch((dynamoErr) => {
            reject(dynamoErr);
          });
      })
      .catch((s3error) => {
        reject(s3error);
      });
    // res.json({ success : true, message : ‘AWS SDK S3 Pre-signed urls generated successfully.’, urls : fileurls});
  });
}

export function getCompanyLogo(args) {
  let params = {
    bucket: ProfilePhotosBucket,
    key: args.companyLogo,
  };
  return getObjectPresignedUrl(params);
}

export function getProfilePicture(args) {
  let params = {
    bucket: ProfilePhotosBucket,
    key: args.profilePhoto,
  };
  return getObjectPresignedUrl(params);
}

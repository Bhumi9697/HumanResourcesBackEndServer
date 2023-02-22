import AWS from 'aws-sdk'

const S3_BUCKET = 'cavnesshra8301389f2124dcda90976c518a9789d192653-staging'
const REGION = 'us-east-2'

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY
})

export const s3Client = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION
})

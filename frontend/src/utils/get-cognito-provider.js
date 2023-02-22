import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'

export const getCognitoProvider = () =>
  new CognitoIdentityProvider({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY
    }
  })

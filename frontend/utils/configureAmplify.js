import Amplify, { Auth } from 'aws-amplify'
import config from '@/src/aws-exports'

Amplify.configure({ ...config, ssr: true })
Auth.configure({ ...config, ssr: true })

import { Storage } from 'aws-amplify'

export const getHandBookModelFromS3 = async (modelName) => {
  return await Storage.get(`handbook-models/${modelName}.pdf`, { download: true })
}

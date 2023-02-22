import { getCognitoProvider } from '@/src/utils'

export const deleteUser = async ({ email }) => {
  const cognitoProvider = getCognitoProvider()
  const result = await new Promise((res) => {
    cognitoProvider.listUsers(
      {
        UserPoolId: 'us-east-2_PSpfE6yH3',
        AttributesToGet: ['email', 'sub']
      },
      (err, data) => {
        if (err) {
          res(err)
        } else {
          res(data)
        }
      }
    )
  })

  const modUsers = result.Users.map((u) => {
    return u.Attributes.map((a) => ({ [a.Name]: a.Value })).reduce((acc, n) => ({ ...acc, ...n }))
  })
  const userToDelete = modUsers.find((u) => u.email === email)

  if (!userToDelete) return
  return await cognitoProvider.adminDeleteUser({
    UserPoolId: 'us-east-2_PSpfE6yH3',
    Username: userToDelete.sub
  })
}

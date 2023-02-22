import { getCognitoProvider } from '@/src/utils'

export const deleteCompanyReps = async ({ companyID }) => {
  const cognitoProvider = getCognitoProvider()
  const result = await new Promise((res) => {
    cognitoProvider.listUsers(
      {
        UserPoolId: 'us-east-2_PSpfE6yH3'
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

  const usersToDelete = modUsers
    .filter((u) => u['custom:company_name'] === companyID && u['custom:role'] === 'company_rep')
    .map((u) =>
      cognitoProvider.adminDeleteUser({
        UserPoolId: 'us-east-2_PSpfE6yH3',
        Username: u.sub
      })
    )
  return await Promise.all(usersToDelete)
}

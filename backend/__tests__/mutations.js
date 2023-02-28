const gql = require('graphql-tag');

export const CREATE_ADMIN = gql`
mutation createUser($email:String!){
  createUser(userRole:SUPERADMIN, companyId:"someCompany", email:$email, first:"Jane", last:"John"){
    userId
    userRole
    state
    last
    first
  }
}`

export const CREATE_COMPANY_AND_OWNER = gql`
mutation createCompanyAndOwner($email:String!, $companyName:String!){
  createCompanyAndOwner(email: $email, companyName: $companyName){
    companyName
    companyId
  }
}
`

export const CREATE_EMPLOYEE = gql`
mutation createUser($email:String!){
  createUser(userRole:EMPLOYEE, companyId:"5a198de0-7355-11ea-a6e4-335f2e84501a", email:$email, first:"Jane", last:"John"){
    userId
    userRole
    state
    last
    first
  }
}`

export const UPDATE_USER = gql`
mutation updateUserFirstAndLastName($userId:String!,$companyId:String!,$first:String!,$last:String!){
  updateUser(userId: $userId, companyId:$companyId, first:$first, last:$last){
    userId
    last
    first
  }
}`
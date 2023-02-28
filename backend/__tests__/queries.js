const gql = require('graphql-tag');

export const  LIST_USERS = `
`;

export const LIST_COMPANIES = gql`{
  listCompanies{
    companyId
    companyOwnerId
    companyName
  }
}`;

export const GET_USER = gql`
query getUser ($userId:String!, $companyId:String!){
  getUser(userId: $userId, companyId: $companyId){
    userId
    userRole
    first
    last
    email
  }
}`;

export const COMPANY_USERS = gql`
{
  companyUsers(companyId:"5a198de0-7355-11ea-a6e4-335f2e84501a") {
    userId
    userRole
    first
    last
    contactPhone
  }
}`

export const GET_COMPANY = gql`
{
  getCompany(companyId:"5a198de0-7355-11ea-a6e4-335f2e84501a"){
    companyName
    companyId
  }
}`

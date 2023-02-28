const gql = require('graphql-tag');

export const  LIST_USERS = gql`
{
  listUsers {
    userId
    userNumber
    companyId
    email
    first
    last
    gender
    employeeId
    birthdate
    maritalStatus
    workPhone
    workEmail
    phone
    hiredate
    department
    jobTitle
    address1
    address2
    city
    state
    zip
    contactFirst
    contactLast
    contactRelationship
    contactPhone
    offerUpload
    profilePhoto
    i9
    details
    funfact
    userRole
    # company{
    #   companyId
    #   companyName
    #   companySize
    #   companyLogo
    #   companyOwnerId
    #   companyLogoUrl
    #   companyLocations{
    #     locationId
    #     companyId
    #     city
    #     state
    #   }
    # }
    profilePhotoUrl
    userStatus
    effectiveDate
    createdOn
    assignedCompanies
  }
}
`;

export const LIST_COMPANIES = gql`{
  listCompanies{
    companyId
    companyOwnerId
    companyName
    industry
    description
    phone
    email
    companySize
    status
    effectiveDate
    companyLocations{
      companyId
      locationId
      address1
      address2
      city
      state
      zip
      phone
      email
      headquarters
    }
    companyLogo
    companyLogoUrl
    # users{
    #   userId
    # } 
  }
}`;

export const GET_USER = gql`
{
  getUser(userId:"user@gamil.com" companyId:"some"){
    userId
    userRole
    first
    last
    contactPhone
  }
}`;

export const ME = gql`
{
  me{
    userId
    userRole
    first
    last
    contactPhone
  }
}`

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

export const GET_COMPANY_LOCATIONS = gql`
{
  getCompanyLocations(companyId:"5a198de0-7355-11ea-a6e4-335f2e84501a"){
    state
    city
    companyId
  }
}`

export const GET_COMPANY = gql`
{
  getCompany(companyId:"5a198de0-7355-11ea-a6e4-335f2e84501a"){
    companyName
    companyId
  }
}`

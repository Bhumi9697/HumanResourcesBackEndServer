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


export const LIST_DOCUMENTS = gql`{
	listDocuments{
 		documentId
    documentType
    documentName
    documentKey
    createdOn
    description
    filename
    category
    documentPermissions{
      documentId
      companyId
      state
      city
      hashKey
      type
    }
    updatedBy{
      userId
      first
      last
    }
    status
    # documentUrl
	}
}`;

export const LIST_EMPLOYEE_DOCUMENTS = gql`
{
	listEmployeeDocuments{
 		userDocId
    documentName
    documentKey
    createdOn
    description
    filename

    updatedBy{
      userId
      first
      last
    }
    status
	}
}`;

export const LIST_MY_DOCUMENTS = gql`
{
	listMyDocuments{
 		documentId
    documentName
    description
	}
}`;

export const EMPLOYEE_DOCUMENTS_BY_USER = gql`
{
	employeeDocsByUser(companyId:"cavness", userId:"szavio@gmail.com"){
    userId
    userDocId
  }
}`;

export const SCAN_PERMISSIONS = gql`
{
	scanPermissions{
 		userDocId
    documentName
    documentKey
    createdOn
    description
    filename

    updatedBy{
      userId
      first
      last
    }
    status
    documentUrl
	}
}`;

export const GET_ADMIN_USER = gql`
{
  getUser(userId:"szavio@gamil.com" companyId:"cavness"){
    userId
    userRole
    first
    last
    contactPhone
  }
}`

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
  companyUsers(companyId:"5a198de0-7355-11ea-a6e4-335f2e84501a"){
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

export const GET_EMPLOYEE_DOCUMENT = gql`
{
  getEmployeeDocument(userDocId:"szavio@gmail.com$5b4ebe50-f1a0-11ea-adb4-4b2645fb8b26",companyId:"cavness"){
    description
    documentType
    documentName
  }
}`

export const GET_MY_DOCUMENT_CATEGORIES = gql`
{
  getMyDocumentCategories{
    companyId
    categoryText
  }
}`

export const EMPLOYEE_DOCUMENTS_BY_COMPANY = gql`
{
  employeeDocsByCompany(companyId:"cavness"){
    userId
    userDocId
  }
}`

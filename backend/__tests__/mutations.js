const gql = require('graphql-tag');


export const CREATE_ADMIN = gql`
mutation createUser($email:String!){
  createUser(userRole:SUPERADMIN, companyId:"cavness", email:$email, first:"Jane", last:"John"){
    userId
    userRole
    state
    last
    first
  }
}`

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

export const CREATE_ADMIN_DOCUMENT = gql`
  mutation{
    createAdminDocument(documentName:"its a doc" ,documentType:NATIONAL, description:"test", category:HRLAWS){
      documentId
    }
  }`

  export const CREATE_EMPLOYEE_DOCUMENT = gql`
    mutation{
      createEmployeeDocument(userId:"szavio@gmail.com",companyId:"cavness",documentName:"test doc",description:"ignore me", documentType:IDPROOF){
        userDocId
        companyId
      }
    }
`

export const UPDATE_EMPLOYEE_DOCUMENT = gql`
  mutation{
    updateEmployeeDocument(userDocId:"szavio@gmail.com$30be39a0-fd52-11ea-9200-03733601f510",companyId:"cavness",description:"updated"){
      description
      documentType
      documentName
    }
  }
`

export const UPDATE_ADMIN_DOCUMENT = gql`
  mutation{
    updateDocument(documentId:"e8467730-fd4e-11ea-9b75-1955b13574d9",documentType:NATIONAL, description:"yup"){
      description
      documentType
      documentName
  }
}
`

export const CREATE_DOCUMENT_CATEGORY = gql`
  mutation createDocumentCategory($categoryText:String!){
    createDocumentCategory(companyId:"cavness",categoryText:$categoryText){
      categoryText
      companyId
  }
}
`
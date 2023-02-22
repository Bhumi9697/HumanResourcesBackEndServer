// Graph QL Resolvers:
// createEmployeeDocument
// uploadEmployeeFile
// updateEmployeeDocument
// deleteEmployeeDocument
// getEmployeeDocument
// employeeDocsByUser
// employeeDocsByCompany
// listEmployeeDocuments

export default `
  type EmployeeDocument {
    userDocId: String!
    documentId: String!
    companyId: String!
    userId: String!
    documentType: EmployeeDocumentTypeEnum
    documentName: String
    documentKey: String
    createdOn: String
    description: String
    filename: String
    updatedBy: User
    status: StatusEnum
    documentUrl: String
  }

  type Query {
    listEmployeeDocuments(companyId: String, userId: String) : [EmployeeDocument]

    employeeDocsByCompany(companyId: String!) : [EmployeeDocument]

    employeeDocsByUser(companyId: String!, userId: String!) : [EmployeeDocument]

    getEmployeeDocument(
      userDocId: String!
      companyId: String!
    ) : EmployeeDocument

  }

  type Mutation {

    uploadEmployeeFile(
      userDocId: String!
      companyId: String!
      filename: String!
    ) : String

    uploadEmployeeFileUppy(
      userDocId: String!
      companyId: String!
      filename: String!
    ) : String

    createEmployeeDocument(
      userId: String!
      documentName: String!
      documentType: EmployeeDocumentTypeEnum
      description: String
      companyId: String!
    ): EmployeeDocument

    updateEmployeeDocument(
      userDocId: String!
      companyId: String!
      documentType: EmployeeDocumentTypeEnum
      documentName: String
      description: String
      status:StatusEnum
      filename: String
    ): EmployeeDocument

    deleteEmployeeDocument(
      userDocId: String!
      companyId: String!
    ): EmployeeDocument
  }`
;

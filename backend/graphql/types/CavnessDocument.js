export default `
  type Document {
    documentId: String!
    documentType: DocumentTypeEnum!
    documentName: String
    documentKey: String
    createdOn: String
    description: String
    filename: String
    category: String
    documentPermissions: [DocumentPermission]
    updatedBy: User
    status: StatusEnum
    documentUrl: String
  }

  type DocumentPermission {
    type: DocumentTypeEnum
    city: String
    state: String
    companyId: String
    documentId: String
    hashKey: String
  }

  input DocumentPermissionInput {
    type: DocumentTypeEnum!
    city: String
    state: String
    companyId: String
  }

  type Query {
    listDocuments(documentType: DocumentTypeEnum) : [Document]

    getDocument(
      documentId: String
      documentType: DocumentTypeEnum
    ) : Document

    listDocumentPermissions(documentId: String): [DocumentPermission]
    scanPermissions:[DocumentPermission]
    listMyDocuments:[Document]
    getMyDocumentCategories:[DocumentCategory]
  }

  type Mutation {

    uploadFile(
      documentId: String!
      documentType: DocumentTypeEnum!
      filename: String!
    ) : String

    uploadFileUppy(
      documentId: String!
      documentType: DocumentTypeEnum!
      filename: String!
    ) : String

    createAdminDocument(
      documentName: String!
      documentType: DocumentTypeEnum!
      description: String
      category: DocumentCategoryEnum
      documentPermissions:[DocumentPermissionInput]
    ): Document

    createCompanyDocument(
      documentName: String!
      description: String
      newCategory: String
      category: String
    ): Document

    createDocumentPermissions(documentId: String! documentPermissions:[DocumentPermissionInput]!):[DocumentPermission]
    deleteDocumentPermissions(documentId: String! documentPermissions:[DocumentPermissionInput]!):[DocumentPermission]

    updateDocument(
      documentId: String!
      documentType: DocumentTypeEnum!
      documentName: String
      description: String
      category: String
      newCategory: String
      status:StatusEnum
      filename: String
    ): Document

    deleteDocument(
      documentId: String!
      documentType: DocumentTypeEnum!
    ): Document
  }`
;

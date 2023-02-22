export default `
  type DocumentCategory {
    companyId: String!
    categoryText: String!
  }

type Query {
  getDocumentCategories(companyId:String!): [DocumentCategory]
}

  type Mutation {
    createDocumentCategory(
      companyId: String!
      categoryText: String!
    ): DocumentCategory
  }
  `
;

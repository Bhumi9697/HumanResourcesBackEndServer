export default `
  type Company {
    companyId: String!
    companyOwnerId: String!
    companyName: String
    industry: String
    description: String
    phone: String
    email: String
    companySize: String
    status: CompanyStatusEnum
    effectiveDate: String
    companyLocations: [CompanyLocation]
    companyLogo: String
    companyLogoUrl: String
    users: [User]
  }
  input LocationInput {
    state: String
    city: String
    zip: String
    address1: String
    address2: String
    phone: String
    headquarters: Boolean
  }

  type Query {
    getCompany(companyId:String!)
      :Company
    listCompanies:[Company]
  }

  type Mutation {

    uploadCompanyLogo(
      companyId: String!
      filename: String!
    ): String

    createCompanyAndOwner(
      email: String!
      phone: String
      first: String
      last: String
      companySize: String
      companyName: String
      industry: String
      companyLocations: [LocationInput]
      description: String
      status: CompanyStatusEnum
      effectiveDate: String
    ): Company

    updateCompany(
      companyId: String!
      companyOwnerId: String
      companyName: String
      industry: String
      description: String
      phone: String
      companySize: String
      status: CompanyStatusEnum
      effectiveDate: String
    ): Company
  }
  `
;

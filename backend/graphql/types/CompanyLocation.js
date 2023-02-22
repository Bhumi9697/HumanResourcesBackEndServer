export default `
  type CompanyLocation {
    companyId: String!
    locationId: String!
    address1: String
    address2: String
    city: String
    state: String
    zip: String
    phone: String
    email: String
    headquarters: Boolean
  }

type Query {
  getCompanyLocations(companyId:String!
  ): [CompanyLocation]
}

  type Mutation {
    createCompanyLocation(
      companyId: String!
      address1: String
      address2: String
      city: String
      state: String
      zip: String
      phone: String
      email: String
    ): CompanyLocation

    updateCompanyLocation(
      companyId: String!
      locationId: String!
      address1: String
      address2: String
      city: String
      state: String
      zip: String
      phone: String
      email: String
      headquarters: Boolean
    ): CompanyLocation
    deleteCompanyLocation(
      companyId: String!
      locationId: String!
    ): CompanyLocation
  }
  `
;

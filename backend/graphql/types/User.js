export default `
  type User {
    userId: String!
    userNumber: Int
    companyId: String!
    email: String!
    first: String
    last: String
    gender: GenderEnum
    employeeId: String
    birthdate: String
    maritalStatus: String
    workPhone: String
    workEmail: String
    phone: String
    hiredate: String
    department: String
    jobTitle: String
    address1: String
    address2: String
    city: String
    state: String
    zip: String
    contactFirst: String
    contactLast: String
    contactRelationship: String
    contactPhone: String
    contact2First: String
    contact2Last: String
    contact2Relationship: String
    contact2Phone: String
    offerUpload: String
    profilePhoto: String
    i9: String
    details: String
    funfact: String
    userRole: UserRoleEnum!
    """Get Users Company Object"""
    company: Company
    profilePhotoUrl: String
    userStatus: UserStatusEnum
    employmentStatus: EmploymentStatusEnum
    effectiveDate: String
    createdOn: String
    """Companies for Account Managers"""
    assignedCompanies: [String]
  }

  input UserInput {
    userId: String!
    companyId: String!
    employeeId: String
    email: String!
    first: String
    last: String
    gender: GenderEnum
    birthdate: String
    maritalStatus: MaritalStatusEnum
    workPhone: String
    phone: String
    hiredate: String
    department: String
    jobTitle: String
    address1: String
    address2: String
    city: String
    state: String
    zip: String
    contactFirst: String
    contactLast: String
    contactRelationship: String
    contactPhone: String
    contact2First: String
    contact2Last: String
    contact2Relationship: String
    contact2Phone: String
    offerUpload: String
    i9: String
    details: String
    funfact: String
    userRole: UserRoleEnum!
    userStatus: UserStatusEnum
    effectiveDate: String
  }

  type Query {
    me: User
    getUser(userId: String!,companyId: String!): User
    companyUsers(companyId:String!): [User]
    listUsers: [User]
  }

  type Mutation {
    createUser(
      companyId: String!
      email: String!
      workEmail: String
      first: String
      last: String
      gender: GenderEnum
      employeeId: String
      birthdate: String
      maritalStatus: String
      workPhone: String
      phone: String
      hiredate: String
      department: String
      jobTitle: String
      address1: String
      address2: String
      city: String
      state: String
      zip: String
      contactFirst: String
      contactLast: String
      contactRelationship: String
      contactPhone: String
      contact2First: String
      contact2Last: String
      contact2Relationship: String
      contact2Phone: String
      offerUpload: String
      i9: String
      details: String
      funfact: String
      userRole: UserRoleEnum!
      userStatus: UserStatusEnum
      effectiveDate: String
      assignedCompanies: [String]
    ): User

    uploadProfilePicture(
      userId: String!
      companyId: String!
      filename: String!
    ): String

    registerCompanyAndOwner(
      email: String!
      first: String
      last: String
      companySize: String
      companyName: String!
      industry: String
      companyLocations: [LocationInput]
      phone: String
    ): String

    updateUser(
      userId: String!
      companyId: String!
      email: String
      workEmail: String
      first: String
      last: String
      gender: GenderEnum
      employeeId: String
      birthdate: String
      maritalStatus: String
      workPhone: String
      phone: String
      hiredate: String
      department: String
      jobTitle: String
      address1: String
      address2: String
      city: String
      state: String
      zip: String
      contactFirst: String
      contactLast: String
      contactRelationship: String
      contactPhone: String
      contact2First: String
      contact2Last: String
      contact2Relationship: String
      contact2Phone: String
      offerUpload: String
      i9: String
      details: String
      funfact: String
      userRole: UserRoleEnum
      userStatus: UserStatusEnum
      employmentStatus: EmploymentStatusEnum
      effectiveDate: String
      assignedCompanies: [String]
    ): User

    deleteUser(userId:String! companyId:String!): User
  }
  `
;

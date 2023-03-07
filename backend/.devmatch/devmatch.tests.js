import "regenerator-runtime/runtime.js";
import { v4 as uuidv4 } from 'uuid';
const gql = require('graphql-tag');

import {
  LIST_USERS,
  LIST_COMPANIES,
  GET_USER,
  COMPANY_USERS,
} from "../__tests__/queries";
import {
  CREATE_ADMIN,
  CREATE_COMPANY_AND_OWNER,
  UPDATE_USER,
} from "../__tests__/mutations";
import { expect } from "chai";

const { createTestClient } = require("apollo-server-testing");
const { createServer } = require("../__tests__/server");

describe("DEVMATCH_TEST_CASES", () => {
  const server = createServer({
    user: {
      userId: "employee@test.com",
      userRole: "employee",
      companyId: "5a198de0-7355-11ea-a6e4-335f2e84501a",
      email: "employee@test.com",
    },
  });

  it("TEST_CASE_1", async () => {
    const uniqueId = uuidv4();
    const { query, mutate } = createTestClient(server);
    const reponse1 = await query({ query: LIST_USERS });
    expect(reponse1.data.listUsers).to.be.an("array");
    const oldListSize = reponse1.data.listUsers.length;

    //
    // Create a known user
    //
    const email = `${uniqueId}@contoso.com`;
    const companyName = `${uniqueId} Incorporated`;
    let creationResult = await mutate({
      mutation: CREATE_COMPANY_AND_OWNER,
      variables: { email: email, companyName: companyName },
    });
    // Internally, the user email beecomes the ID
    const userId = email;

    //
    // We should now have +1 users on the list, and one of
    // them should be the user we just added
    //
    const response2 = await query({ query: LIST_USERS });
    expect(response2.data.listUsers).to.be.an("array");
    expect(response2.data.listUsers).to.have.length(oldListSize + 1)
    const foundElement = response2.data.listUsers.find((el)=> el.userId === userId)
    expect(foundElement).to.not.be.null;
  });

  it("TEST_CASE_2", async () => {
    const uniqueId = uuidv4();
    const { query, mutate } = createTestClient(server);

    //
    // First, create a user and a company
    //
    const email = `${uniqueId}@contoso.com`;
    const companyName = `${uniqueId} Incorporated`;
    let creationResult = await mutate({
      mutation: CREATE_COMPANY_AND_OWNER,
      variables: { email: email, companyName: companyName },
    });
    const companyId = creationResult.data.createCompanyAndOwner.companyId;

    //
    // Fetch the recently created user
    //
    const userId = email;
    const getUserRes = await query({ query: GET_USER,  
      variables: { userId: userId, companyId: companyId }
    });
    expect(getUserRes.data.getUser).to.be.an("object");
    expect(getUserRes.data.getUser.userId).to.equal(userId);
    expect(getUserRes.data.getUser.email).to.equal(email);
    expect(getUserRes.data.getUser.first).to.be.null;
    expect(getUserRes.data.getUser.last).to.be.null;

    //
    // Now you can update the user
    //
    const updateUserRes = await mutate({ query: UPDATE_USER,  
      variables: { userId: userId, companyId: companyId, first: "John", last: "Doe"}
    });

    //
    // Fetch the modified user again to confirm first and last names are updated
    //
    const getUserAgainRes = await query({ query: GET_USER,  
      variables: { userId: userId, companyId: companyId }
    });
    expect(getUserAgainRes.data.getUser).to.be.an("object");
    expect(getUserAgainRes.data.getUser.userId).to.equal(userId);
    expect(getUserAgainRes.data.getUser.email).to.equal(email);
    expect(getUserAgainRes.data.getUser.first).to.equal("John");
    expect(getUserAgainRes.data.getUser.last).to.equal("Doe");
  });

  it("TEST_CASE_3", async () => {
    const uniqueId = uuidv4();
    const { query, mutate } = createTestClient(server);

    //
    // Create a new company
    //
    const email = `${uniqueId}@contoso.com`;
    const companyName = `${uniqueId} Incorporated`;

    const CREATE_COMPANY_AND_OWNER = gql`
    mutation createCompanyAndOwner($email:String!, $companyName:String!, $employeeCount:Int){
      createCompanyAndOwner(email: $email, companyName: $companyName, employeeCount: $employeeCount){
        companyName
        companyId
        employeeCount
      }
    } `

    let creationResult = await mutate({
      mutation: CREATE_COMPANY_AND_OWNER,
      variables: { email: email, companyName: companyName, employeeCount: 123 },
    });
    
    // Internally, the user email beecomes the ID
    const companyId = creationResult.data.createCompanyAndOwner.companyId;
    expect(creationResult.data.createCompanyAndOwner.employeeCount).not.to.be.null;
    expect(creationResult.data.createCompanyAndOwner.employeeCount).to.equal(123)

    //
    // Update the field
    //
    const UPDATE_COMPANY = `
      mutation updateCompany($companyId:String!,$employeeCount:Int!){
        updateCompany(companyId:$companyId, employeeCount:$employeeCount){
          companyId
          employeeCount
        }
      }`
    let updateResult = await mutate({
      mutation: UPDATE_COMPANY,
      variables: { companyId: companyId, employeeCount: 512 },
    });
    expect(updateResult.data.updateCompany.employeeCount).not.to.be.null;
    expect(updateResult.data.updateCompany.employeeCount).to.equal(512)
  });
})

import "regenerator-runtime/runtime.js";

import {
  LIST_USERS,
  LIST_COMPANIES,
  LIST_DOCUMENTS,
  LIST_EMPLOYEE_DOCUMENTS,
  EMPLOYEE_DOCUMENTS_BY_USER,
  GET_EMPLOYEE_DOCUMENT,
  GET_ADMIN_USER,
  COMPANY_USERS,
} from "./queries";
import {
  CREATE_ADMIN,
  CREATE_ADMIN_DOCUMENT,
  CREATE_EMPLOYEE_DOCUMENT,
  UPDATE_ADMIN_DOCUMENT,
  UPDATE_EMPLOYEE_DOCUMENT,
} from "./mutations";
import { expect } from "chai";

const { createTestClient } = require("apollo-server-testing");
const { createServer } = require("./server");

describe("Queries", () => {
  const server = createServer({
    user: {
      userId: "employee@test.com",
      userRole: "employee",
      companyId: "5a198de0-7355-11ea-a6e4-335f2e84501a",
      email: "employee@test.com",
    },
  });

  it("list Users", async () => {
    const { query } = createTestClient(server);
    const res = await query({ query: LIST_USERS });
    expect(res.data.listUsers).to.be.an("array");
  });

  it("list Companies", async () => {
    const { query } = createTestClient(server);
    const res = await query({ query: LIST_COMPANIES });
    expect(res.data.listCompanies).to.be.an("array");
  });

  //it("get user", async () => {
  //  const { query } = createTestClient(server);
  //  const res = await query({ query: GET_ADMIN_USER });
  //  expect(res.errors).toBeDefined();
  //});

  it("list company users", async () => {
    const { query } = createTestClient(server);
    const res = await query({ query: COMPANY_USERS });
    expect(res.data.companyUsers).to.be.an("array");
  });


})

describe("Mutations", () => {
  const server = createServer({
    user: {
      userId: "employee@test.com",
      userRole: "employee",
      companyId: "5a198de0-7355-11ea-a6e4-335f2e84501a",
      email: "employee@test.com",
    },
  });

  it("create admin user", async () => {
    const { mutate } = createTestClient(server);
    const rand = Math.floor(Math.random() * 10000);
    const email = "test" + rand + "@oyea.app";
    const res = await mutate({
      mutation: CREATE_ADMIN,
      variables: { email: email },
    });
    //expect(res.errors).toBeDefined();
  });
});

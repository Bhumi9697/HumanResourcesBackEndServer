import "regenerator-runtime/runtime.js";
import { LIST_USERS, 
  LIST_COMPANIES, 
  LIST_DOCUMENTS, 
  LIST_EMPLOYEE_DOCUMENTS, 
  EMPLOYEE_DOCUMENTS_BY_USER,
  GET_EMPLOYEE_DOCUMENT,
  GET_ADMIN_USER, 
  COMPANY_USERS } from './queries'
import { CREATE_ADMIN, 
  CREATE_ADMIN_DOCUMENT, 
  CREATE_EMPLOYEE_DOCUMENT,
UPDATE_ADMIN_DOCUMENT,
UPDATE_EMPLOYEE_DOCUMENT } from "./mutations";
const {createTestClient} = require('apollo-server-testing');

//onst nock = require('nock');

const {createServer} = require('./server');

describe('Queries', () => {
  const server = createServer(
  {user: {userId: "employee@test.com", userRole:"employee",companyId:"5a198de0-7355-11ea-a6e4-335f2e84501a", email: 'employee@test.com'}},
  );

  it('list Users', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: LIST_USERS});
    expect(res.errors).toBeDefined();
  });

   it('list Companies', async () => {
     const {query} = createTestClient(server);
     const res = await query({query: LIST_COMPANIES});
     expect(res.errors).toBeDefined();
   });

  it('list documents', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: LIST_DOCUMENTS});
    expect(res.errors).toBeDefined();
  });

  it('list employee documents', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: LIST_EMPLOYEE_DOCUMENTS});
    expect(res.errors).toBeDefined();
  });

  it('get single employee documents', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: GET_EMPLOYEE_DOCUMENT});
    expect(res.errors).toBeDefined();
  });

  it('list employee documents by user', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: EMPLOYEE_DOCUMENTS_BY_USER});
    expect(res.errors).toBeDefined();
  });

  it('get user', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: GET_ADMIN_USER});
    expect(res.errors).toBeDefined();
  });

  it('list company users', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: COMPANY_USERS});
    expect(res.errors).toBeDefined();
  });
});


describe('Mutations', () => {
  const server = createServer(
  {user: {userId: "employee@test.com", userRole:"employee",companyId:"5a198de0-7355-11ea-a6e4-335f2e84501a", email: 'employee@test.com'}},
  );

  it('create admin user', async () => {
    const {mutate} = createTestClient(server);
    const rand = Math.floor( Math.random() * 10000 );
    const email = "test" + rand + "@oyea.app";
    const res = await mutate({mutation: CREATE_ADMIN, variables:{email:email}});
    expect(res.errors).toBeDefined();
  });

  it('create admin document', async () => {
    const {mutate} = createTestClient(server);
    const res = await mutate({mutation: CREATE_ADMIN_DOCUMENT});
    expect(res.errors).toBeDefined();
  });

  it('create employee document', async () => {
    const {mutate} = createTestClient(server);
    const res = await mutate({mutation: CREATE_EMPLOYEE_DOCUMENT});
    expect(res.errors).toBeDefined();
  });

  it('update admin document', async () => {
    const {mutate} = createTestClient(server);
    const res = await mutate({mutation: UPDATE_ADMIN_DOCUMENT});
    expect(res.errors).toBeDefined();
  });

  it('update employee document', async () => {
    const {mutate} = createTestClient(server);
    const res = await mutate({mutation: UPDATE_EMPLOYEE_DOCUMENT});
    expect(res.errors).toBeDefined();
  });

});


import "regenerator-runtime/runtime.js";
import { 
  ME,
  LIST_USERS, 
  LIST_COMPANIES,
  GET_COMPANY_LOCATIONS,
  LIST_DOCUMENTS,
  LIST_MY_DOCUMENTS,
  LIST_EMPLOYEE_DOCUMENTS, 
  GET_ADMIN_USER, 
  COMPANY_USERS, 
  GET_COMPANY, 
  GET_EMPLOYEE_DOCUMENT,
  GET_MY_DOCUMENT_CATEGORIES,
  EMPLOYEE_DOCUMENTS_BY_USER,
  EMPLOYEE_DOCUMENTS_BY_COMPANY } from './queries'

import { CREATE_ADMIN, 
  CREATE_ADMIN_DOCUMENT, 
  CREATE_EMPLOYEE_DOCUMENT, 
  UPDATE_ADMIN_DOCUMENT, 
  UPDATE_EMPLOYEE_DOCUMENT,
  CREATE_DOCUMENT_CATEGORY
 } from "./mutations";

const {createTestClient} = require('apollo-server-testing');

//onst nock = require('nock');

const {createServer} = require('./server');

describe('Queries', () => {
  const server = createServer(
  {user: {userId: "admin@test.com", userRole:"superadmin",companyId:"cavness", email: 'admin@test.com'}},
  );

  //self

  it('get self', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: ME});
    expect(res.errors).toBeUndefined();
  });


// Users 
  it('list Users', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: LIST_USERS});
    expect(res.errors).toBeUndefined();
  });

  it('get user', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: GET_ADMIN_USER});
    expect(res.errors).toBeUndefined();
  });

  it('list company users', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: COMPANY_USERS});
    expect(res.errors).toBeUndefined();
  });
// Companies
   it('list Companies', async () => {
     const {query} = createTestClient(server);
     const res = await query({query: LIST_COMPANIES});
     expect(res.errors).toBeUndefined();
   });

   it('get single company', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: GET_COMPANY});
    expect(res.errors).toBeUndefined();
  });

  it('get company locations', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: GET_COMPANY_LOCATIONS});
    expect(res.errors).toBeUndefined();
  });

  it('list My documents', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: LIST_MY_DOCUMENTS});
    expect(res.errors).toBeUndefined();
  });

// Documents
  it('list documents', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: LIST_DOCUMENTS});
    expect(res.errors).toBeUndefined();
  });
// Employee Documents
  it('list employee documents', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: LIST_EMPLOYEE_DOCUMENTS});
    expect(res.errors).toBeUndefined();
  });

  it('list employee documents by user', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: EMPLOYEE_DOCUMENTS_BY_USER});
    expect(res.errors).toBeUndefined();
  });

  it('list employee documents by company', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: EMPLOYEE_DOCUMENTS_BY_COMPANY});
    expect(res.errors).toBeUndefined();
  });

  it('get employee document', async () => {
    const {query} = createTestClient(server);
    const res = await query({query: GET_EMPLOYEE_DOCUMENT});
    expect(res.errors).toBeUndefined();
  });

  it('fetch document categories', async () => {
    const randText = "random text" + Math.floor( Math.random() * 10000 );
    const {mutate} = createTestClient(server);
    const res = await mutate({query: GET_MY_DOCUMENT_CATEGORIES});
    expect(res.errors).toBeUndefined();
  });

});

describe('Mutations', () => {
  const server = createServer(
  {user: {userId: "admin@test.com", userRole:"superadmin",companyId:"cavness", email: 'admin@test.com'}},
  );


  // Mutations

  // Comment to avoid excessive emails!
  // it('create admin user', async () => {
  //   const {mutate} = createTestClient(server);
  //   const rand = Math.floor( Math.random() * 10000 );
  //   const email = "test" + rand + "@oyea.app";
  //   const res = await mutate({mutation: CREATE_ADMIN, variables:{email:email}});
  //   expect(res.errors).toBeUndefined();
  // });


  it('create admin document', async () => {
    const {mutate} = createTestClient(server);
    const res = await mutate({mutation: CREATE_ADMIN_DOCUMENT});
    console.log(res)
    expect(res.errors).toBeUndefined();
  });

  it('update admin document', async () => {
    const {mutate} = createTestClient(server);
    const res = await mutate({mutation: UPDATE_ADMIN_DOCUMENT});
    console.log(res)
    expect(res.errors).toBeUndefined();
  });

  it('create personal document for admin user', async () => {
    const {mutate} = createTestClient(server);
    const res = await mutate({mutation: CREATE_EMPLOYEE_DOCUMENT});
    expect(res.errors).toBeUndefined();
  });

  it('create personal document for admin user', async () => {
    const {mutate} = createTestClient(server);
    const res = await mutate({mutation: UPDATE_EMPLOYEE_DOCUMENT});
    expect(res.errors).toBeUndefined();
  });

  it('create document category', async () => {
    const randText = "random text" + Math.floor( Math.random() * 10000 );
    const {mutate} = createTestClient(server);
    const res = await mutate({mutation: CREATE_DOCUMENT_CATEGORY, variables:{categoryText:randText}});
    expect(res.errors).toBeUndefined();
  });



});


export const schema = {
  models: {
    Employee: {
      name: 'Employee',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        first_name: {
          name: 'first_name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        last_name: {
          name: 'last_name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        email: {
          name: 'email',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        phone: {
          name: 'phone',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        CompanyOfEmployee: {
          name: 'CompanyOfEmployee',
          isArray: false,
          type: {
            model: 'Company'
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetName: 'companyID'
          }
        },
        birthdate: {
          name: 'birthdate',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        DocumentsForEmployee: {
          name: 'DocumentsForEmployee',
          isArray: true,
          type: {
            model: 'Document'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'id'
          }
        },
        location: {
          name: 'location',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        position: {
          name: 'position',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        address: {
          name: 'address',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        emergency_contact_name: {
          name: 'emergency_contact_name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        emergency_contact_relation: {
          name: 'emergency_contact_relation',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        emergency_contact_email: {
          name: 'emergency_contact_email',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        emergency_contact_phone: {
          name: 'emergency_contact_phone',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        hasSignature: {
          name: 'hasSignature',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        companyID: {
          name: 'companyID',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        city: {
          name: 'city',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        state: {
          name: 'state',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        zip: {
          name: 'zip',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        id_docs: {
          name: 'id_docs',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        ListA_image: {
          name: 'ListA_image',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        ListB_image: {
          name: 'ListB_image',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        ListC_image: {
          name: 'ListC_image',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'Employees',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            name: 'byCompany',
            fields: ['companyID']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    Company: {
      name: 'Company',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        name: {
          name: 'name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        location: {
          name: 'location',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        employee_count: {
          name: 'employee_count',
          isArray: false,
          type: 'Int',
          isRequired: false,
          attributes: []
        },
        Employees: {
          name: 'Employees',
          isArray: true,
          type: {
            model: 'Employee'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'CompanyOfEmployee'
          }
        },
        documents: {
          name: 'documents',
          isArray: true,
          type: {
            model: 'Document'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'companyID'
          }
        },
        Contractors: {
          name: 'Contractors',
          isArray: true,
          type: {
            model: 'Contractor'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'CompanyOfContractor'
          }
        },
        employee_handbook: {
          name: 'employee_handbook',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        hr_policies: {
          name: 'hr_policies',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        laws: {
          name: 'laws',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        companyLogoURL: {
          name: 'companyLogoURL',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        labor_posters: {
          name: 'labor_posters',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        employee_handbook_questions: {
          name: 'employee_handbook_questions',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        google_drive: {
          name: 'google_drive',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'Companies',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    Document: {
      name: 'Document',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        Type: {
          name: 'Type',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        fileName: {
          name: 'fileName',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        url: {
          name: 'url',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        isSigned: {
          name: 'isSigned',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        contractorID: {
          name: 'contractorID',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        employeeID: {
          name: 'employeeID',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        companyID: {
          name: 'companyID',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        DocumentForContractor: {
          name: 'DocumentForContractor',
          isArray: false,
          type: {
            model: 'Contractor'
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetName: 'contractorDocumentsForContractorId'
          }
        },
        DocumentForEmployee: {
          name: 'DocumentForEmployee',
          isArray: false,
          type: {
            model: 'Employee'
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetName: 'employeeDocumentsForEmployeeId'
          }
        },
        DocumentForCompany: {
          name: 'DocumentForCompany',
          isArray: false,
          type: {
            model: 'Company'
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetName: 'companyDocumentsId'
          }
        },
        isSent: {
          name: 'isSent',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        sign_url: {
          name: 'sign_url',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'Documents',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            name: 'byContractor',
            fields: ['contractorID']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'byEmployee',
            fields: ['employeeID']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'byCompany',
            fields: ['companyID']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    Contractor: {
      name: 'Contractor',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        first_name: {
          name: 'first_name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        last_name: {
          name: 'last_name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        email: {
          name: 'email',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        phone: {
          name: 'phone',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        birthdate: {
          name: 'birthdate',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        CompanyOfContractor: {
          name: 'CompanyOfContractor',
          isArray: false,
          type: {
            model: 'Company'
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetName: 'companyID'
          }
        },
        DocumentsForContractor: {
          name: 'DocumentsForContractor',
          isArray: true,
          type: {
            model: 'Document'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: 'contractorID'
          }
        },
        location: {
          name: 'location',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        companyID: {
          name: 'companyID',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        position: {
          name: 'position',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        address: {
          name: 'address',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        emergency_contact_name: {
          name: 'emergency_contact_name',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        emergency_contact_relation: {
          name: 'emergency_contact_relation',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        emergency_contact_email: {
          name: 'emergency_contact_email',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        emergency_contact_phone: {
          name: 'emergency_contact_phone',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        hasSignature: {
          name: 'hasSignature',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        city: {
          name: 'city',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        state: {
          name: 'state',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        zip: {
          name: 'zip',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        id_docs: {
          name: 'id_docs',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        ListA_Image: {
          name: 'ListA_Image',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        ListB_image: {
          name: 'ListB_image',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        ListC_image: {
          name: 'ListC_image',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'Contractors',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            name: 'byCompany',
            fields: ['companyID']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    }
  },
  enums: {},
  nonModels: {},
  version: '9f018f0dbc20eb809d2fb23d900bb381'
}

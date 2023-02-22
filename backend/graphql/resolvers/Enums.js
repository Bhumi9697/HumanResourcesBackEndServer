export default {

  GenderEnum: {
    MALE:'male',
    FEMALE:'female',
    OTHER: 'other'
  },
  MaritalStatusEnum: {
    SINGLE: 'single',
    MARRIED: 'married',
    DIVORCED: 'divorced',
    WIDOWED: 'widowed'
  },
  UserStatusEnum: {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
  },
  CompanyStatusEnum: {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
  },
  StatusEnum: {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
  },
  UserRoleEnum:{
    OWNER:'owner',
    HR:'hr',
    EMPLOYEE:'employee',
    SUPERADMIN:'superadmin',
    ACCOUNTMANAGER:'accountmanager'
  },
  DocumentTypeEnum:{
    CITY:'city',
    NATIONAL:'national',
    STATE:'state',
    COMPANY:'company'
  },
  EmployeeDocumentTypeEnum:{
    IDPROOF:'idproof',
    EMPLOYEEHANDBOOK:'employeehandbook',
    I9FORM:'i9form',
    HRPOLICY:'hrpolicy',
  },
  DocumentCategoryEnum:{
    LABORPOSTER:'laborposter',
    HRLAWS:'hrlaws',
    EMPLOYEEHANDBOOK:'employeehandbook',
    HRPOLICY:'hrpolicy',
    JOBDESCRIPTION:'jobdescription',
    ONBOARDING:'onboarding'
  },
  ActionTypeEnum:{
    USERDOCUMENTADDED:'userdocumentadded',
    UPLOADNEEDED:'uploadneeded',
    USERSTATUSCHANGE:'userstatuschange',
    DOCUMENTDELETED:'documentdeleted',
    EMPLOYEEADDED:'employeeadded'
  },
  EmploymentStatusEnum:{
    FMLA:'fmla',
    MATERNITYLEAVE:'maternityleave',
    PATERNITYLEAVE:'paternityleave',
    LOA:'loa',
    VACATION:'vacation',
    SUSPENDED:'suspended',
    TERMINATED:'terminated',
    ACTIVE:'active'
  }

};

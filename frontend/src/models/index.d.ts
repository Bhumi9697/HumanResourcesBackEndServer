import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type EmployeeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CompanyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DocumentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ContractorMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Employee {
  readonly id: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly CompanyOfEmployee?: Company;
  readonly birthdate?: string;
  readonly DocumentsForEmployee?: (Document | null)[];
  readonly location?: string;
  readonly position?: string;
  readonly address?: string;
  readonly emergency_contact_name?: string;
  readonly emergency_contact_relation?: string;
  readonly emergency_contact_email?: string;
  readonly emergency_contact_phone?: string;
  readonly hasSignature?: boolean;
  readonly companyID?: string;
  readonly city?: string;
  readonly state?: string;
  readonly zip?: string;
  readonly id_docs?: boolean;
  readonly ListA_image?: string;
  readonly ListB_image?: string;
  readonly ListC_image?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Employee, EmployeeMetaData>);
  static copyOf(source: Employee, mutator: (draft: MutableModel<Employee, EmployeeMetaData>) => MutableModel<Employee, EmployeeMetaData> | void): Employee;
}

export declare class Company {
  readonly id: string;
  readonly name?: string;
  readonly location?: string;
  readonly employee_count?: number;
  readonly Employees?: (Employee | null)[];
  readonly documents?: (Document | null)[];
  readonly Contractors?: (Contractor | null)[];
  readonly employee_handbook?: string;
  readonly hr_policies?: string;
  readonly laws?: string;
  readonly companyLogoURL?: string;
  readonly labor_posters?: string;
  readonly employee_handbook_questions?: string;
  readonly google_drive?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Company, CompanyMetaData>);
  static copyOf(source: Company, mutator: (draft: MutableModel<Company, CompanyMetaData>) => MutableModel<Company, CompanyMetaData> | void): Company;
}

export declare class Document {
  readonly id: string;
  readonly Type?: string;
  readonly fileName?: string;
  readonly url?: string;
  readonly isSigned?: boolean;
  readonly contractorID?: string;
  readonly employeeID?: string;
  readonly companyID?: string;
  readonly DocumentForContractor?: Contractor;
  readonly DocumentForEmployee?: Employee;
  readonly DocumentForCompany?: Company;
  readonly isSent?: boolean;
  readonly sign_url?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Document, DocumentMetaData>);
  static copyOf(source: Document, mutator: (draft: MutableModel<Document, DocumentMetaData>) => MutableModel<Document, DocumentMetaData> | void): Document;
}

export declare class Contractor {
  readonly id: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly birthdate?: string;
  readonly CompanyOfContractor?: Company;
  readonly DocumentsForContractor?: (Document | null)[];
  readonly location?: string;
  readonly companyID?: string;
  readonly position?: string;
  readonly address?: string;
  readonly emergency_contact_name?: string;
  readonly emergency_contact_relation?: string;
  readonly emergency_contact_email?: string;
  readonly emergency_contact_phone?: string;
  readonly hasSignature?: boolean;
  readonly city?: string;
  readonly state?: string;
  readonly zip?: string;
  readonly id_docs?: boolean;
  readonly ListA_Image?: string;
  readonly ListB_image?: string;
  readonly ListC_image?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Contractor, ContractorMetaData>);
  static copyOf(source: Contractor, mutator: (draft: MutableModel<Contractor, ContractorMetaData>) => MutableModel<Contractor, ContractorMetaData> | void): Contractor;
}
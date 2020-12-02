export type TSalary = {
  from: number,
  to: number,
  currency: string,
  gross: boolean
}

export type TArea = {
  id: string;
  parent_id?: string;
  name: string;
  areas?: TArea[];
}

export interface IJobs {
  id: string;
  name: string;
  salary: TSalary;
  place: string;
  url: string;
  snippet: {
    requirement: string,
    responsibility: string
  },
}

export interface ISearchOptions {
  text: string,
  action: string,
  place: string,
  salary: number,
  found: number,
  pages: number,
  perPage: number,
  page: number,
}

export interface IInputs {
  vacancy: string;
  place: string;
  salary: string;
}

export interface IVacancy {
  id: string;
  name: string;
  area: string;
  employer: {
    name: string,
    url: string,
  }
  description: string;
  salary: TSalary;
}

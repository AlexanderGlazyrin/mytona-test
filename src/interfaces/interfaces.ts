export type Salary = {
  from: number,
  to: number,
  currency: string,
  gross: boolean
}

export interface IJobs {
  name: string;
  salary: Salary;
  place: string;
  url: string;
  snippet: {
    requirement: string,
    responsibility: string
  },
}

export interface SearchOptions {
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

export type Area = {
  id: string;
  parent_id?: string | null;
  name: string;
  areas?: Area[];
}


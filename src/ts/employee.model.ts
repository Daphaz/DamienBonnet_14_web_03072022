export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  birthday: string;
  startDate: string;
  street?: string | undefined;
  city?: string | undefined;
  state: string;
  zipCode?: number | undefined;
  department: string;
}

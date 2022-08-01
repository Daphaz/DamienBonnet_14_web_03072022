export interface CreateEmployeeDto {
  /** birthday of the employee */
  birthday: string;
  /** city of the employee */
  city?: string | undefined;
  /** department of the employee */
  department: string;
  /** firstname of the employee */
  firstname: string;
  /** lastname of the employee */
  lastname: string;
  /** startDate of the employee */
  startDate: string;
  /** state of the employee */
  state: string;
  /** street of the employee */
  street?: string | undefined;
  /** zipCode of the employee */
  zipCode?: number | undefined;
}

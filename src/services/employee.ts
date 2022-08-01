import { EMPLOYEE_KEY_STORAGE } from '@/lib';

import { Employee } from '@/ts';

const getAll = (): Employee[] | null => {
  const datas = window.localStorage.getItem(EMPLOYEE_KEY_STORAGE);
  if (!datas) return null;
  return JSON.parse(datas);
};

const add = (data: Employee): Employee[] => {
  const prevEmployees = getAll();

  if (!prevEmployees) {
    window.localStorage.setItem(EMPLOYEE_KEY_STORAGE, JSON.stringify([data]));
    return [data];
  }

  const newArray = [...prevEmployees, data];
  window.localStorage.setItem(EMPLOYEE_KEY_STORAGE, JSON.stringify(newArray));
  return newArray;
};

const employeeService = {
  getAll,
  add,
};

export default employeeService;

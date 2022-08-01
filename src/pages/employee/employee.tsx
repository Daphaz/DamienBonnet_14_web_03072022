import { Container } from '@daphaz/hrnet-ui';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { CellValue, Column } from 'react-table';

import s from './styles.module.scss';

import { Table } from '@/components';

import employeeService from '@/services/employee';

export const EmployeePage = () => {
  const employees = employeeService.getAll();

  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstname', // accessor is the "key" in the data
      },
      {
        Header: 'Last Name',
        accessor: 'lastname',
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: ({ value }: CellValue) => format(new Date(value), 'dd/MM/yyyy'),
      },
      {
        Header: 'Department',
        accessor: 'department',
      },
      {
        Header: 'Date of Birth',
        accessor: 'birthday',
        Cell: ({ value }: CellValue) => format(new Date(value), 'dd/MM/yyyy'),
      },
      {
        Header: 'Street',
        accessor: 'street',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Zip Code',
        accessor: 'zipCode',
      },
    ],
    []
  );

  if (!employees) {
    return (
      <Container xl className={s.main}>
        <h3>There is no employees already..</h3>
      </Container>
    );
  }

  return (
    <Container xl className={s.main}>
      <h1 className={s.title}>Current Employees</h1>
      <Table
        columns={columns as Column<Record<string, unknown>>[]}
        data={employees as unknown as Record<string, unknown>[]}
      />
    </Container>
  );
};

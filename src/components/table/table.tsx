import { Container, Dropdown } from '@daphaz/hrnet-ui';
import clsx from 'clsx';
import { FC } from 'react';
import {
  Column,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

import s from './styles.module.scss';

import { GlobalFilter } from './global-filter';
import { TablePagination } from './pagination';

export interface TableProps {
  columns: Column<Record<string, unknown>>[];
  data: Record<string, unknown>[];
}

export const Table: FC<TableProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    pageOptions,
    state: { pageSize, pageIndex, globalFilter },
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  return (
    <div className={s.root}>
      <Container
        display='flex'
        justify='space_between'
        alignItems='center'
        fluid
        wrap='wrap'
        className={s.header}
      >
        <Dropdown
          classContainer={clsx(s.dropDown, s.full)}
          options={[
            {
              label: 'Show 10 entries',
              value: '10',
            },
            {
              label: 'Show 25 entries',
              value: '25',
            },
            {
              label: 'Show 50 entries',
              value: '50',
            },
            {
              label: 'Show 100 entries',
              value: '100',
            },
          ]}
          placeholder={`Show ${pageSize} entries`}
          onChange={val => {
            setPageSize(Number(val));
          }}
          variants='primary'
        />

        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Container>

      <div className={s.tableContainer}>
        <table {...getTableProps()} className={s.table}>
          <thead className={s.thead}>
            {
              // Loop over the header rows
              headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column, i) => (
                      // Apply the header cell props
                      <th
                        {...column.getSortByToggleProps()}
                        key={`table-col-${i}`}
                      >
                        {
                          // Render the header
                          column.render('Header')
                        }
                        <span>
                          {column.isSorted ? (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                              width='1em'
                              height='1em'
                              viewBox='0 0 24 24'
                              className={clsx(s.sort, {
                                [s.isSortedDesc]: column.isSortedDesc,
                              })}
                            >
                              <path
                                fill='currentColor'
                                d='M11.65 14.65q.15.15.35.15q.2 0 .35-.15l2.8-2.8q.225-.225.112-.538Q15.15 11 14.8 11H9.2q-.35 0-.462.312q-.113.313.112.538ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z'
                              ></path>
                            </svg>
                          ) : (
                            ''
                          )}
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()} className={s.tbody}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <th colSpan={10}>
                <TablePagination
                  canPreviousPage={canPreviousPage}
                  canNextPage={canNextPage}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  pageIndex={pageIndex}
                  pageOptions={pageOptions}
                />
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

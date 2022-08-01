import { FC } from 'react';

import s from './styles.module.scss';

export interface TablePaginationProps {
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageOptions: number[];
}

export const TablePagination: FC<TablePaginationProps> = ({
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageOptions,
}) => {
  return (
    <div className={s.pagination}>
      <span className={s.legend}>
        Page<strong>&nbsp;{pageIndex + 1}&nbsp;</strong>of
        <strong>&nbsp;{pageOptions.length}&nbsp;</strong>
      </span>

      <div className={s.btns}>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          aria-label='preview page'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width='2em'
            height='2em'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2S2 6.48 2 12zm10-1h4v2h-4v3l-4-4l4-4v3z'
            ></path>
          </svg>
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          aria-label='next page'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width='2em'
            height='2em'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10s10-4.48 10-10zm-10 1H8v-2h4V8l4 4l-4 4v-3z'
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

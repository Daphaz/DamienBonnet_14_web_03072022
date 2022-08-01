import { Input } from '@daphaz/hrnet-ui';
import { Dispatch, FC, SetStateAction } from 'react';

import s from './styles.module.scss';

export interface GlobalFilterProps {
  filter: string | null;
  setFilter: Dispatch<SetStateAction<string | null>>;
}

export const GlobalFilter: FC<GlobalFilterProps> = ({ filter, setFilter }) => {
  return (
    <Input
      inputProps={{
        placeholder: 'Search',
        value: filter || '',
        onChange: e => setFilter(e.target.value),
      }}
      classContainer={s.full}
    />
  );
};

import { FC, PropsWithChildren } from 'react';

import s from './styles.module.scss';

import { Header } from './header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={s.main}>{children}</main>
    </>
  );
};

import { Container } from '@daphaz/hrnet-ui';
import { NavLink } from 'react-router-dom';

import s from './styles.module.scss';

export const Header = () => {
  return (
    <header>
      <Container xl className={s.header}>
        <nav>
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/employee'>View employees</NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

import { RouteObject, useRoutes } from 'react-router-dom';

import { Layout } from './components';
import { EmployeePage, ErrorPage, HomePage } from './pages';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/employee',
    element: <EmployeePage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

const App = () => {
  const element = useRoutes(routes);

  return <Layout children={element} />;
};

export default App;

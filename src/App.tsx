import React from 'react';
import { Outlet } from 'react-router';

import { Layout } from '@shared/components/layouts/Layout';

import './App.css';

export const App: React.FC = () => {
  const appTitle = 'Products Project';

  return (
    <Layout appTitle={appTitle}>
      <Outlet />
    </Layout>
  );
};

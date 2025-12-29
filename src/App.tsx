import React from 'react';
import { Outlet } from 'react-router';

import { Layout } from '@shared/components/layout/Layout';
import { getMenuOptions } from '@shared/utils/menuOptions';

import './App.css';

export const App: React.FC = () => {
  const appTitle = 'Products Project';
  const menuOptions = getMenuOptions();

  return (
    <Layout appTitle={appTitle} menuOptions={menuOptions}>
      <Outlet />
    </Layout>
  );
};

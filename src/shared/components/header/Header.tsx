import React from 'react';
import { NavLink } from 'react-router';

import { Navbar } from '../navbar/Navbar';
import { getMenuOptions } from '@shared/utils/menuOptions';
import { Routes } from '@shared/utils/constants';

type HeaderProps = {
  readonly title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const menuOptions = getMenuOptions();
  return (
    <header className="sticky top-0 z-1000 w-full backdrop-blur-md border-b border-white/10 bg-[rgba(30,30,30,0.8)]">
      <div className="max-w-275 mx-auto px-1 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-[-0.5px] bg-linear-to-r from-white to-[#a0a0a0] bg-clip-text text-transparent">
          <NavLink to={Routes.products}>{title}</NavLink>
        </h1>
        <Navbar options={menuOptions} />
      </div>
    </header>
  );
};

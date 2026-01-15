import React, { type ReactNode } from 'react';
import { Header } from '@shared/components/header/Header';
import { Footer } from '@shared/components/footer/Footer';

type Props = {
  readonly children: ReactNode;
  readonly appTitle: string;
};

export const Layout: React.FC<Props> = ({ appTitle, children }) => {
  return (
    <div className="min-h-screen flex flex-col w-screen">
      <Header title={appTitle}></Header>

      <main className="flex-1 w-full max-w-275 my-0 mx-auto py-12 px-6 text-[#e0e0e0] box-border">
        {children}
      </main>

      <Footer />
    </div>
  );
};

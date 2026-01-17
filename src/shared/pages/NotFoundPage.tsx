import { Routes } from '@shared/utils/constants';
import React from 'react';
import { Link } from 'react-router';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="h-full flex flex-col m-auto items-center justify-center px-4">
      <section className="w-full max-w-md text-center bg-zinc-950 p-8 rounded-xl shadow-lg">
        <span className="block text-6xl font-extrabold text-indigo-600 mb-4">404</span>{' '}
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-6">La página que buscas no existe.</p>
        <Link
          to={Routes.home}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200"
        >
          Volver a inicio
        </Link>
      </section>
    </main>
  );
};

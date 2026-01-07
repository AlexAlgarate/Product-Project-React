import React from 'react';
import { Link } from 'react-router';
import { Card } from '@shared/components/card/Card';
import { constants, Routes } from '@shared/utils/constants';

export const HomePage: React.FC = () => {
  const token =
    localStorage.getItem(constants.tokenKey) ??
    sessionStorage.getItem(constants.tokenKey);

  const isAuthenticated = Boolean(token);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Products project</h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Aplicación de ejemplo para listar, filtrar, crear y gestionar productos.
            Incluye autenticación, rutas protegidas y manejo de estado en React.
          </p>

          <div className="flex flex-wrap gap-4 mb-3">
            <Link
              to={Routes.products}
              className="px-5 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Ver productos
            </Link>

            <Link
              to={`${Routes.products}/new`}
              className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Crear producto
            </Link>

            {!isAuthenticated && (
              <Link
                to={Routes.login}
                className="self-center text-gray-600 underline"
              >
                Ir al login
              </Link>
            )}
          </div>

          <p className="text-sm text-gray-500">
            {isAuthenticated
              ? 'Estás autenticado. Puedes acceder a las rutas protegidas desde la navegación.'
              : 'Las rutas de productos están protegidas. Si no estás logeado se te redirigirá al login.'}
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">¿Qué puedes hacer?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold mb-2">Listado de productos</h3>
            <p className="text-sm text-gray-600">
              Visualiza productos con nombre, precio, tags y estado de oferta.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold mb-2">Filtros en frontend</h3>
            <p className="text-sm text-gray-600">
              Aplica filtros por nombre, precio, ofertas y tags directamente en el
              cliente.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold mb-2">Gestión completa</h3>
            <p className="text-sm text-gray-600">
              Accede al detalle, crea nuevos productos y elimínalos con confirmación.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
};

export { HomePage as Component };

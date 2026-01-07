import React from 'react';
import { Link } from 'react-router';
import { Card } from '@shared/components/card/Card';
import { constants, Routes } from '@shared/utils/constants';

export const HomePage: React.FC = () => {
  const token =
    localStorage.getItem(constants.tokenKey) ??
    sessionStorage.getItem(constants.tokenKey);

  const isAuthenticated = Boolean(token);
  console.log(isAuthenticated);

  return (
    <main>
      <section>
        <div>
          <h1>Products project</h1>
          <p>
            Aplicación de ejemplo para listar, filtrar, crear y gestionar productos.
            Incluye autenticación, rutas protegidas y manejo de estado en React.
          </p>

          <div>
            <Link to={Routes.products}>Ver productos</Link>

            <Link to={`${Routes.products}/new`}>Crear producto</Link>

            {!isAuthenticated && <Link to={Routes.login}>Ir al login</Link>}
          </div>

          <p>
            {isAuthenticated
              ? 'Estás autenticado. Puedes acceder a las rutas protegidas desde la navegación.'
              : 'Las rutas de productos están protegidas. Si no estás logeado se te redirigirá al login.'}
          </p>
        </div>
      </section>

      <section>
        <h2>¿Qué puedes hacer?</h2>

        <div>
          <Card>
            <h3>Listado de productos</h3>
            <p>Visualiza productos con nombre, precio, tags y estado de oferta.</p>
          </Card>

          <Card>
            <h3>Filtros en frontend</h3>
            <p>
              Aplica filtros por nombre, precio, ofertas y tags directamente en el
              cliente.
            </p>
          </Card>

          <Card>
            <h3>Gestión completa</h3>
            <p>
              Accede al detalle, crea nuevos productos y elimínalos con confirmación.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
};

export { HomePage as Component };

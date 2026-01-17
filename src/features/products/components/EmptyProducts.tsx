import { Button, Card } from '@shared/components/ui';
import { Routes } from '@shared/utils/constants';
import React from 'react';

export const EmptyProducts: React.FC = () => {
  return (
    <Card
      className="
        relative flex flex-col items-center gap-6
        rounded-2xl border border-white/10 bg-linear-to-b
      from-white/5 to-transparent p-10 text-center
        shadow-lg backdrop-blur"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-orange-600/80">
        No hay productos disponibles
      </h2>

      <p className="max-w-md text-white/80">
        Aún no has creado ningún producto. Empieza ahora y añade el primero a tu
        catálogo.
      </p>

      <a href={Routes.newProduct}>
        <Button variant="primary" size="lg">
          Crear mi primer producto
        </Button>
      </a>
    </Card>
  );
};

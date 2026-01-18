import React from 'react';
import { Plus } from 'lucide-react';

import { Card } from '@shared/components/ui/Card/Card';
import { Button } from '@shared/components/ui';
import { ProductItem } from './ProductItem/ProductItem';
import { useProducts } from '../hooks/useProducts';
import { EmptyProducts } from './EmptyProducts';
import { Routes } from '@shared/utils/constants';
import { LoadingProducts } from './LoadingProducts';

export const ProductsList: React.FC = () => {
  const { products, error, isLoading } = useProducts();

  if (isLoading) {
    return <LoadingProducts />;
  }

  if (error) {
    let message = error.message;

    if (error.name === 'UnauthorizedError') {
      message = 'No autorizado. Por favor, inicia sesión.';
    }

    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="max-w-md">
          <div className="text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-red-500">Error</h2>
            <p className="mt-2 text-white/80">{message}</p>
          </div>
        </Card>
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Productos</h1>
          <p className="mt-1 text-sm text-white/60">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}{' '}
            disponibles
          </p>
        </div>

        <a href={Routes.newProduct}>
          <Button variant="primary" size="lg" className="flex items-center gap-2">
            <Plus size={20} />
            Nuevo Producto
          </Button>
        </a>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item) => (
          <li key={item.id} className="h-full">
            <ProductItem product={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// src/features/products/components/ProductsList.tsx

import React from 'react';
import { Plus } from 'lucide-react';

import { Card } from '@shared/components/ui/Card/Card';
import { Button } from '@shared/components/ui';
import { ProductItem } from './ProductItem/ProductItem';
import { ProductsFilters } from './ProductsFilters';
import { useProducts } from '../hooks/useProducts';
import { useProductsFilters } from '../hooks/useProductsFilters';
import { EmptyProducts } from './EmptyProducts';
import { Routes } from '@shared/utils/constants';
import { LoadingProducts } from './LoadingProducts';

export const ProductsList: React.FC = () => {
  const { products, error, isLoading } = useProducts();

  const {
    filters,
    filteredProducts,
    setSearchTerm,
    setSaleStatus,
    setMinPrice,
    setMaxPrice,
    resetFilters,
    hasActiveFilters,
  } = useProductsFilters(products);

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
        </div>

        <a href={Routes.newProduct}>
          <Button variant="primary" size="lg" className="flex items-center gap-2">
            <Plus size={20} />
            Nuevo Producto
          </Button>
        </a>
      </div>

      <ProductsFilters
        filters={filters}
        onSearchChange={setSearchTerm}
        onSaleStatusChange={setSaleStatus}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
        resultsCount={filteredProducts.length}
      />

      {filteredProducts.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Card className="max-w-md text-center">
            <h3 className="mb-3 text-xl font-semibold text-white">
              No se encontraron productos
            </h3>
            <p className="text-white/60">
              Intenta ajustar los filtros para ver más resultados
            </p>
            {hasActiveFilters && (
              <Button variant="primary" onClick={resetFilters} className="mt-4">
                Limpiar filtros
              </Button>
            )}
          </Card>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((item) => (
            <li key={item.id} className="h-full">
              <ProductItem product={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

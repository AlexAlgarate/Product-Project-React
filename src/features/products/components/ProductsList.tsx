import React, { useState } from 'react';

import { Plus } from 'lucide-react';

import type { Product } from '@features/products/types/product.types';
import { Card } from '@shared/components/ui/Card/Card';
import { Button } from '@shared/components/ui';
import { ProductItem } from './ProductItem';
import { ProductForm } from './ProductForm';
import { useProducts } from '../hooks/useProducts';
import { EmptyProducts } from './EmptyProducts';
import { Routes } from '@shared/utils/constants';
import { LoadingProducts } from './LoadingProducts';

export const ProductsList: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const { products, addProduct, updateProduct, error, isLoading } = useProducts();

  const handleEditForm = (product: Product): void => {
    setShowForm(true);
    setActiveProduct(product);
  };

  const handleCloseForm = (product: Product | null, isEditing?: boolean): void => {
    setShowForm(false);
    setActiveProduct(null);
    if (product) {
      if (isEditing) {
        updateProduct(product);
      } else {
        addProduct(product);
      }
    }
  };

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
            <h2 className="mb-3 text-3xl text-red-500 font-extrabold">Error</h2>
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
      {showForm ? (
        <ProductForm item={activeProduct} onClose={handleCloseForm} />
      ) : (
        <>
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

          {/* Grid de productos */}
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item) => (
              <li key={item.id} className="h-full">
                <ProductItem product={item} onEdit={handleEditForm} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

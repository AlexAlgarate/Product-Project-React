import React, { useState } from 'react';

import type { Product } from '@features/products/types/product.types';
import { Card } from '@shared/components/ui/Card/Card';
import { ProductItem } from './ProductItem';
import { ProductForm } from './ProductForm';
import { useProducts } from '../hooks/useProducts';
import { EmptyProducts } from './EmptyProducts';

export const ProductsList: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const { products, addProduct, updateProduct, error } = useProducts();

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

  if (error) {
    let message = error.message;

    if (error.name === 'UnauthorizedError') {
      message = 'No autorizado. Por favor, inicia sesión.';
    }
    return (
      <Card className="p-6">
        <h2 className="text-3xl text-red-500 font-extrabold">Error</h2>
        <p className="mt-2">{message}</p>
      </Card>
    );
  }

  if (products.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {showForm ? (
        <ProductForm item={activeProduct} onClose={handleCloseForm} />
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Productos</h1>
          </div>

          <div>
            <ul
              className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-3
            xl:grid-cols-4
            gap-4
          "
            >
              {products.map((item) => (
                <li key={item.id}>
                  <ProductItem product={item} onEdit={handleEditForm} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

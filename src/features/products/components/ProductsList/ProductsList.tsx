import React, { useState } from 'react';

import type { Product } from '@features/products/types/Product';
import { Card } from '@shared/components/ui/Card/Card';
import { ProductItem } from '../ProductItem/ProductItem';
import { ProductForm } from '../ProductForm/ProductForm';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '@shared/components/ui';
import { Routes } from '@shared/utils/constants';
import { EmptyProducts } from '../EmptyProducts/EmptyProducts';

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
      <div className="products-wrapper">
        <Card>
          <h2 className="text-3xl text-red-500 font-extrabold">Error</h2>
          <p>{message}</p>
        </Card>
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="products-wrapper">
      {showForm ? (
        <ProductForm item={activeProduct} onClose={handleCloseForm} />
      ) : (
        <div>
          <a href={Routes.newProduct}>
            <Button variant="danger">Crea producto</Button>
          </a>
          <ul>
            {products.map((item) => (
              <li key={item.id}>
                <ProductItem product={item} onEdit={handleEditForm} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

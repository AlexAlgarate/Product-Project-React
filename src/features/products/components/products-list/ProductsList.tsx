import type { Product } from '@features/products/types/Product';
import { Card } from '@shared/components/card/Card';
import React, { useState } from 'react';
import { ProductItem } from '../product-item/ProductItem';
import { ProductForm } from '../product-form/ProductForm';
import { useProducts } from './useProducts';
import { Button } from '@shared/components/ui';
import { Routes } from '@shared/utils/constants';

export const ProductsList: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const { products, deleteProduct, addProduct, updateProduct, error } = useProducts();

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
          <h2 className="text-2xl text-red-500 font-extrabold">Error</h2>
          <p>{message}</p>
        </Card>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col">
        NO HAY PRODUCTOS DISPONIBLES
        <a href={Routes.newProduct}>
          <Button variant="danger">Crea tu primer producto</Button>
        </a>
      </div>
    );
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
                <ProductItem
                  product={item}
                  onEdit={handleEditForm}
                  onDelete={deleteProduct}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

import type { Product } from '@features/products/types/Product';
import { Card } from '@shared/components/card/Card';
import React, { useState } from 'react';
import { ProductItem } from '../product-item/ProductItem';
import { ProductForm } from '../product-form/ProductForm';
import { useProducts } from './useProducts';

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

  const handleAddForm = (): void => {
    setShowForm(true);
    if (activeProduct) {
      setActiveProduct(null);
    }
  };

  if (error) {
    return (
      <div className="products-wrapper">
        <Card >
          <p>{error.message}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="products-wrapper">
      {showForm ? (
        <ProductForm item={activeProduct} onClose={handleCloseForm} />
      ) : (
        <>
          <button onClick={handleAddForm}>Añadir producto</button>
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
        </>
      )}
    </div>
  );
};

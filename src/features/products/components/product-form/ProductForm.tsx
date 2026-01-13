import React, { useState } from 'react';

import type { Product } from '@features/products/types/Product';
import { Card } from '@shared/components/card/Card';

type ProductFormProps = {
  readonly item: Product | null;
  readonly onClose: (product: Product | null, isEditing?: boolean) => void;
};

const newProduct: Product = {
  id: 0,
  name: '',
  price: 0,
  tags: [],
  isOnSale: true,
  image: '',
  description: '',
} as Product;

export const ProductForm: React.FC<ProductFormProps> = ({ item, onClose }) => {
  const isEditing = Boolean(item);

  const [product, setProduct] = useState<Product>(item || newProduct);

  const handleSave = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onClose(product, isEditing);
  };
  const handleReset = (): void => {
    onClose(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  return (
    <Card title={product.name || 'Añadir vehículo'}>
      <form className="product-form" onSubmit={handleSave} onReset={handleReset}>
        {isEditing && 'Campo de solo lectura'}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          className="control-group"
        >
          <label htmlFor="name">
            <span>name:</span>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            <span>Price:</span>
            <input
              type="text"
              id="model"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="buttons-group">
          <button type="submit">{isEditing ? 'Guardar' : 'Añadir'}</button>
          <button type="reset">Cancelar</button>
        </div>
      </form>
    </Card>
  );
};

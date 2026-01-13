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
  isOnSale: false,
  image: '',
  description: '',
} as Product;

type LabelProps = {
  htmlFor: string;
  spanText: string;
  idInput: string;
  nameInput: string;
  valueInput?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: 'input' | 'textarea';
};

const LabelInput: React.FC<LabelProps> = ({
  htmlFor,
  spanText,
  idInput,
  nameInput,
  valueInput = '',
  onChange,
  as = 'input',
}) => {
  return (
    <label className="flex gap-4" htmlFor={htmlFor}>
      <span>{spanText}</span>

      {as === 'textarea' ? (
        <textarea
          className="border rounded-md "
          id={idInput}
          name={nameInput}
          value={valueInput ?? ''}
          onChange={onChange}
          rows={4}
        />
      ) : (
        <input
          className="border rounded-md"
          type="text"
          id={idInput}
          name={nameInput}
          value={valueInput}
          onChange={onChange}
        />
      )}
    </label>
  );
};
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  return (
    <Card
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      title={product.name || 'Producto'}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSave} onReset={handleReset}>
        {isEditing}
        <div className="flex flex-col gap-6">
          <LabelInput
            htmlFor="name"
            spanText="Name"
            idInput="name"
            nameInput="name"
            valueInput={product.name}
            onChange={handleChange}
          />
          <LabelInput
            htmlFor="price"
            spanText="Price:"
            idInput="price"
            nameInput="price"
            valueInput={String(product.price)}
            onChange={handleChange}
          />
          <LabelInput
            htmlFor="tags"
            spanText="Tags:"
            idInput="tags"
            nameInput="tags"
            valueInput={product.tags.join(', ')}
            onChange={handleChange}
          />
          <LabelInput
            htmlFor="image"
            spanText="Image:"
            idInput="image"
            nameInput="image"
            valueInput={product.image}
            onChange={handleChange}
          />
          <LabelInput
            htmlFor="description"
            spanText="Description:"
            idInput="description"
            nameInput="description"
            valueInput={product.description}
            onChange={handleChange}
            as="textarea"
          />
        </div>

        <div>
          <button type="submit">{isEditing ? 'Guardar' : 'Añadir'}</button>
          <button type="reset">Cancelar</button>
        </div>
      </form>
    </Card>
  );
};

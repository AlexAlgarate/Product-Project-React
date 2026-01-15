import React, { useState } from 'react';

import type { Product } from '@features/products/types/Product';
import { Card } from '@shared/components/card/Card';
import { Button } from '@shared/components/ui';

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

type IsOnSaleSwitchProps = {
  isOnSale: boolean;
  onChange: (checked: boolean) => void;
};

const IsOnSaleSwitch: React.FC<IsOnSaleSwitchProps> = ({ isOnSale, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isOnSale}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />

      <div
        className="relative w-9 h-5 bg-blue-300 rounded-full
         peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft
         peer-checked:bg-brand
         after:content-[''] after:absolute after:top-0.5 after:start-0.5
         after:bg-amber-300 after:rounded-full after:h-4 after:w-4 after:transition-all
         peer-checked:after:translate-x-full"
      />

      <span className="select-none ms-3 text-sm font-medium text-heading">
        Is on Sale
      </span>
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

  const handleIsOnSaleChange = (checked: boolean): void => {
    setProduct((prev) => ({
      ...prev,
      isOnSale: checked,
    }));
  };

  return (
    <Card className="flex flex-col gap-6" title={product.name || 'Producto'}>
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
          <IsOnSaleSwitch isOnSale={product.isOnSale} onChange={handleIsOnSaleChange} />
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

        <div className="flex gap-6">
          <Button variant="secondary" type="reset">
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Guardar' : 'Añadir'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

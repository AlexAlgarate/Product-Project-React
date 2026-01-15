import { useNavigate } from 'react-router';
import React, { useEffect, useRef, useState } from 'react';

import { Card } from '@shared/components/card/Card';
import { Button } from '@shared/components/ui';
import { useProducts } from '../components/products-list/useProducts';
import { Routes } from '@shared/utils/constants';

import type { ProductDTO } from '../types/Product';

type newProduct = {
  name: string;
  price: string;
  tags: string;
  isOnSale: boolean;
  image: string;
  description: string;
};

type LabelInputProps = {
  label: string;
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  helper?: string;
  as?: 'input' | 'textarea';
};

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  name,
  value = '',
  onChange,
  placeholder,
  helper,
  as = 'input',
}) => {
  const baseInput =
    'w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 ' +
    'text-sm text-white placeholder:text-white/40 ' +
    'focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30';

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-white/80">
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          className={baseInput}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          className={baseInput}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}

      {helper && <span className="text-xs text-white/50">{helper}</span>}
    </div>
  );
};

type IsOnSaleSwitchProps = {
  isOnSale: boolean;
  onChange: (checked: boolean) => void;
};

const IsOnSaleSwitch: React.FC<IsOnSaleSwitchProps> = ({ isOnSale, onChange }) => {
  return (
    <label className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3">
      <span className="text-sm font-medium text-white">Producto en oferta</span>

      <div className="relative">
        <input
          type="checkbox"
          checked={isOnSale}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />

        <div
          className="
            h-5 w-9 rounded-full bg-white/20
            transition-colors
            peer-checked:bg-indigo-600
          "
        />

        <div
          className="
            absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white
            transition-transform
            peer-checked:translate-x-4
          "
        />
      </div>
    </label>
  );
};

export const CreateProductForm: React.FC = () => {
  const [product, setProduct] = useState<newProduct>({
    name: '',
    price: '',
    tags: '',
    isOnSale: false,
    image: '',
    description: '',
  });

  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef<number | null>(null);

  const redirectEvent = (route: string): void => {
    redirectTimeoutRef.current = window.setTimeout(() => {
      navigate(route);
    }, 1000);
  };

  const handleAddProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const productDTO: ProductDTO = {
      name: product.name.trim(),
      price: Number(product.price),
      tags: product.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      isOnSale: product.isOnSale,
      image: product.image || undefined,
      description: product.description || undefined,
    };

    try {
      const createdProduct = await addProduct(productDTO);
      redirectEvent(`${Routes.products}/${createdProduct.id}`); // TODO: fix this lint error
    } catch (error) {
      console.error('Error creando producto:', error);
    }
  };

  const handleCancelCreation = (): void => {
    redirectEvent(Routes.products);
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

  useEffect(() => {
    return (): void => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const isFormValid =
    product.name.trim().length > 0 &&
    product.price.trim().length > 0 &&
    !Number.isNaN(Number(product.price)) &&
    Number(product.price) > 0 &&
    product.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean).length > 0;

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-white">
        Crea un producto nuevo
      </h1>

      <Card
        className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur"
        title={product.name || 'Producto'}
      >
        <form
          className="flex flex-col gap-8"
          onSubmit={handleAddProduct}
          onReset={handleCancelCreation}
        >
          <div className="grid grid-cols-1 gap-6">
            <LabelInput
              label="Nombre"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Ej. MacBook Pro"
            />

            <LabelInput
              label="Precio"
              name="price"
              value={String(product.price)}
              onChange={handleChange}
              placeholder="999"
            />

            <LabelInput
              label="Tags"
              name="tags"
              value={product.tags}
              onChange={handleChange}
              placeholder="tecnología, portátil"
              helper="Separados por comas"
            />

            <LabelInput
              label="Imagen"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="https://..."
            />

            <IsOnSaleSwitch
              isOnSale={product.isOnSale}
              onChange={handleIsOnSaleChange}
            />

            <LabelInput
              label="Descripción"
              name="description"
              value={product.description}
              onChange={handleChange}
              as="textarea"
              placeholder="Describe el producto..."
            />
          </div>

          {!isFormValid && (
            <p className="text-sm text-white/50">
              Completa todos los campos obligatorios para continuar
            </p>
          )}

          <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
            <Button variant="secondary" type="reset">
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={!isFormValid}>
              Añadir
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export { CreateProductForm as Component };

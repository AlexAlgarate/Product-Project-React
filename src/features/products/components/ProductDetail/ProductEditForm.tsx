import React, { useState } from 'react';
import { X } from 'lucide-react';

import type { Product } from '@features/products/types/product.types';
import { Card } from '@shared/components/ui/Card/Card';
import { Button } from '@shared/components/ui';

type ProductEditFormProps = {
  readonly product: Product;
  readonly onSave: (product: Product) => void;
  readonly onCancel: () => void;
};

type FormInputProps = {
  label: string;
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  helper?: string;
  as?: 'input' | 'textarea';
  type?: 'text' | 'number';
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value = '',
  onChange,
  placeholder,
  helper,
  as = 'input',
  type = 'text',
}) => {
  const baseClass =
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
          className={baseClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={baseClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}

      {helper && <span className="text-xs text-white/50">{helper}</span>}
    </div>
  );
};

type SwitchProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Switch: React.FC<SwitchProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3 cursor-pointer">
      <span className="text-sm font-medium text-white">{label}</span>

      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />

        <div className="h-5 w-9 rounded-full bg-white/20 transition-colors peer-checked:bg-indigo-600" />
        <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
      </div>
    </label>
  );
};

export const ProductEditForm: React.FC<ProductEditFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: String(product.price),
    tags: product.tags.join(', '),
    image: product.image || '',
    description: product.description || '',
    isOnSale: product.isOnSale,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const updatedProduct: Product = {
      id: product.id,
      name: formData.name.trim(),
      price: Number(formData.price),
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      isOnSale: formData.isOnSale,
      image: formData.image || undefined,
      description: formData.description || undefined,
    };

    onSave(updatedProduct);
  };

  const isFormValid =
    formData.name.trim().length > 0 &&
    formData.price.trim().length > 0 &&
    !Number.isNaN(Number(formData.price)) &&
    Number(formData.price) > 0 &&
    formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean).length > 0;

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Editar Producto
        </h1>
        <button
          onClick={onCancel}
          className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>
      </div>

      <Card className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <FormInput
            label="Nombre del producto"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej. MacBook Pro"
          />

          <FormInput
            label="Precio (€)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="999"
          />

          <FormInput
            label="Etiquetas"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="tecnología, portátil, apple"
            helper="Separadas por comas"
          />

          <FormInput
            label="URL de la imagen"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />

          <Switch
            label="Producto en oferta"
            checked={formData.isOnSale}
            onChange={(checked) =>
              setFormData((prev) => ({ ...prev, isOnSale: checked }))
            }
          />

          <FormInput
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            as="textarea"
            placeholder="Describe el producto en detalle..."
          />

          {!isFormValid && (
            <p className="text-sm text-orange-400">
              Por favor, completa todos los campos obligatorios
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
            <Button variant="secondary" type="button" onClick={onCancel}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={!isFormValid}>
              Guardar Cambios
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

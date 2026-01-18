import React, { useState } from 'react';
import { X } from 'lucide-react';

import type { Product } from '@features/products/types/product.types';
import { Card, Button } from '@shared/components/ui';
import { ProductFormFields, type ProductFormData } from '../ProductForm';
import { validateProductForm } from '@features/products/utils/validateFormData';

type ProductEditFormProps = {
  readonly product: Product;
  readonly onSave: (product: Product) => void;
  readonly onCancel: () => void;
};

export const ProductEditForm: React.FC<ProductEditFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
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

  const handleSwitchChange = (checked: boolean): void => {
    setFormData((prev) => ({ ...prev, isOnSale: checked }));
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

  const isFormValid = validateProductForm(formData);

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
          <ProductFormFields
            formData={formData}
            onChange={handleChange}
            onSwitchChange={handleSwitchChange}
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

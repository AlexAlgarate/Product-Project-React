import React from 'react';
import { FormInput, Switch } from '@shared/components/ui';
import type { ProductFormData } from '@features/products/types/product.types';

type ProductFormFieldsProps = {
  formData: ProductFormData;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (checked: boolean) => void;
};

export const ProductFormFields: React.FC<ProductFormFieldsProps> = ({
  formData,
  onChange,
  onSwitchChange,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <FormInput
        label="Nombre del producto"
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Ej. MacBook Pro"
        required
      />

      <FormInput
        label="Precio (€)"
        name="price"
        type="number"
        value={formData.price}
        onChange={onChange}
        placeholder="999"
        required
      />

      <FormInput
        label="Etiquetas"
        name="tags"
        value={formData.tags}
        onChange={onChange}
        placeholder="tecnología, portátil, apple"
        helper="Separadas por comas"
        required
      />

      <FormInput
        label="URL de la imagen"
        name="image"
        value={formData.image}
        onChange={onChange}
        placeholder="https://ejemplo.com/imagen.jpg"
      />

      <Switch
        label="Producto en oferta"
        checked={formData.isOnSale}
        onChange={onSwitchChange}
        description="Marca si el producto tiene un descuento activo"
      />

      <FormInput
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={onChange}
        as="textarea"
        placeholder="Describe el producto en detalle..."
      />
    </div>
  );
};

export type { ProductFormData };

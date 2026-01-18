import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { Card, Button } from '@shared/components/ui';
import { useProducts } from '../hooks/useProducts';
import { Routes } from '@shared/utils/constants';
import { ProductFormFields, type ProductFormData } from '../components/ProductForm';
import type { ProductDTO } from '../types/product.types';
import { validateProductForm } from '../utils/validateFormData';

export const CreateProductPage: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean): void => {
    setFormData((prev) => ({ ...prev, isOnSale: checked }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const productDTO: ProductDTO = {
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

    try {
      const createdProduct = await addProduct(productDTO);
      redirectTimeoutRef.current = window.setTimeout(() => {
        navigate(`${Routes.products}/${createdProduct.id}`);
      }, 1000);
    } catch (error) {
      console.error('Error creando producto:', error);
    }
  };

  const handleCancel = (): void => {
    redirectTimeoutRef.current = window.setTimeout(() => {
      navigate(Routes.products);
    }, 1000);
  };

  useEffect(() => {
    return (): void => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const isFormValid = validateProductForm(formData);

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-white">
        Crear Producto Nuevo
      </h1>

      <Card className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <ProductFormFields
            formData={formData}
            onChange={handleChange}
            onSwitchChange={handleSwitchChange}
          />

          {!isFormValid && (
            <p className="text-sm text-orange-400">
              Completa todos los campos obligatorios para continuar
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
            <Button variant="secondary" type="button" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={!isFormValid}>
              Crear Producto
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export { CreateProductPage as Component };

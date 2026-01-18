import type { ProductFormData } from '../types/product.types';

export const validateProductForm = (formData: ProductFormData): boolean => {
  return (
    formData.name.trim().length > 0 &&
    formData.price.trim().length > 0 &&
    !Number.isNaN(Number(formData.price)) &&
    Number(formData.price) > 0 &&
    formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean).length > 0
  );
};

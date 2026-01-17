import React from 'react';
import type { Product } from '@features/products/types/product.types';

type ProductDescriptionProps = {
  readonly description?: Product['description'];
};

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  if (!description) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="mb-3 text-lg font-semibold text-white">Descripción</h2>
      <p className="leading-relaxed text-white/70">{description}</p>
    </div>
  );
};

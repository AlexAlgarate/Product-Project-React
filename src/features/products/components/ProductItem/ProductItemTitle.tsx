import React from 'react';
import type { Product } from '@features/products/types/product.types';

type ProductItemTitleProps = {
  readonly name: Product['name'];
};

export const ProductItemTitle: React.FC<ProductItemTitleProps> = ({ name }) => {
  return (
    <h3
      className="mb-2 text-lg font-bold text-white line-clamp-2 min-h-14"
      title={name}
    >
      {name}
    </h3>
  );
};

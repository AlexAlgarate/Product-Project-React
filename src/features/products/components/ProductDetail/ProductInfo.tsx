import React from 'react';
import type { Product } from '@features/products/types/product.types';

type ProductInfoProps = {
  readonly product: Product;
};

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="mb-6">
      <h1 className="mb-4 text-4xl font-bold text-white">{product.name}</h1>

      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-bold text-indigo-400">{product.price}</span>
        <span className="text-3xl text-indigo-400">€</span>
      </div>
    </div>
  );
};

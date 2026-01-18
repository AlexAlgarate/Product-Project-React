import React from 'react';
import type { Product } from '@features/products/types/product.types';

type ProductItemPriceProps = {
  readonly price: Product['price'];
};

export const ProductItemPrice: React.FC<ProductItemPriceProps> = ({ price }) => {
  return (
    <div className="mt-auto border-t border-white/10 pt-4">
      <span className="text-2xl font-bold text-indigo-400">{price} €</span>
    </div>
  );
};

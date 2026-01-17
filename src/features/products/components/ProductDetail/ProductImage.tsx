import React from 'react';
import type { Product } from '@features/products/types/product.types';
import { constants } from '@shared/utils/constants';

type ProductProps = {
  readonly product: Product;
};

export const ProductImage: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-white/5 to-transparent p-8 shadow-xl">
      {product.isOnSale && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          En Oferta
        </span>
      )}

      <div className="flex items-center justify-center">
        <img
          src={product.image || constants.imagePlaceholder}
          alt={product.name}
          className="max-h-125 w-full rounded-xl object-contain shadow-2xl"
        />
      </div>
    </div>
  );
};

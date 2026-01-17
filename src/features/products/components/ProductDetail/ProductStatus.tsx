import React from 'react';
import type { Product } from '@features/products/types/product.types';

type ProductStatusProps = {
  readonly isOnSale: Product['isOnSale'];
};

export const ProductStatus: React.FC<ProductStatusProps> = ({ isOnSale }) => {
  return (
    <div className="mb-8 rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">Estado del producto</span>

        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-semibold ${
              isOnSale ? 'text-emerald-400' : 'text-white/60'
            }`}
          >
            {isOnSale ? 'En oferta' : 'Precio regular'}
          </span>

          <div className="relative">
            <div
              className={`h-6 w-11 rounded-full transition-colors ${
                isOnSale ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            />
            <div
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                isOnSale ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

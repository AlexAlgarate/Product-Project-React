import type { Product } from '@features/products/types/product.types';
import { Button } from '@shared/components/ui';
import { Card } from '@shared/components/ui/Card/Card';
import { constants } from '@shared/utils/constants';
import React from 'react';
import { Link } from 'react-router';

type ProductItemProp = {
  readonly product: Product;
  readonly onEdit: (product: Product) => void;
};

export const ProductItem: React.FC<ProductItemProp> = ({ product, onEdit }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-black/30 shadow-sm">
      {/* Imagen */}
      <img
        src={product.image || constants.imagePlaceholder}
        alt={product.name}
        className="h-50 w-full object-cover"
      />

      {/* Body */}
      <div className="flex flex-1 flex-col p-3">
        <h3
          className="mb-1 text-sm font-semibold text-white truncate"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Descripción */}
        {product.description && (
          <p className="mb-2 text-xs text-white/60 line-clamp-4">
            {product.description}
          </p>
        )}

        {/* Precio al fondo */}
        <div className="mt-auto">
          <span className="text-lg font-bold text-indigo-400">{product.price} €</span>
        </div>
      </div>

      {/* Footer (meta info) */}
      <ul className="divide-y divide-white/10 border-t border-white/10 text-xs text-white/60">
        <li className="flex items-center justify-between px-3 py-2">
          <span>Estado</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[11px]">
            {product.isOnSale ? 'En oferta' : ' CAMBIAR'}
          </span>
        </li>

        {product.tags?.length > 0 && (
          <li className="px-3 py-2">{product.tags.join(', ')}</li>
        )}
      </ul>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@shared/components/ui';
import type { Product } from '@features/products/types/product.types';
import { constants } from '@shared/utils/constants';

type ProductItemProp = {
  readonly product: Product;
  readonly onEdit: (product: Product) => void;
};

export const ProductItem: React.FC<ProductItemProp> = ({ product, onEdit }) => {
  const navigate = useNavigate();

  const handleViewDetails = (): void => {
    navigate(`/products/${product.id}`);
  };

  const handleEdit = (event: React.MouseEvent): void => {
    event.stopPropagation();
    onEdit(product);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-linear-to-b from-white/5 to-transparent shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30">
      <div className="relative h-56 w-full overflow-hidden bg-black/40">
        {/* Imagen */}
        <img
          src={product.image || constants.imagePlaceholder}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.isOnSale && (
          <span className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            En oferta
          </span>
        )}
      </div>

      <div>
        <div className="flex flex-1 flex-col p-3">
          <h3
            className="mb-2 text-lg font-bold text-white line-clamp-2 min-h-14"
            title={product.name}
          >
            {product.name}
          </h3>

          {product.description && (
            <p className="mb-4 text-sm text-white/70 line-clamp-3 flex-1">
              {product.description}
            </p>
          )}

          {product.tags?.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300 border border-indigo-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-white_10">
            <span className="text-2xl font-bold text-indigo-400">
              {product.price} €
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleViewDetails}
              className="flex-1 flex items-center justify-center gap-0.5"
            >
              Ver Detalles
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 px-4"
              title="Editar producto"
            >
              Editar Producto
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

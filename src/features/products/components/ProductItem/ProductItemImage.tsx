import React from 'react';
import type { Product } from '@features/products/types/product.types';
import { constants } from '@shared/utils/constants';

type ProductItemImageProps = {
  readonly image?: Product['image'];
  readonly name: Product['name'];
  readonly isOnSale: Product['isOnSale'];
};

export const ProductItemImage: React.FC<ProductItemImageProps> = ({
  image,
  name,
  isOnSale,
}) => {
  return (
    <div className="relative h-56 w-full overflow-hidden bg-black/40">
      <img
        src={image || constants.imagePlaceholder}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {isOnSale && (
        <span className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          En oferta
        </span>
      )}
    </div>
  );
};

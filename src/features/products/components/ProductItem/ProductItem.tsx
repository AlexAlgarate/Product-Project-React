import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';

import type { Product } from '@features/products/types/product.types';
import { ProductItemImage } from './ProductItemImage';
import { ProductItemTitle } from './ProductItemTitle';
import { ProductItemTags } from './ProductItemTags';
import { ProductItemPrice } from './ProductItemPrice';
import { ProductItemActions } from './ProductItemActions';

type ProductItemProps = {
  readonly product: Product;
  readonly onEdit: (product: Product) => void;
};

export const ProductItem: React.FC<ProductItemProps> = ({ product, onEdit }) => {
  const navigate = useNavigate();

  const handleViewDetails = useCallback(() => {
    navigate(`/products/${product.id}`);
  }, [navigate, product.id]);

  const handleEdit = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onEdit(product);
    },
    [onEdit, product],
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-linear-to-b from-white/5 to-transparent shadow-lg transition-all duration-300 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10">
      <ProductItemImage
        image={product.image}
        name={product.name}
        isOnSale={product.isOnSale}
      />

      <div className="flex flex-1 flex-col p-5">
        <ProductItemTitle name={product.name} />
        <ProductItemTags tags={product.tags} maxTags={2} />
        <ProductItemPrice price={product.price} />
        <ProductItemActions onViewDetails={handleViewDetails} onEdit={handleEdit} />
      </div>
    </article>
  );
};

import React from 'react';
import type { Product } from '@features/products/types/product.types';
import { splitProductTags } from '@features/products/utils/splitProductTags';

type ProductItemTagsProps = {
  readonly tags: Product['tags'];
  readonly maxTags?: number;
};

export const ProductItemTags: React.FC<ProductItemTagsProps> = ({
  tags,
  maxTags = 2,
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  const displayTags = splitProductTags(tags).slice(0, maxTags);

  return (
    <div className="mb-4 flex flex-wrap gap-1.5">
      {displayTags.map((tag) => (
        <span
          key={tag}
          className="capitalize rounded-lg border border-indigo-500/30 bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300"
        >
          {tag}
        </span>
      ))}
      {tags.length > maxTags && (
        <span className="rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/60">
          +{tags.length - maxTags}
        </span>
      )}
    </div>
  );
};

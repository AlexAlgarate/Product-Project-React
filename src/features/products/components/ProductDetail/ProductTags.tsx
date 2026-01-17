import React from 'react';
import { Tag } from 'lucide-react';
import type { Product } from '@features/products/types/product.types';
import { splitProductTags } from '@features/products/utils/splitProductTags';

type ProductTagsProps = {
  readonly tags: Product['tags'];
};

export const ProductTags: React.FC<ProductTagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/80">
        <Tag size={16} />
        <span>Etiquetas</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {splitProductTags(tags).map((tag) => (
          <span
            key={tag}
            className="capitalize rounded-lg border border-indigo-500/30 bg-indigo-500/20 px-3 py-1.5 text-sm text-indigo-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

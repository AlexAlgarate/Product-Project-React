import repo from '@features/products/services/products-fetch';
import type { Product } from '@features/products/types/Product';

import { useEffect, useState } from 'react';

type ProductDetail = {
  product: Product | null;
};

export const useDetail = (id: Product['id']): ProductDetail => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        const item = await repo.getProductByIdAsync(id);
        if (item) {
          setProduct(item);
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();
  }, [id]);

  return { product };
};

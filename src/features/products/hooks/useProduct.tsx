import { useCallback, useEffect, useState } from 'react';

import repo from '@features/products/services/products-fetch';
import type { Product, ProductDTO } from '@features/products/types/Product';


type UseProductReturn = {
  product: Product | null;
  isLoading: boolean;
  error: Error | null;
  updateProduct: (productData: ProductDTO) => Promise<void>;
  deleteProduct: () => Promise<void>;
  refetch: () => Promise<void>;
};

export const useProduct = (id: Product['id']): UseProductReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProduct = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const item = await repo.getProductByIdAsync(id);
      setProduct(item || null);
    } catch (err) {
      setError(err as Error);
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const updateProduct = useCallback(
    async (productData: ProductDTO): Promise<void> => {
      if (!product) {
        throw new Error('No hay producto para actualizar');
      }

      setError(null);

      try {
        const updatedProduct = await repo.updateProduct(id, productData);
        setProduct(updatedProduct);
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [id, product]
  );

  const deleteProduct = useCallback(async (): Promise<void> => {
    if (!product) {
      throw new Error('No hay producto para eliminar');
    }

    const previousProduct = product;
    setProduct(null);
    setError(null);

    try {
      await repo.deleteProduct(id);
    } catch (err) {
      setProduct(previousProduct);
      setError(err as Error);
      throw err;
    }
  }, [id, product]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return {
    product,
    isLoading,
    error,
    updateProduct,
    deleteProduct,
    refetch: loadProduct,
  };
};

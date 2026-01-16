import repo from '@features/products/api/productsApi';
import type { Product, ProductDTO } from '@features/products/types/Product';
import { useEffect, useState } from 'react';

type UseProductType = {
  products: Product[];
  addProduct: (product: ProductDTO) => void;
  updateProduct: (product: Product) => void;
  error: Error | null;
};

export const useProducts = (): UseProductType => {
  const initialProducts: Product[] = [];
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [error, setError] = useState<Error | null>(null);

  const updateProduct = async (product: Product): Promise<void> => {
    const { id, ...productDTO } = product;

    try {
      const product = await repo.updateProduct(id, productDTO);
      setError(null);
      setProducts(products.map((item) => (item.id === product.id ? product : item)));
    } catch (error) {
      setError(error as Error);
    }
  };

  const addProduct = async (productData: ProductDTO): Promise<Product> => {
    try {
      const product = await repo.createProduct(productData);
      // product.id = crypto.randomUUID().slice(0, 4);
      setError(null);
      setProducts([product, ...products]);
      return product;
    } catch (error) {
      setError(error as Error);
      throw error;
    }
  };

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      try {
        const data = await repo.getAllProducts();
        // Set del Error a null porque si ha ido bien, así no ocurre nada raro
        setError(null);
        setProducts(Array.isArray(data) ? data : [data]);
      } catch (error) {
        setError(error as Error);
      }
    };

    loadProducts();
  }, []);

  return {
    products,
    error,
    addProduct,
    updateProduct,
  };
};

import { useCallback, useMemo, useState } from 'react';
import type { Product } from '../types/product.types';
import { useDebounce } from './useDebounce';

export type ProductFilters = {
  searchTerm: string;
  saleStatus: 'all' | 'on-sale' | 'regular';
  minPrice: string;
  maxPrice: string;
};

type UseProductsFiltersReturn = {
  filters: ProductFilters;
  filteredProducts: Product[];
  setSearchTerm: (value: string) => void;
  setSaleStatus: (value: ProductFilters['saleStatus']) => void;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
};

const initialFilters: ProductFilters = {
  searchTerm: '',
  saleStatus: 'all',
  minPrice: '',
  maxPrice: '',
};

export const useProductsFilters = (products: Product[]): UseProductsFiltersReturn => {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const debouncedFilters = useDebounce(filters, 300);

  const setSearchTerm = useCallback((value: string): void => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  }, []);

  const setSaleStatus = useCallback((value: ProductFilters['saleStatus']): void => {
    setFilters((prev) => ({ ...prev, saleStatus: value }));
  }, []);

  const setMinPrice = useCallback((value: string): void => {
    if (Number(value) < 0) return;
    setFilters((prev) => ({ ...prev, minPrice: value }));
  }, []);

  const setMaxPrice = useCallback((value: string): void => {
    if (Number(value) < 0) return;
    setFilters((prev) => ({ ...prev, maxPrice: value }));
  }, []);

  const resetFilters = (): void => {
    setFilters(initialFilters);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchTerm !== '' ||
      filters.saleStatus !== 'all' ||
      filters.minPrice !== '' ||
      filters.maxPrice !== ''
    );
  }, [filters]);

  const filteredProducts = useMemo(() => {
    const currentFilters = debouncedFilters;

    return products.filter((product) => {
      // Filtro por nombre
      const matchesSearch =
        currentFilters.searchTerm === '' ||
        product.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase());

      // Filtro por estado de oferta
      const matchesSaleStatus =
        currentFilters.saleStatus === 'all' ||
        (currentFilters.saleStatus === 'on-sale' && product.isOnSale) ||
        (currentFilters.saleStatus === 'regular' && !product.isOnSale);

      // Filtro por precio mínimo
      const matchesMinPrice =
        currentFilters.minPrice === '' ||
        product.price >= Number(currentFilters.minPrice);

      // Filtro por precio máximo
      const matchesMaxPrice =
        currentFilters.maxPrice === '' ||
        product.price <= Number(currentFilters.maxPrice);

      return matchesSearch && matchesSaleStatus && matchesMinPrice && matchesMaxPrice;
    });
  }, [products, debouncedFilters]);

  return {
    filters,
    filteredProducts,
    setSearchTerm,
    setSaleStatus,
    setMinPrice,
    setMaxPrice,
    resetFilters,
    hasActiveFilters,
  };
};

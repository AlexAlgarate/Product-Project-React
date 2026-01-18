import { useMemo, useState } from 'react';
import type { Product } from '../types/product.types';

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

  const setSearchTerm = (value: string): void => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  };

  const setSaleStatus = (value: ProductFilters['saleStatus']): void => {
    setFilters((prev) => ({ ...prev, saleStatus: value }));
  };

  const setMinPrice = (value: string): void => {
    setFilters((prev) => ({ ...prev, minPrice: value }));
  };

  const setMaxPrice = (value: string): void => {
    setFilters((prev) => ({ ...prev, maxPrice: value }));
  };

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
    return products.filter((product) => {
      // Filtro por nombre
      const matchesSearch =
        filters.searchTerm === '' ||
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      // Filtro por estado de oferta
      const matchesSaleStatus =
        filters.saleStatus === 'all' ||
        (filters.saleStatus === 'on-sale' && product.isOnSale) ||
        (filters.saleStatus === 'regular' && !product.isOnSale);

      // Filtro por precio mínimo
      const matchesMinPrice =
        filters.minPrice === '' || product.price >= Number(filters.minPrice);

      // Filtro por precio máximo
      const matchesMaxPrice =
        filters.maxPrice === '' || product.price <= Number(filters.maxPrice);

      return matchesSearch && matchesSaleStatus && matchesMinPrice && matchesMaxPrice;
    });
  }, [products, filters]);

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

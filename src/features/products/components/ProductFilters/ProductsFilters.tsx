import React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@shared/components/ui';
import type { UseProductsFiltersReturn } from '../../hooks/useProductsFilters';
import { FilterName } from './FilterName';
import { FilterState } from './FilterState';
import { FilterMinPrice } from './FilterMinPrice';
import { FilterMaxPrice } from './FilterMaxPrice';

type ProductsFiltersProps = {
  filtersHook: UseProductsFiltersReturn;
};

export const ProductsFilters: React.FC<ProductsFiltersProps> = ({ filtersHook }) => {
  const { resetFilters, hasActiveFilters, filteredProducts } = filtersHook;

  return (
    <div className="mb-8 rounded-xl border border-white/10 bg-linear-to-b from-white/5 to-transparent p-6 shadow-lg backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="text-indigo-400" size={20} />
          <h2 className="text-lg font-semibold text-white">Filtros</h2>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="flex items-center gap-1.5"
          >
            <X size={16} />
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <FilterName filtersHook={filtersHook} />
        <FilterState filtersHook={filtersHook} />
        <FilterMinPrice filtersHook={filtersHook} />
        <FilterMaxPrice filtersHook={filtersHook} />
      </div>

      {/* Contador de resultados */}
      {hasActiveFilters && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-sm text-white/60">
            Se encontraron{' '}
            <span className="font-semibold text-indigo-400">
              {filteredProducts.length}
            </span>{' '}
            {filteredProducts.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>
      )}
    </div>
  );
};

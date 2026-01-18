import React from 'react';
import { Search } from 'lucide-react';
import type { UseProductsFiltersReturn } from '@features/products/hooks/useProductsFilters';

type FilterNameProps = {
  filtersHook: UseProductsFiltersReturn;
};

export const FilterName: React.FC<FilterNameProps> = ({ filtersHook }) => {
  const { filters, setSearchTerm } = filtersHook;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="search"
        className="flex items-center gap-1.5 text-sm font-medium text-white/80"
      >
        <Search size={14} />
        Buscar producto
      </label>
      <input
        id="search"
        type="text"
        placeholder="Ej. MacBook, iPhone..."
        value={filters.searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      />
    </div>
  );
};

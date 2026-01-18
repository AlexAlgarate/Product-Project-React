import React from 'react';
import { DollarSign } from 'lucide-react';
import type { UseProductsFiltersReturn } from '@features/products/hooks/useProductsFilters';

type FilterMaxPriceProps = {
  filtersHook: UseProductsFiltersReturn;
};

export const FilterMaxPrice: React.FC<FilterMaxPriceProps> = ({ filtersHook }) => {
  const { filters, setMaxPrice } = filtersHook;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="max-price"
        className="flex items-center gap-1.5 text-sm font-medium text-white/80"
      >
        <DollarSign size={14} />
        Precio máximo
      </label>
      <input
        id="max-price"
        type="number"
        placeholder="9999"
        min="0"
        value={filters.maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      />
    </div>
  );
};

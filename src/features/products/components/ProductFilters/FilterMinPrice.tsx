import React from 'react';
import { DollarSign } from 'lucide-react';
import type { UseProductsFiltersReturn } from '@features/products/hooks/useProductsFilters';

type FilterMinPriceProps = {
  filtersHook: UseProductsFiltersReturn;
};

export const FilterMinPrice: React.FC<FilterMinPriceProps> = ({ filtersHook }) => {
  const { filters, setMinPrice } = filtersHook;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="min-price"
        className="flex items-center gap-1.5 text-sm font-medium text-white/80"
      >
        <DollarSign size={14} />
        Precio mínimo
      </label>
      <input
        id="min-price"
        type="number"
        placeholder="0"
        min="0"
        value={filters.minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      />
    </div>
  );
};

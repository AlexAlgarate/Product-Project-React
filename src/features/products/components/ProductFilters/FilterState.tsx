import React from 'react';
import { Tag } from 'lucide-react';
import type {
  ProductFilters,
  UseProductsFiltersReturn,
} from '@features/products/hooks/useProductsFilters';

type FilterStateProps = {
  filtersHook: UseProductsFiltersReturn;
};

export const FilterState: React.FC<FilterStateProps> = ({ filtersHook }) => {
  const { filters, setSaleStatus } = filtersHook;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="sale-status"
        className="flex items-center gap-1.5 text-sm font-medium text-white/80"
      >
        <Tag size={14} />
        Estado
      </label>
      <select
        id="sale-status"
        value={filters.saleStatus}
        onChange={(e) => setSaleStatus(e.target.value as ProductFilters['saleStatus'])}
        className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      >
        <option value="all">Todos</option>
        <option value="on-sale">En oferta</option>
        <option value="regular">Precio regular</option>
      </select>
    </div>
  );
};

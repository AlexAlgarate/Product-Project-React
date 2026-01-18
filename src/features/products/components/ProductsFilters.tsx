import React from 'react';
import { Search, EuroIcon, Tag, X } from 'lucide-react';
import { Button } from '@shared/components/ui';
import type { ProductFilters } from '../hooks/useProductsFilters';

type ProductsFiltersProps = {
  filters: ProductFilters;
  onSearchChange: (value: string) => void;
  onSaleStatusChange: (value: ProductFilters['saleStatus']) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  resultsCount: number;
};

export const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  filters,
  onSearchChange,
  onSaleStatusChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
  hasActiveFilters,
  resultsCount,
}) => {
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
            onClick={onReset}
            className="flex items-center gap-1.5"
          >
            <X size={16} />
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Filtro por nombre */}
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>

        {/* Filtro por estado de oferta */}
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
            onChange={(e) =>
              onSaleStatusChange(e.target.value as ProductFilters['saleStatus'])
            }
            className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            <option value="all">Todos</option>
            <option value="on-sale">En oferta</option>
            <option value="regular">Precio regular</option>
          </select>
        </div>

        {/* Filtro precio mínimo */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="min-price"
            className="flex items-center gap-1.5 text-sm font-medium text-white/80"
          >
            <EuroIcon size={14} />
            Precio mínimo
          </label>
          <input
            id="min-price"
            type="number"
            placeholder="0"
            min="0"
            value={filters.minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>

        {/* Filtro precio máximo */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="max-price"
            className="flex items-center gap-1.5 text-sm font-medium text-white/80"
          >
            <EuroIcon size={14} />
            Precio máximo
          </label>
          <input
            id="max-price"
            type="number"
            placeholder="9999"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
      </div>

      {/* Contador de resultados */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-white/60">
            Se encontraron{' '}
            <span className="font-semibold text-indigo-400">{resultsCount}</span>{' '}
            {resultsCount === 1 ? 'producto' : 'productos'}
          </p>
        </div>
      )}
    </div>
  );
};

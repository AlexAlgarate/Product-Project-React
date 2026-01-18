import React from 'react';

export const LoadingProducts: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent" />
        <p className="mt-6 text-lg text-white/70">Cargando productos...</p>
      </div>
    </div>
  );
};

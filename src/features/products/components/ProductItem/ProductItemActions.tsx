import React from 'react';
import { Eye, Pencil } from 'lucide-react';
import { Button } from '@shared/components/ui';

type ProductItemActionsProps = {
  readonly onViewDetails: () => void;
  readonly onEdit: (event: React.MouseEvent) => void;
};

export const ProductItemActions: React.FC<ProductItemActionsProps> = ({
  onViewDetails,
  onEdit,
}) => {
  return (
    <div className="mt-4 flex gap-2">
      <Button
        variant="primary"
        size="md"
        onClick={onViewDetails}
        className="flex flex-1 items-center justify-center gap-1.5"
      >
        <Eye size={16} />
        Ver Detalles
      </Button>

      <Button
        variant="secondary"
        size="md"
        onClick={onEdit}
        className="flex items-center justify-center gap-1.5 px-3"
        title="Editar producto"
      >
        <Pencil size={16} />
        <span className="hidden sm:inline">Editar</span>
      </Button>
    </div>
  );
};

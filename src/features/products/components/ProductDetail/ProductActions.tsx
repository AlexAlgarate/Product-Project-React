import React from 'react';
import { ArrowLeft, Trash2, Pencil } from 'lucide-react';
import { Button } from '@shared/components/ui';

type ProductActionsProps = {
  readonly onEdit: () => void;
  readonly onDelete: () => void;
  readonly onBack: () => void;
};

export const ProductActions: React.FC<ProductActionsProps> = ({
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div className="mt-auto space-y-3">
      <Button
        variant="primary"
        size="lg"
        onClick={onEdit}
        className="flex w-full items-center justify-center gap-2"
      >
        <Pencil size={18} />
        Editar producto
      </Button>

      <Button
        variant="danger"
        size="lg"
        onClick={onDelete}
        className="flex w-full items-center justify-center gap-2"
      >
        <Trash2 size={18} />
        Eliminar producto
      </Button>

      <Button
        variant="secondary"
        size="lg"
        onClick={onBack}
        className="flex w-full items-center justify-center gap-2"
      >
        <ArrowLeft size={18} />
        Volver al listado
      </Button>
    </div>
  );
};

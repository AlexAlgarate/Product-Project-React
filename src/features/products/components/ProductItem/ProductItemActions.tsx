import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@shared/components/ui';

type ProductItemActionsProps = {
  readonly onViewDetails: () => void;
};

export const ProductItemActions: React.FC<ProductItemActionsProps> = ({
  onViewDetails,
}) => {
  return (
    <div className="mt-4">
      <Button
        variant="primary"
        size="md"
        onClick={onViewDetails}
        className="flex w-full items-center justify-center gap-1.5"
      >
        <Eye size={16} />
        Ver Detalles
      </Button>
    </div>
  );
};

import type { Product } from '@features/products/types/Product';
import { Card } from '@shared/components/card/Card';
import React from 'react';
import { useNavigate } from 'react-router';

type ProductItemProp = {
  readonly product: Product;
  readonly onEdit: (product: Product) => void;
  readonly onDelete: (product: Product) => void;
};

export const ProductItem: React.FC<ProductItemProp> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleEdit = (): void => {
    onEdit(product);
  };

  const handleDelete = (): void => {
    console.log('Delete', product.id);
    onDelete(product);
  };

  const handleGoTo = (): void => {
    // navegar a la página de detalle
    navigate('/products/' + product.id);
  };

  return (
    <Card>
      <div className="flex gap-6 flex-col m-4">
        <p>
          {product.id} - {product.name}
        </p>
        <p>Price: {product.price}</p>
        <p>Is On Sale - {product.isOnSale.toString()}</p>
        <p>Is On Sale - {product.isOnSale ? 'Yes' : 'No'}</p>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
          <span className="select-none ms-3 text-sm font-medium text-heading">
            Is on Sale?
          </span>
        </label>

        <label className="inline-flex items-center cursor-default gap-6">
          <span className="select-none ms-3 text-md font-medium text-heading">
            Is on Sale?
          </span>
          <input
            type="checkbox"
            checked={product.isOnSale}
            readOnly
            className="sr-only peer"
          />

          <div
            className="relative w-9 h-5 bg-blue-300 rounded-full
    peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft
    peer-checked:bg-brand
    after:content-[''] after:absolute after:top-0.5 after:start-0.5
    after:bg-amber-300 after:rounded-full after:h-4 after:w-4 after:transition-all
    peer-checked:after:translate-x-full"
          />
        </label>
      </div>
      <div className="flex gap-6 m-4">
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete}>Borrar producto</button>
        <button onClick={handleGoTo}>Detalles</button>
      </div>
    </Card>
  );
};

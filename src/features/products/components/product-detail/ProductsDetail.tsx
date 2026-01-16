import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import type { Product } from '@features/products/types/Product';
import { useProduct } from '../../hooks/useProduct';
import { constants, Routes } from '@shared/utils/constants';
import { Card } from '@shared/components/ui/Card/Card';
import { NotFoundPage } from '@shared/components/not-found-page/NotFoundPage';
import { Button } from '@shared/components/ui';
import { ConfirmModal } from '@shared/components/modal-confirm/ModalConfirm';

type ProductsDetailProps = {
  readonly id: Product['id'];
};

export const ProductsDetail: React.FC<ProductsDetailProps> = ({ id }) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const { product, deleteProduct } = useProduct(id);

  const handleBack = (): void => {
    navigate(Routes.products);
  };

  const handleConfirmRemoveProduct = useCallback(() => {
    if (!product) return;

    deleteProduct();

    navigate(Routes.products);
  }, [deleteProduct, navigate, product]);

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <article>
      {showLogoutConfirm && (
        <ConfirmModal
          message="¿Estás seguro de que deseas borrar el producto?"
          onCancel={() => setShowLogoutConfirm(false)}
          onConfirm={() => {
            setShowLogoutConfirm(false);
            handleConfirmRemoveProduct();
          }}
        />
      )}
      <h1>Products Detail Page</h1>
      <Card className="flex flex-col gap-6 max-w-md">
        {product ? (
          <div className="flex flex-col gap-6">
            <p>ID: {product.id}</p>
            <p>Nombre: {product.name}</p>
            <p>Price: {product.price} €</p>
            <p>Tags: {product.tags.join(', ')}</p>
            <div className="flex gap-4">
              <span>Is on Sale</span>

              <label className="switch">
                <input type="checkbox" readOnly checked={product.isOnSale} />
              </label>
            </div>
            <p>Descripción: {product.description}</p>
            <img
              src={product.image ? product.image : constants.imagePlaceholder}
              alt="imagen del anuncio"
              className="h-52 w-52 object-cover rounded-lg"
            />
            <div className="flex gap-4 flex-col">
              <Button variant="danger" onClick={() => setShowLogoutConfirm(true)}>
                Borrar producto
              </Button>
              <Button variant="primary" onClick={handleBack}>
                Volver a la lista de productos
              </Button>
            </div>
          </div>
        ) : (
          <NotFoundPage />
        )}
      </Card>
    </article>
  );
};

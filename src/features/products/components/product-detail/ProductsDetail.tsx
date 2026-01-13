import type { Product } from '@features/products/types/Product';
import React from 'react';
import { useNavigate } from 'react-router';
import { useDetail } from './useDetail';
import { constants, Routes } from '@shared/utils/constants';
import { Card } from '@shared/components/card/Card';
import { NotFoundPage } from '@shared/components/not-found-page/NotFoundPage';

type ProductsDetailProps = {
  readonly id: Product['id'];
};

export const ProductsDetail: React.FC<ProductsDetailProps> = ({ id }) => {
  const navigate = useNavigate();

  const { product } = useDetail(id);

  const handleBack = (): void => {
    navigate(Routes.products);
  };

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <article>
      <h1>Products Detail Page</h1>
      <Card>
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
                <span className="slider" />
              </label>
            </div>
            <p>Descripción: {product.description}</p>
            <img
              src={product.image ? product.image : constants.imagePlaceholder}
              alt="imagen del anuncio"
              className="h-52 w-52 object-cover rounded-lg"
            />
          </div>
        ) : (
          <NotFoundPage />
        )}
        <button onClick={handleBack}> Volver a la lista de productos</button>
      </Card>
    </article>
  );
};

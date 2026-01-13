import type { Product } from '@features/products/types/Product';
import React from 'react';
import { useNavigate } from 'react-router';
import { useDetail } from './useDetail';
import { Routes } from '@shared/utils/constants';
import { Card } from '@shared/components/card/Card';
import { NotFoundPage } from '@shared/components/not-found-page/NotFoundPage';

type ProductsDetailProps = {
  readonly id: Product['id'];
};

export const ProductsDetail: React.FC<ProductsDetailProps> = ({ id }) => {
  const navigate = useNavigate();

  const { product, setProduct } = useDetail(id);

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
          <article>
            <p>ID: {product.id}</p>
            <p>Nombre: {product.name}</p>
            <p>Price: {product.price}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>Is on Sale</span>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={product.isOnSale}
                  onChange={(e) =>
                    setProduct((prev) =>
                      prev ? { ...prev, isOnSale: e.target.checked } : prev
                    )
                  }
                />
                <span className="slider" />
              </label>
            </div>
            <p>Descripción: {product.description}</p>
          </article>
        ) : (
          <NotFoundPage />
        )}
        <button onClick={handleBack}> Volver a la lista de productos</button>
      </Card>
    </article>
  );
};

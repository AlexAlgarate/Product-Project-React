import React from 'react';
import { useParams } from 'react-router';
import { ProductsList } from '../components/products-list/ProductsList';
import { ProductsDetail } from '../components/product-detail/ProductsDetail';

export const ProductsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section>
      {id ? <ProductsDetail id={parseInt(id)} /> : <ProductsList />}
    </section>
  );
};

export { ProductsPage as Component };

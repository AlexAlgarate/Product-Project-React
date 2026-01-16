import React from 'react';
import { useParams } from 'react-router';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { ProductDetail } from '../components/ProductDetail/ProductDetail';

export const ProductsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section>
      {id ? <ProductDetail id={parseInt(id)} /> : <ProductsList />}
    </section>
  );
};

export { ProductsPage as Component };

import React from 'react';
import { Card } from '../card/Card';

export const NotFoundPage: React.FC = () => {
  return (
    <Card style={{ margin: '2rem', textAlign: 'center' }}>
      <h2>
        <span style={{ color: '#ef7023', fontSize: '1.85rem' }}>404</span> - Página no
        encontrada
      </h2>
      <p style={{ fontStyle: 'italic', fontSize: '.95rem' }}>
        La página que buscas no existe.
      </p>
    </Card>
  );
};

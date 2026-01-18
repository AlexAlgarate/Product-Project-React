import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import type { Product } from '@features/products/types/product.types';
import { Routes } from '@shared/utils/constants';
import { NotFoundPage } from '@shared/pages/NotFoundPage';
import { ConfirmModal } from '@shared/components/feedback/ModalConfirm';
import { useProduct } from '../../hooks/useProduct';

import { ProductImage } from './ProductImage';
import { ProductInfo } from './ProductInfo';
import { ProductTags } from './ProductTags';
import { ProductDescription } from './ProductDescription';
import { ProductStatus } from './ProductStatus';
import { ProductActions } from './ProductActions';
import { ProductEditForm } from './ProductEditForm';

type ProductDetailProps = {
  readonly id: Product['id'];
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { product, deleteProduct, updateProduct, isLoading } = useProduct(id);

  const handleBack = useCallback(() => {
    navigate(Routes.products);
  }, [navigate]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleSaveEdit = useCallback(
    async (updatedProduct: Product) => {
      try {
        const { id, ...productDTO } = updatedProduct;
        await updateProduct(productDTO);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    [updateProduct],
  );

  const handleConfirmDelete = useCallback(() => {
    if (!product) return;

    deleteProduct();
    navigate(Routes.products);
  }, [deleteProduct, navigate, product]);

  const handleDeleteClick = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  const handleConfirmDeleteAndClose = useCallback(() => {
    setShowDeleteConfirm(false);
    handleConfirmDelete();
  }, [handleConfirmDelete]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent" />
          <p className="mt-4 text-white/60">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return <NotFoundPage />;
  }

  // Modo edición
  if (isEditing) {
    return (
      <ProductEditForm
        product={product}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

  // Modo visualización
  return (
    <>
      {showDeleteConfirm && (
        <ConfirmModal
          title="Confirmar eliminación"
          message={`¿Estás seguro de que deseas eliminar "${product.name.slice(0, 30)}${product.name.length > 30 ? '...' : ''}"? Esta acción no se puede deshacer.`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDeleteAndClose}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImage product={product} />

          <div className="flex flex-col">
            <ProductInfo product={product} />
            <ProductTags tags={product.tags} />
            <ProductDescription description={product.description} />
            <ProductStatus isOnSale={product.isOnSale} />
            <ProductActions
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onBack={handleBack}
            />
          </div>
        </div>
      </div>
    </>
  );
};

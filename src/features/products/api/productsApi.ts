import type { Product, ProductDTO } from '@features/products/types/product.types';
import { getToken } from '@shared/utils/auth';

const PRODUCTS_URL = import.meta.env.VITE_API_URL + '/products';

class UnauthorizedError extends Error {
  constructor() {
    super('Not authorized');
    this.name = 'UnauthorizedError';
  }
}

class NetworkError extends Error {
  constructor() {
    super('No se puede conectar con el servidor. ¿Está levantado el Backend?');
    this.name = 'NetworkError';
  }
}

const getAuthHeaders = (): { Authorization: string } => {
  const token = getToken();

  if (!token) throw new UnauthorizedError();

  return { Authorization: `Bearer ${token}` };
};

const handleResponse = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  let response;

  try {
    response = await fetch(input, { ...init });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new NetworkError();
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Resource not found');
    }
    if (response.status === 401) {
      throw new UnauthorizedError();
    }

    throw new Error(`${response.status.toString()} -- ${response.statusText}`);
  }

  return (await response.json()) as Promise<T>;
};

const getProductByIdAsync = async (id: number): Promise<Product> => {
  const token = getAuthHeaders();

  return await handleResponse(`${PRODUCTS_URL}/${id}`, { headers: token });
};

const getAllProducts = async (): Promise<Product> => {
  const token = getAuthHeaders();

  return await handleResponse(`${PRODUCTS_URL}`, { headers: token });
};

const createProduct = async (productData: ProductDTO): Promise<Product> => {
  const token = getAuthHeaders();

  return await handleResponse(`${PRODUCTS_URL}`, {
    method: 'POST',
    headers: {
      ...token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
};

const updateProduct = async (
  id: Product['id'],
  product: Partial<ProductDTO>,
): Promise<Product> => {
  const token = getAuthHeaders();

  return await handleResponse(`${PRODUCTS_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      ...token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
};

const deleteProduct = async (id: Product['id']): Promise<Product> => {
  const token = getAuthHeaders();

  return await handleResponse(`${PRODUCTS_URL}/${id}`, {
    method: 'DELETE',
    headers: token,
  });
};

export default {
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductByIdAsync,
  createProduct,
};

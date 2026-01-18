export type Product = {
  id: number;
  name: string;
  price: number;
  tags: string[];
  isOnSale: boolean;
  image?: string;
  description?: string;
};

export type ProductDTO = Omit<Product, 'id'>;

export type ProductFormData = {
  name: string;
  price: string;
  tags: string;
  image: string;
  description: string;
  isOnSale: boolean;
};

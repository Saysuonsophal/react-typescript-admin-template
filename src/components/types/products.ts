export type IProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  qty: number;
  categoryId: number;
  color?: string;
  isActive: boolean;
  category: {
    id: number;
    name: string;
  };
  createdAt?: string;
  productImages?: IProductImage[]; // 👈 Array of image URLs
};

export type IProductImage = {
  id: number;
  productId: number;
  imageURL: string;
  originalName: string;
};

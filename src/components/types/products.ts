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
  //images: string[]; // 👈 Array of image URLs
};

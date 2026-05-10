export type Customer = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  createdAt: string;
  email: string;
  orders?: Order[];
};

export type Order = {
  id: number;
  customerId: number;
  orderNumber: string;
  total: number;
  discount: number;
  createdAt: string;
};

import api from "@/lib/axios";

export interface OrderPayload {
  discount: number;
  items: {
    productId: number;
    qty: number;
  }[];
}

export const CreateOrder = async (request: OrderPayload) => {
  return await api.post(`/api/v1/orders`, request);
};

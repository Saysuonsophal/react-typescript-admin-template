//1.(POST product)Clean API File (Production Correct)
import type { productSchema } from "@/schemas/product.schema";
import api from "@/lib/axios";

export const getProduct = async (
  search?: string,
  page: number = 1,
  limit: number = 10,
) => {
  const data = await api.get(`/api/v1/products`, {
    params: {
      search,
      page,
      limit,
    },
  });
  return data;
};

//request is parameter that getting value from hook(TanStack query)

export const createProduct = async (request: productSchema) => {
  const data = await api.post(`/api/v1/products`, request);
  return data;
};
export const updateProduct = async (id: number, request: productSchema) => {
  const data = await api.put(`/api/v1/products/${id}`, request);
  return data;
};
export const deleteProduct = async (id: number) => {
  const data = await api.delete(`/api/v1/products/${id}`);
  return data;
};

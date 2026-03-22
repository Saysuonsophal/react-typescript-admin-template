import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "@/services/productService";
import { toast } from "sonner";
import type { productSchema } from "@/schemas/product.schema";

export function useGetProduct(search?: string) {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => getProduct(search),
    staleTime: 1000 * 30,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  //useMutation using for POS, PUT, DELETE method
  return useMutation({
    mutationFn: createProduct, //HTTP method POST request API
    onSuccess: () => {
      // Clear cached and query API again
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => {
      console.error("Failed to create product:", err);
    },
  });
}
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: productSchema }) =>
      updateProduct(id, request), //HTTP method POST request API
    onSuccess: () => {
      // Clear cached and query API again
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => {
      console.error("Failed to update product:", err.message);
      toast.error("Failed to update product");
    },
  });
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

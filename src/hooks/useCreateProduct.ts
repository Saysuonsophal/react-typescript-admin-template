import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getProduct,
  updateProduct,
  uploadProductImage,
} from "@/services/productService";
import { toast } from "sonner";
import type { productSchema } from "@/schemas/product.schema";

export function useGetProduct(search?: string, page?: number, limit?: number) {
  return useQuery({
    queryKey: ["products", search, page, limit],
    queryFn: () => getProduct(search, page, limit),
    staleTime: 100 * 60 * 10,
    placeholderData: keepPreviousData,
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

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: File }) =>
      uploadProductImage(id, request),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      console.log("Failed to upload product image:", err);
      toast.error("Failed to upload product image");
    },
  });
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteProductImage(id),
    onSuccess: () => {
      //console.log("Deleted product image successfully:", res);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => {
      console.log("Failed to delete product image:", error);
      toast.error("Failed to delete product image");
    },
  });
};

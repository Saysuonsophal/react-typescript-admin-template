import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/services/productService";

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

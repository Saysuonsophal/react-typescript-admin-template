import { createCategory, getCategory } from "@/services/categoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//userQuery using for GET method
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"], //key catch
    queryFn: getCategory, // API
    staleTime: 100 * 60 * 10,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      console.error("Failed to create categories", err.message);
    },
  });
};

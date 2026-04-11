import type { ICategory } from "@/components/types/category";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "@/services/categoryService";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
//import { data } from "react-router-dom";

//userQuery using for GET method
export const useCategories = (
  search?: string,
  page?: number,
  limit?: number,
) => {
  return useQuery({
    queryKey: ["categories", search, page, limit], //key catch
    queryFn: () => getCategory(search, page, limit), // API

    staleTime: 100 * 60 * 10,
    placeholderData: keepPreviousData, //keep data when fetch new data
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      // ✅ Tell React Query that categories data is stale
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      console.error("Failed to create categories", err.message);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: ICategory }) =>
      updateCategory(id, request),
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

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return deleteCategory(id);
    },
    //mutationFn: ({ id }: { id: number }) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

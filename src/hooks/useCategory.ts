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

    staleTime: 100 * 60 * 10, //data is fresh for 10 minutes
    //refetchInterval: 5000, //refetch data every 5s
    placeholderData: keepPreviousData, //keep data when fetch new data
    refetchOnMount: false,
    //refetchOnWindowFocus: true, //refetch data when window focus
    // refetchOnReconnect: false,
    retry: 1, //retry once when fetch data fail
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

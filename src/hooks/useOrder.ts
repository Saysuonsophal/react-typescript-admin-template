import { CreateOrder } from "@/services/order.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    
    onError: (err: Error) => {
      toast.error("Failed to create order");
      console.error("Failed to create order", err.message);
    },
  });
};

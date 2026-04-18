import { createPayment } from "@/services/payment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      toast.success("Payment created successfully");
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
    onError: (err: Error) => {
      toast.error("Failed to create payment");
      console.error("Failed to create payment", err.message);
    },
  });
};

import { getCustomer } from "@/services/customerService";
import { useQuery } from "@tanstack/react-query";

export const useCustomer = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getCustomer,
  });
};

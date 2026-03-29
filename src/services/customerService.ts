import api from "@/lib/axios";
export const getCustomer = async () => {
  const data = await api.get(`/api/v1/customers`);
  return data;
};

import api from "@/lib/axios";
export interface LoginPayload {
  email: string;
  password: string;
}
// export interface User {
//   id: string;
//   name: string;
//   email: string;
// }
// export interface LoginResponse {
//   accessToken: string;
//   user: User;
// }
export const authLogin = async (
  request: LoginPayload,
) => {
  const data  = await api.post(`/api/v1/auth/login`, request);
  return data;
};

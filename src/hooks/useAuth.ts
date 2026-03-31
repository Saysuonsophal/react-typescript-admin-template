import { authLogin, type LoginPayload } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useAuthLogin = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ request }: { request: LoginPayload }) => authLogin(request),
    onSuccess: () => {
      // Global side effect: save token
      // const token = res?.data?.accessToken;
      // if (token) setAccessToken(token);
    },
    onError: (err: Error) => {
      console.error("Login failed in hook:", err.message);
    },
  });
};

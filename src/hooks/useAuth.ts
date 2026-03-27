import { authLogin, type LoginPayload } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAuthLogin = () => {
//   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ request }: { request: LoginPayload }) => authLogin(request),
    onSuccess: () => {
      
      //queryClient.invalidateQueries({ queryKey: ["login"] });
    },
    onError: (err: Error) => {
      console.error("Failed to Sign In:", err.message);
      toast.error("Failed to Sign In");
    },
  });
};

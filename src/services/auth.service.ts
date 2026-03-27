export interface LoginPayload {
  email: string;
  password: string;
}
export const authLogin = async (request: LoginPayload) => {
  const respon = await fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
//   if (!respon.ok) {
//     throw new Error(`HTTP error !${respon.status} while sign in  `);
//   }
  const data = await respon.json();
  return data;
};

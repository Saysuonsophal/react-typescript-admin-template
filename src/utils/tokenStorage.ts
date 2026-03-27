//set (Meaning storage token after login successfully)

export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

//get (Meaning get token when accessing to endpoint that backend protection )
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

//remove(Meaning remove tokend when backend respond expired)
export const removeAccessToken = () => {
  return localStorage.removeItem("accessToken");
};

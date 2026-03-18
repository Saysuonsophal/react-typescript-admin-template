export const getCustomer = async () => {
  const respon = await fetch("http://localhost:3000/api/v1/customers");
  if (!respon.ok) {
    throw new Error(`fetch customer eror ${respon.status}`);
  }
  const data = await respon.json();
  return data;
};

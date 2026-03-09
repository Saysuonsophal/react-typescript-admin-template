//Old way Fetching data API in React
// const [products, setProducts] = useState<Product[]>([]);
//   useEffect(() => {
//     const FetchAPI = async () => {
//       try {
//         const respon = await fetch("http://localhost:3000/api/v1/products");
//         if (!respon.ok) {
//           throw new Error(`HTTP error! ${respon.status}`);
//         }
//         const data = await respon.json();

//         console.log("Fetch API data:", data);
//         setProducts(data.data ?? data);
//         return data;
//       } catch (err) {
//         console.error("API Backend Error: ", err);
//       }
//     };
//     FetchAPI();
//   }, []);

export const FetchAPI = async (search?: string) => {
  const query = search ? `?search=${search}` : "";
  const respon = await fetch(`http://localhost:3000/api/v1/products${query}`);
  if (!respon.ok) {
    throw new Error(` HTTP error! ${respon.status} to fetch products `);
  }
  const data = await respon.json();

  console.log("Fetch API data:", data);

  return data;
};



import { Button } from "@/components/ui/button";
import { columns } from "@/components/products/columns";
import { DataTable } from "@/components/data-table";

import { Link } from "react-router-dom";
import type { Product } from "@/data/product";
//import { products } from "@/data/product"; // fake product data input
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [product, setProducts] = useState<Product[]>([]); //store API Data
  const [loading, setloading] = useState<boolean>(false); //show loading message (promise server)
  //const [error, setError] = useState<string | null>(null); //show error message

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setloading(true); // 👈 start loading
        const respon = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!respon.ok) {
          console.log("Your Fetching API data is wrong");
        }
        const data = await respon.json();
        console.log("API Data:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setloading(false); // 👈 stop loading
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    );
  //if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center  mb-3">
        <Link to={"/"}>
          <Button>Back to Home</Button>
        </Link>
        <p className="text-center font-bold text-xl m-3">Product Page</p>
        <p className="text-center text-[18px] m-3">
          Fake Api data fetch from Platzi fake store api{" "}
        </p>
      </div>

      <DataTable columns={columns} data={product} />
    </div>
  );
}

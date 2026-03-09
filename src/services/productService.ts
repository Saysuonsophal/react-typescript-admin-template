//1.(POST product)Clean API File (Production Correct)
import type { ProductSchema } from "@/schemas/product.schema";

//request is parameter that getting value from hook(TanStack query)

export const createProduct = async (request: ProductSchema) => {
  const respon = await fetch(`http://localhost:3000/api/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!respon.ok) {
    throw new Error(` HTTP error! ${respon.status} while creating product `);
  }
  const data = await respon.json();
  if (!respon.ok) {
    console.error("Backend error:", data); // 🔍 See actual error
    throw new Error(`HTTP error! ${respon.status}`);
  }

  //console.log("Fetch API data:", data);

  return data;
};

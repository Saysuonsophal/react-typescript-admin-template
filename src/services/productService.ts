//1.(POST product)Clean API File (Production Correct)
import type { productSchema } from "@/schemas/product.schema";

export const getProduct = async (search?: string) => {
  const respon = await fetch(
    `http://localhost:3000/api/v1/products?search=${search}`,
  );
  if (!respon.ok) {
    throw new Error("getting Data Error");
  }
  const data = await respon.json();
  console.log("API data:", data);
  return data;
};

//request is parameter that getting value from hook(TanStack query)

export const createProduct = async (request: productSchema) => {
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
    console.error("Backend error:", data); // ✅ now you can see the actual error
    throw new Error(
      data?.message ?? `HTTP error! ${respon.status} while creating product`,
    );
  }

  //console.log("Fetch API data:", data);

  return data;
};
export const updateProduct = async (id: number, request: productSchema) => {
  const respon = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!respon.ok) {
    throw new Error(` HTTP error! ${respon.status} while update product `);
  }
  const data = await respon.json();

  //console.log("Fetch API data:", data);

  return data;
};
export const deleteProduct = async (id: number) => {
  const respon = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!respon.ok) {
    throw new Error(` HTTP error! ${respon.status} while delete product `);
  }
  const data = await respon.json();

  //console.log("Fetch API data:", data);

  return data;
};

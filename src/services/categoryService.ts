export const getCategory = async () => {
  const respon = await fetch("http://localhost:3000/api/v1/categories");
  if (!respon.ok) {
    throw new Error(` Failed to fetch categories`);
  }
  //const data = await respon.json();
  return respon.json();
};

export const createCategory = async (request: any) => {
  const respon = await fetch("http://localhost:3000/api/v1/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!respon.ok) {
    throw new Error(` HTTP error! ${respon.status} while POST categories`);
  }

  const data = await respon.json();

  console.log("Backend error", data);

  return data;
};

export const updateCategory = async (id: number, request: any) => {
  const respon = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!respon.ok) {
    throw new Error(` HTTP error! ${respon.status} while PUST categories`);
  }

  const data = await respon.json();

  console.log("Backend error", data);

  return data;
};
export const deleteCategory = async (id: number) => {
  const respon = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!respon.ok) {
    throw new Error(` HTTP error! ${respon.status} while DELETE categories`);
  }

  const data = await respon.json();
  return data;
};

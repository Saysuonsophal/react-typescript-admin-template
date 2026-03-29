import api from "@/lib/axios";

export interface CategoryPayload {
  name: string;
}

// Fetch API version

// export const getCategory = async (
//   search?: string,
//   page?: number,
//   limit?: number,
// ) => {
//   const respon = await fetch(
//     `http://localhost:3000/api/v1/categories?search=${search}&page=${page}&limit=${limit}`,
//   );
//   if (!respon.ok) {
//     throw new Error(` Failed to fetch categories`);
//   }
//   const data = await respon.json();
//   //console.log("fetch api:", data);

//   return data;
// };

// Axios API version
export const getCategory = async (
  search?: string,
  page?: number,
  limit?: number,
) => {
  const data = await api.get(`/api/v1/categories`, {
    params: {
      search,
      page,
      limit,
    },
  });
  return data;
};

// change Fetch API to Axios API for create, update, and delete category
export const createCategory = async (request: CategoryPayload) => {
  const data = await api.post(`/api/v1/categories`, request);

  return data;
};

export const updateCategory = async (id: number, request: CategoryPayload) => {
  const data = await api.put(`/api/v1/categories/${id}`, request);
  return data;
};
export const deleteCategory = async (id: number) => {
  const data = await api.delete(`/api/v1/categories/${id}`);
  return data;
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: number;
  title: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  price: number;
  images: string[]; // 👈 Array of image URLs

  //status: "pending" | "processing" | "success" | "failed";
};

// export interface Props {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// }

// Fake Product Data input
export const products = [
  {
    id: 1,
    productName: "Laptop",
    price: 99,
    quantity: 100,
  },
  {
    id: 2,
    productName: "Phone",
    price: 89,
    quantity: 100,
  },
  {
    id: 3,
    productName: "Phone",
    price: 89,
    quantity: 100,
  },
];

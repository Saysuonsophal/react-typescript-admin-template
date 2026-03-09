import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { DataTable } from "@/components/data-table";

import { columns } from "@/components/users/columns";
import { users } from "@/data/user";

function Users() {
  // variable Array object
  const products = [
    {
      id: 1,
      productName: "T-shirt",
      productPrice: 100,
      qty: 10,
      imageUrl:
        "https://zandokh.com/image/cache/catalog/products/2025-12/5152512177/VSAL4350-cr-450x672.jpg",
    },
    {
      id: 2,
      productName: "Running Shoes",
      productPrice: 39.95,
      qty: 10,
      imageUrl:
        "https://zandokh.com/image/catalog/products/2026-02/5152508084/TAKK5725.jpg",
    },
    {
      id: 3,
      productName: "Retro Culture",
      productPrice: 28.39,
      qty: 10,
      imageUrl:
        "https://zandokh.com/image/cache/catalog/products/2026-01/5252512132/8J6A8968-cr-450x672.jpg",
    },
    {
      id: 3,
      productName: "Retro Culture",
      productPrice: 28.39,
      qty: 10,
      imageUrl:
        "https://zandokh.com/image/cache/catalog/products/2026-01/5252512132/8J6A8968-cr-450x672.jpg",
    },
  ];
  return (
    <div className="mx-5">
      <h2 className="font-bold text-2xl">User page </h2>

      <Link to={"/"}>
        <Button>Home Page</Button>
      </Link>

      <h2 className="text-lg font-bold text-center mb-5">
        <strong>(Render data Table) </strong>Display User Data Input Array in
        Table,
      </h2>
      <DataTable
        columns={columns}
        data={users}
        filterColumn="name"
        filterPlaceholder="Search Name..."
      />
      <br />
      <h2 className="text-lg font-bold text-center mb-5">
        <strong>(Props + Render List) </strong>Display Product Card Array
      </h2>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 lg:gap-3 gap-6 ">
        {products.map((item, index) => {
          return (
            <ProductCard
              //key={item.id} //using this if you have Unique IDs of array object
              key={index}
              productName={item.productName}
              productPrice={item.productPrice}
              qty={item.qty}
              imageUrl={item.imageUrl}
            />
          );
        })}
      </div>
      <br />
      <br />
      <h2 className="text-lg font-bold text-center mb-3 capitalize">
        <strong>(Props) </strong>
        <br />
        provide difference data/value from parent component to a child component
        when calling many time
      </h2>
      {/* <ProductCard productName={"T-shirt"} productPrice={10} /> */}
      <ProductCard
        productName={"T-Shirt"}
        productPrice={99.99}
        qty={10}
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9XTM0DSMbH3yic8KUfHLapNVE2ZVpm4hSyw&s"
      />
    </div>
  );
}

export default Users;

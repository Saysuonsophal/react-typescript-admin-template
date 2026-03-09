import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//(Option) define type of props value input
interface PropsType {
  productName: string;
  productPrice: number;
  qty: number;
  imageUrl: string;
}
//props in React Js(recive value from parent by parameter)
function ProductCard({ productName, productPrice, qty, imageUrl }: PropsType) {
  return (
    <>
      {/* productName is props */}

      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 h-auto " />
        <img
          src={imageUrl}
          alt="Event cover"
          className="relative z-20 aspect-video xl:h-60 h-70 object-cover rounded-t-xl"
        />
        <CardHeader>
          <CardAction>
            <Badge
              variant="secondary"
              className="absolute bottom-auto right-[10px] bg-red-400 capitalize text-white"
            >
              {qty} Available
            </Badge>
          </CardAction>
          <CardTitle className="text-xl relative">{productName}</CardTitle>
          <CardDescription>
            A practical talk on component APIs, accessibility, and shipping
            faster.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <p className="text-3xl font-bold">${productPrice}</p>
          <Button className="w-auto cursor-pointer">Add to card</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProductCard;

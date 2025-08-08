"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PopularProducts, { Product } from "@/app/_components/PopularProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Palette, ShoppingCart } from "lucide-react";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    productId && GetProductById();
  }, [productId]);

  const GetProductById = async () => {
    setLoading(true);
    const result = await axios.get("/api/products?productId=" + productId);
    console.log(result?.data);
    setProduct(result?.data);
    setLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-20">
        <div className="flex items-center justify-center border rounded-2xl">
          {product ? (
            <Image
              src={product?.productImage[0]?.url}
              alt={product?.title}
              width={400}
              height={400}
            />
          ) : (
            <Skeleton className="w-full h-[300px]"></Skeleton>
          )}
        </div>

        <div>
          {product ? (
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-3xl">{product?.title}</h2>
              <h2 className="font-bold text-3xl">$ {product?.pricing}</h2>
              <p className="text-gray-500">{product?.description}</p>
              <div>
                <h2 className="text-lg">Size</h2>
                <div className="flex gap-3">
                  <Button variant={"outline"}>S</Button>
                  <Button variant={"outline"}>M</Button>
                  <Button variant={"outline"}>L</Button>
                  <Button variant={"outline"}>XL</Button>
                </div>
              </div>
              <Button size={"lg"}>
                <Palette /> Customize
              </Button>
              <Button size={"lg"} variant={"outline"}>
                <ShoppingCart /> Add To Cart
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Skeleton className="w-full h-[20px]"></Skeleton>
              <Skeleton className="w-full h-[30px]"></Skeleton>
              <Skeleton className="w-full h-[50px]"></Skeleton>
              <Skeleton className="w-full h-[50px]"></Skeleton>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-bold text-lg">Product Description</h2>
        <p className="text-gray-500">{product?.description}</p>
      </div>
      <PopularProducts />
    </div>
  );
}

export default ProductDetail;

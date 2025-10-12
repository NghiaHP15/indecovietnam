import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "@/constants/types";
import { ProductStatus } from "@/constants/enum";
import PriceFormatter from "./PriceFormatter";
import ProductSideMenu from "./ProductSideMenu";
import { getViews } from "@/services/productService";

const ProductCard = ({ product, basic = false }: { product: Product; basic?: boolean }) => {

  const getBadgeColor = () => {
    switch (product?.status) {
      case ProductStatus.HOT:
        return "bg-dark_brownish";
      case ProductStatus.NEW:
        return "bg-light_brownish";
      default:
        return "bg-red-500/70";
    }
  };

  const handleClick = async (id: string) => {
    try {
      await getViews(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`text-sm group p-3 hoverEffect ${
        !basic && "hover:bg-white hover:shadow-[0_7px_20px_rgba(0,0,0,.05)] hover:scale-105"
      }`}
    >
      <div className="relative">
        {product?.image && (
          <div
            className={`shadow-[0_7px_20px_rgba(0,0,0,.05)] hoverEffect ${
              !basic && "group-hover:shadow-none"
            }`}
          >
            <Link href={`/product/${product?.slug}`} onClick={() => handleClick(product.id)} className="relative block">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={600}
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-auto object-contain"
              />
              <div
                className={`${getBadgeColor()} absolute left-0 top-3 z-10 px-3 py-1 text-xs text-white rounded-[2px] opacity-0 group-hover:opacity-100 group-hover:left-3 hoverEffect`}
              >
                {product.status === ProductStatus.HOT
                  ? "Hot"
                  : product.status === ProductStatus.NEW
                  ? "New"
                  : "Sale"}
              </div>
            </Link>
          </div>
        )}

        <ProductSideMenu
          product={product}
          variant={product.variants.find((v) => v.price === product.min_price) || product.variants[0]}
          className="opacity-0 group-hover:opacity-100 group-hover:right-3 hoverEffect"
        />
      </div>

      <div className="p-3 flex flex-col gap-1">
        <Link href={`/product/${product?.slug}`} onClick={() => handleClick(product.id)}>
          <h3 className="text-base text-darkColor">{product.name}</h3>
        </Link>

        <div className="relative h-6 overflow-hidden">
          <div className="absolute top-0 flex gap-2 items-center opacity-100 group-hover:opacity-0 group-hover:-top-5 hoverEffect">
            <PriceFormatter amount={product?.min_price} className="text-base text-darkColor" />
          </div>

          <Link
            href={`/product/${product?.slug}`}
            className="absolute top-0 opacity-0 text-base group-hover:opacity-100 group-hover:top-0 underline underline-offset-2 hoverEffect"
          >
            Mua sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

"use client";
import toast from "react-hot-toast";
import { FavoriteItem,  ProductOrder, ProductVariant } from "@/constants/types";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useStore from "../../store";

interface Props {
  product?: ProductOrder,
  variant?: ProductVariant,
  showProduct?: boolean
}

const FavoriteButton = ({ showProduct = false, product, variant } : Props) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [ existingProductVariant, setExistingProductVariant ] = useState<FavoriteItem | null>(null);
  
  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?.variant?.id === variant?.id && item?.product.slug === product?.slug
    );
    setExistingProductVariant(availableItem || null);
  }, [product, variant, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?.slug && variant?.id) {
      addToFavorite(product, variant).then(() => {
        toast.success(
          existingProductVariant
            ? "Đã xóa sản phâm!"
            : "Đã thêm sản phẩm!"
        );
      });
    }
  };
  
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 hover:text-light_brownish hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-dark_brownish text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
            {favoriteProduct?.length ? favoriteProduct?.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-light_brownish hoverEffect border border-light_brownish/80 hover:border-light_brownish p-1.5 rounded-sm"
        >
          {existingProductVariant ? (
            <Heart
              fill="#c7966f"
              className="text-light_brownish/80 group-hover:text-light_brownish hoverEffect mt-.5 w-5 h-5"
            />
          ) : (
            <Heart className="text-light_brownish/80 group-hover:text-light_brownish hoverEffect mt-.5 w-5 h-5" />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
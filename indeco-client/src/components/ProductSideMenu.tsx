"use client";
import { FavoriteItem,ProductOrder,ProductVariant } from "@/constants/types";
import { cn } from "@/constants/utils";
import { Heart } from "lucide-react";
import useStore from "../../store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  product: ProductOrder;
  variant: ProductVariant;
  className?: string;
}

const ProductSideMenu = ({ product, variant, className }: Props) => {  

  const { favoriteProduct, addToFavorite } = useStore();
  const [ existingProduct, setExistingProduct ] = useState<FavoriteItem | null>(null);

  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?.variant?.id === variant?.id && item?.product.slug === product.slug
    );
    setExistingProduct(availableProduct || null);
  }, [product, variant, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product && variant?.id) {
        addToFavorite(product, variant).then(() => {
            toast.success(
            existingProduct
                ? "Xóa sản phẩm thành công!"
                : "Thêm sản phẩm thành công!"
            );
        });
    }
  };

  return (
    <div
      className={cn("absolute top-3 right-0 hover:cursor-pointer", className)}
    >
      <div
        onClick={handleFavorite}
        className={`p-2 md:p-3 rounded-full shadow-[0_7px_20px_rgba(0,0,0,.07)] hover:bg-dark_brownish/80 hover:text-white hoverEffect  ${existingProduct ? "bg-dark_brownish/80 text-white" : "bg-lightColor/10"}`}
      >
        <Heart size={15} />
      </div>
    </div>
  )
};

export default ProductSideMenu;
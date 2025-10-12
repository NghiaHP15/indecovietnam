"use client";
import { cn } from "@/constants/utils";
import { ProductOrder, ProductVariant } from "@/constants/types";
import useStore from "../../store";
import toast from "react-hot-toast";
import QuantityButtons from "./QuantityButton";
import PriceFormatter from "./PriceFormatter";

interface Props {
  product: ProductOrder;
  variant: ProductVariant;
  className?: string;
}

const AddToCartButton = ({ product, variant, className }: Props) => {
  
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(variant?.id);
  const isOutOfStock = variant?.quantity_in_stock === 0;

  const handleAddToCart = () => {
    if ((variant?.quantity_in_stock as number) > itemCount) {
      addItem(product, variant);
      toast.success(
        `${product?.name.substring(0, 12)}... Thêm thành công!`
      );
    } else {
      toast.error("Không thể vào giỏ hàng");
    }
  };
  
  return (
    <div className="w-full flex items-center">
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-base text-darkColor">Số lượng</span>
            <QuantityButtons variant={variant} product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-base font-bold">Tổng giá:</span>
            <PriceFormatter
              className="text-base font-bold"
              amount={variant?.price ? variant?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn("px-4 py-1 relative overflow-hidden border rounded-sm border-gray-300 group", className)}
        >
          
          <span className="relative text-sm md:text-base z-10 text-darkColor group-hover:text-white hoverEffect">{isOutOfStock ? "Không còn hàng" : "Thêm vào giỏ"}</span>
          <div className="absolute inset-0 bg-btn_light_brownish transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0" />
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/constants/utils";
import toast from "react-hot-toast";
import useStore from "../../store";
import { ProductOrder, ProductVariant } from "@/constants/types";

interface Props {
  product: ProductOrder;
  variant: ProductVariant;
  className?: string;
}
const QuantityButtons = ({ product, variant, className }: Props) => {
  const { addItem, removeItem, getItemCount } = useStore();
  const itemCount = getItemCount(variant?.id);
  const isOutOfStock = variant?.quantity_in_stock === 0;
  

  const handleRemoveProduct = () => {
    removeItem(variant?.id);
    if (itemCount > 1) {
      toast.success("Đã giảm số lượng!");
    } else {
      toast.success(`${product?.name.substring(0, 12)} xóa thành công!`);
    }
  };

  const handleAddToCart = () => {
    if ((variant?.quantity_in_stock as number) > itemCount) {
      addItem(product, variant);
      toast.success("Đã tăng số lượng!");
    } else {
      toast.error("Không thể tăng số lượng!");
    }
  };

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        onClick={handleRemoveProduct}
        variant="outline"
        size="icon"
        disabled={itemCount === 0 || isOutOfStock}
        className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect"
      >
        <Minus />
      </Button>
      <span className="font-semibold text-sm w-6 text-center text-darkColor">
        {itemCount}
      </span>
      <Button
        onClick={handleAddToCart}
        variant="outline"
        size="icon"
        disabled={isOutOfStock}
        className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
"use client";
import { cn } from "@/constants/utils";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Product, ProductVariant } from "@/constants/types";
import useStore from "../../store";
import { Button } from "./ui/button";

interface Props {
  product: Product;
  variant: ProductVariant;
  className?: string;
}

const CheckoutButton = ({ product, variant, className }: Props) => {
    const [loading, setLoading] = useState(false);
    const { items, addItem } = useStore();
    const router = useRouter();
    const isOutOfStock = variant?.quantity_in_stock === 0;

    const handleCheckout = () => {
        setLoading(true);
        const check = items.find((item) => item.variant.id === variant.id);
        if(!check) addItem(product, variant);
        router.push('/checkout'); 
        setLoading(false);
    };
    
    return (
        <div className="w-full flex items-center">
         <Button
            isLoading={loading}
            onClick={handleCheckout}
            disabled={isOutOfStock}
            className={cn("bg-transparent hover:bg-transparent px-4 py-1 relative overflow-hidden border rounded-sm border-gray-300 group", className)}
            >
            
            <span className=" relative text-sm md:text-base z-10 text-darkColor group-hover:text-white hoverEffect">{isOutOfStock ? "Không còn hàng" : "Mua ngay"}</span>
            <div className="absolute inset-0 bg-btn_light_brownish transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0" />
            </Button>
        </div>
    );
};

export default CheckoutButton;

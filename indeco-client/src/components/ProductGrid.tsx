"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react"
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import { Product } from "@/constants/types";
import ProductCard from "./ProductCard";


const ProductGrid = ({ data , loading }: { data: Product[], loading: boolean }) => {

    return (
        <div className="mt-10">
            {loading ? 
            <div className="flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10">
                <div className="space-x-2 flex items-center text-blue-600">
                    <Loader2  className="w-5 h-6 animate-spin"/>
                    <span>Đang chờ sản phẩm ...</span>
                </div>
            </div> : 
            data?.length ? 
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
                {data?.map((item) => (
                    <AnimatePresence key={item?.id}>
                        <motion.div
                            layout
                            initial={{ opacity: 0.2}}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0.2 }}
                        >
                            <ProductCard product={item}/>
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>: 
            <NoProductAvailable />
            } 
        </div>
    );
};

export default ProductGrid;

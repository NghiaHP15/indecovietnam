import { Product } from "@/constants/types";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import ProductCard from "./ProductCard";

const ProductList = ({ data } : { data: Product[] }) => {


    return (
        <Carousel>
            <CarouselContent>
                {data.map((item, subIdx) => (
                <CarouselItem key={subIdx} className="basis-1/2 md:basis-1/4">
                    <ProductCard  product={item} basic={true} />
                </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default ProductList;

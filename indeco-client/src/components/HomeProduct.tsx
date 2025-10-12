"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Product } from "@/constants/types";
import ProductList from "./ProductList";
import { Title } from "./ui/text";
import { ProductStatus } from "@/constants/enum";
import { getAllProducts } from "@/services/productService";


const HomeProduct = ({ type } : {type: ProductStatus}) => {
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllProducts({ params: { status: type, featured: true } });
                if (res.data.success) {
                    setData(res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[type])

    return (
        <div className="py-10">
            <Container>
                <div data-aos="fade-up" data-aos-delay="100">
                    <Title  className="uppercase">{type === ProductStatus.HOT ? "Sản phẩm hot" : type === ProductStatus.NEW ? "Sản phẩm mới" : "Sản phẩm sale"}</Title>
                </div>
                <div data-aos="fade-up" data-aos-delay="100">
                    <ProductList data={data}  />
                </div>
            </Container>
        </div>
    );
};

export default HomeProduct;

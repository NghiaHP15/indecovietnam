"use client";
import NoAccess from "@/components/NoAccess";
import WishListProducts from "@/components/WishListProduct";
import React from "react";
import useStore from "../../../store";

const WishListPage = () => {
    const { user } = useStore();

    return (
        <>
            {user ? (
                <WishListProducts />
            ) : (
                <NoAccess details="Vui lòng đang nhập để xem danh sách yêu thích" />
            )} 
        </>
    );
};

export default WishListPage;
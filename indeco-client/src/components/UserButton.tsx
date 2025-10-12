"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { defautUser } from "@/images";
import Link from "next/link";
import useStore from "../../store";
import LogoutButton from "./LogoutButton";

const UserButton = () => {
    const { user } = useStore();
    
    return (
        <Popover>
            <PopoverTrigger asChild className="items-center">
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.avatar || defautUser.src} className="h-7 w-7 rounded-full" />
                    <AvatarFallback>KH</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-50 mt-3 border-none shadow-xl">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar || defautUser.src} alt="avatar"/>
                        <AvatarFallback>KH</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="">{user?.firstname + " " + user?.lastname}</span>
                        <span className="text-lightColor text-sm">Khách hàng</span>
                    </div>
                </div>
                <div className="flex flex-col pt-3">
                    <Link href={"/profile"} className="text-darkColor p-2 rounded-sm hover:bg-gray-100">Tài khoản của bạn</Link>
                    <Link href={"/address"} className="text-darkColor p-2 rounded-sm hover:bg-gray-100">Danh sách địa chỉ</Link>
                    <LogoutButton className="text-darkColor p-2 rounded-sm hover:bg-gray-100 cursor-pointer" />
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default UserButton;

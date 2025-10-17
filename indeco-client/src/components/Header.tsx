"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
// import SearchBar from "./SearchBar";
import Cart from "./Cart";
import MobiMenu from "./MobiMenu";
import FavoriteButton from "./FavoriteButton";
import UserButton from "./UserButton";
import useStore from "../../store";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Lookup from "./Lookup";
// import FavoriteButton from "./FavoriteButton";

const Header:React.FC = () => {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isAtTop, setIsAtTop] = useState(true);
    const { user } = useStore();
    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Nếu cuộn xuống thì ẩn header, cuộn lên thì hiện
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setIsAtTop(currentScrollY <= 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header 
            className={` ${showHeader ? "translate-y-0" : "-translate-y-full"} ${isAtTop ? "bg-transparent " : "bg-white border-b border-gray-200"} bg-none shadow-none py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 flex-none`}>
            <Container className="flex items-center justify-between">
                <div className="w-auto  flex items-center justify-start gap-2.5 md:gap-0">
                    <MobiMenu />
                    <Logo className="md:block hidden" />
                </div>
                <HeaderMenu />
                <div className="w-auto flex items-center justify-end gap-5">
                    <SearchBar />
                    <Lookup />
                    <Cart />
                    <FavoriteButton />
                    {user ?
                    <UserButton/>
                    :
                    <Link href="/login" className="text-shadow-xs text-shadow-neutral-200 text-base text-darkColor p-2 rounded-sm hover:text-light_brownish">Đăng Nhập</Link>
                    }
                </div>
            </Container>
        </header>
    );
};

export default Header;

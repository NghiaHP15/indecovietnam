import { productType } from "@/constants/data";
import Link from "next/link";
import React from "react";

interface HomeTabBarProps {
    selectedTab?: string;
    onTabSelect?: (tab: string) => void;
}

const HomeTabBar = ({selectedTab, onTabSelect} : HomeTabBarProps) => {
  return (
    <div className="flex justify-between items-center flex-wrap gap-5">
        <div className="flex items-center gap-3 text-sm font-semibold">
            {productType.map((item) => (
                <button 
                    key={item?.title}
                    onClick={() => onTabSelect && onTabSelect(item?.title)}
                    className={`${item?.title === selectedTab ? "bg-shop_light_green text-white border-shop_light_green" : "bg-shop_dark_green/20"} border border-shop_btn_dark_green/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect transition-all duration-300`}
                >
                    {item?.title}
                </button>
            ))}
        </div>
        <Link href={"/shop"}>See all</Link>
    </div>
  );
};

export default HomeTabBar;

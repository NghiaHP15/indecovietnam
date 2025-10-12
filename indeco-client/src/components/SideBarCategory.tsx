"use client";

import { CategoryBlog, CategoryService } from "@/constants/types";
import Link from "next/link";
import React from "react";

const SideBarCategory = ({ title, data }: {title: string; data: CategoryBlog[] | CategoryService[]}) => {

    return (
        <div className="space-y-4 px-4 py-6 shadow-[2px_2px_10px_0px_#e7e7e7] rounded-sm">
            <h2 className="text-xl font-medium text-darkColor border-l-4 border-light_brownish pl-2 ">{title}</h2>
            <div>
                {data.map((item, index) => (
                    <div key={index} className="pb-3 mb-3 border-b border-dashed border-b-gray-200 last:border-b-0 last:mb-0 last:pb-0">
                        <Link href={`/blog?category=${item?.slug}`}>
                            <h3 className="text-base line-clamp-1 hover:text-dark_brownish hoverEffect">{item?.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBarCategory;

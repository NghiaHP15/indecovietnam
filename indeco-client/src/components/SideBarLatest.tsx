"use client";

import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Blog, Service } from "@/constants/types";
import { emptyImage } from "@/images";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const SideBarLatest = ({ title, data }: { title: string, data: Blog[] | Service[] }) => {

    return (
        <div className="space-y-4 px-4 py-6 shadow-[2px_2px_10px_0px_#e7e7e7] rounded-sm">
            <h2 className="text-xl font-medium text-darkColor border-l-4 border-light_brownish pl-2 ">{title}</h2>
            <div>
                <Carousel className="h-[200px]">
                    <CarouselContent>
                        {data.map((item, index) => (
                        <CarouselItem key={index}>
                            <div>
                                <Image
                                    src={item?.image || emptyImage}
                                    alt="blogImage"
                                    width={500}
                                    height={200}
                                    className="w-full h-[150px] object-cover rounded-md"
                                />
                                <span className="mt-2 line-clamp-1">{item.title}</span>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                {data.map((item, index) => (
                    <div key={index} className={`${index === 0 ? 'border-t border-t-gray-200 pt-3': '' } pb-3 mb-3 border-b border-b-gray-200 last:border-b-0 last:mb-0 last:pb-0`}>
                        <div className="grid grid-cols-5 md:grid-cols-5 gap-3">
                            <div className="col-span-2 overflow-hidden">
                                <Link href={`/blog/${item?.slug}`}>
                                    <Image
                                        src={item?.image || emptyImage}
                                        alt="blogImage"
                                        width={500}
                                        height={500}
                                        className="w-full max-h-80 object-cover hover:scale-105 transition duration-300 rounded-[2px]"
                                    ></Image>
                                </Link>
                            </div>
                            <div className="flex flex-col justify-start col-span-3 gap-1">
                                <Link href={`/blog/${item?.slug}`}>
                                    <h3 className="text-base line-clamp-1 hover:text-dark_brownish hoverEffect">{item?.title}</h3>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3 "/>
                                    <span className="text-xs">{dayjs(item?.published_at).format("DD - MM - YYYY")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBarLatest;

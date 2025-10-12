/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { getAllMenus } from "@/services/menuService";
import { PositionMenu } from "@/constants/enum";

export interface SubItem {
  title: string;
  href: string;
  image?: string;
}

export interface CategoryItem {
  title: string;
  href: string;
  items?: SubItem[];
}

const HeaderMenu = () => {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryItem | null>(null);
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () => {
    try {
      const res = await getAllMenus();
      if(res.data.success){
        const header = res.data.data.find((item: any) => item.position === PositionMenu.HEADER);
        setData(JSON.parse(header.item));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleTriggerEnter = useCallback((title: string, defaultCategory?: CategoryItem) => {
    setHoveredCategory(defaultCategory ?? null);
  }, []);

  return (
    <NavigationMenu viewport={false} className="hidden md:block">
      <NavigationMenuList className="flex items-center gap-7">
        {data.map((item, index) => {
          const hasSubMenu = item.items && item.items.length > 0;

          if (hasSubMenu) {
            const isGridLayout = item.layout === "grid";

            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  className="capitalize font-semibold text-lightColor bg-transparent hover:bg-transparent hover:text-light_brownish hoverEffect relative group"
                  onMouseEnter={() => handleTriggerEnter(item.title, item.items?.[0])}
                >
                  <Link href={item.href}>{item.title}</Link>
                </NavigationMenuTrigger>

                <NavigationMenuContent className="border-none bg-white rounded-lg shadow-lg p-4" >
                  <div className="flex w-max gap-6">
                    {/* Submenu list */}
                    <ul className="flex flex-col gap-2 min-w-[200px]">
                      {item.items?.map((category: any, catIndex: number) => (
                        <li
                          key={catIndex}
                          className="px-2 py-2 text-md flex items-center justify-between rounded-[5px] cursor-pointer hover:bg-gray-100 hover:text-light_brownish hoverEffect"
                          onMouseEnter={() => setHoveredCategory(category)}
                        >
                          <Link href={category.href} className="w-full">{category.title}</Link>
                        </li>
                      ))}
                    </ul>

                    {/* Carousel Preview */}
                    {isGridLayout && hoveredCategory?.items && (
                      <Carousel>
                        <CarouselContent>
                          {hoveredCategory.items.map((subItem, subIdx) => (
                            <CarouselItem key={subIdx} className="basis-1/4">
                              <Link href={subItem.href}>
                                <div
                                  className="h-[180px] w-[150px] relative hover:scale-110 transition-transform duration-300 overflow-hidden"
                                  style={{
                                    backgroundImage: `url(${subItem.image})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                  }}
                                >
                                  <div className="relative z-2 flex flex-col gap-2 h-full justify-end p-4 text-white">
                                    <span className="text-sm font-medium line-clamp-1 tracking-tighter">
                                      {subItem.title}
                                    </span>
                                  </div>
                                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent z-1" />
                                </div>
                              </Link>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          // Item không có submenu
          return (
            <NavigationMenuItem
              key={index}
              className="group relative"
            >
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className="capitalize font-semibold text-lightColor hover:text-light_brownish hoverEffect relative group"
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HeaderMenu;

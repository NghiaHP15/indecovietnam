/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from "react";
import Logo from "./Logo";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";
import { getAllMenus } from "@/services/menuService";
import { PositionMenu } from "@/constants/enum";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([])

  const toggleSubMenu = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

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

  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 text-white/70 shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } hoverEffect`}
    >
      <div
        ref={sidebarRef}
        className="relative min-w-60 max-w-70 bg-black h-screen p-10 border-r border-r-light_brownish flex flex-col gap-6"
      >
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button
            onClick={onClose}
            className="hover:text-light_brownish hoverEffect absolute top-5 right-5"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col space-y-4.5 font-semibold tracking-wide">
          {data.map((item, index) => {
            const hasSubMenu = item.items && item.items.length > 0;

            if (hasSubMenu) {
              const isOpen = activeIndex === index;

              return (
                <div key={index}>
                  <Link
                    href={item.href}
                    onClick={() => toggleSubMenu(index)}
                    className={`w-full text-left flex items-center justify-between hover:text-light_brownish transition-colors ${
                      pathname === item.href ? "text-white" : ""
                    }`}
                  >
                    {item.title}
                    <ChevronDown size={20} className={`${isOpen ? "rotate-180" : ""} transition-all duration-300 ease-in-out`}/>
                  </Link>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="pl-4 space-y-4.5 mt-2">
                      {item.items.map((subItem: any, subIndex: number) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className={`hover:text-light_brownish transition-colors ${
                              pathname === subItem.href ? "text-white" : ""
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            return (
              <Link
                href={item.href}
                key={item.title}
                className={`hover:text-light_brownish transition-colors ${
                  pathname === item.href ? "text-white" : ""
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
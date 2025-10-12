import { cn } from "@/constants/utils";
import Link from "next/link";
import React from "react";

const Logo = ({className, spanDesign, design} : {className?: string,spanDesign?: string, design?: string}) => {
  return (
    <Link href={"/"}>
        <h2 className={cn("text-xl md:text-2xl text-dark_brownish font-black tracking-wider uppercase hover:text-light_brownish hoverEffect group font-sans", className)}>
            {design === "small" ? "Indec" : "Indeco"}
            <span className={cn("text-light_brownish group-hover:text-dark_brownish hoverEffect", spanDesign)}>{design === "small" ? "o" : "VietNam"}</span>
        </h2>
    </Link>
  )
  ;
};

export default Logo;

import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { socailLinks } from "@/constants/data";
import { cn } from "@/constants/utils";
import Link from "next/link";
import Image from "next/image";

interface SocialMediaProps {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const SocialMedia = ({className, iconClassName, tooltipClassName} : SocialMediaProps) => {
  return (
    <TooltipProvider delayDuration={500}>
        <div className={cn("flex items-center gap-3.5", className)}>
            {socailLinks?.map((item) => (
                <Tooltip key={item?.title}>
                    <TooltipTrigger asChild>
                        <Link
                            href={item?.href}
                            key={item?.title}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("",iconClassName)}
                        >
                            <Image src={item?.icon} alt={item?.title} width={20} height={20} className="w-10 h-10 hover:scale-110 hoverEffect" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className={cn(" ", tooltipClassName)}>
                        {item?.title}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    </TooltipProvider>
  );
};

export default SocialMedia;

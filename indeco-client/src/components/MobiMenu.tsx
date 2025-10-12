"use client";
import { AlignLeft } from "lucide-react";
import React, { useState } from "react";
import SideMenu from "./SideMenu";

const MobiMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <button onClick={() => setIsOpen(true)} className="md:hidden">
            <AlignLeft className="md:hidden hover:text-darkColor hover:cursor-pointer hoverEffect" />
        </button>
        <div className="md:hidden">
            <SideMenu 
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
        </>
    );
};

export default MobiMenu;

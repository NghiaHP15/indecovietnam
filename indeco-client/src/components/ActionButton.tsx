"use client";

import { ic_mess, ic_phone, ic_sms } from "@/images";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const ActionButton = () => {
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const onScroll = () => {
          setVisible(window.scrollY > 300) // hiện khi cuộn > 300px
        }
        if (typeof window !== 'undefined') onScroll()

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    if (!visible) return null

    return (
        <>
            <div>
                <div
                    title="Liên hệ Messenger"
                    className={`
                        fixed right-5 ${show ? 'bottom-65' : 'bottom-20'} z-50
                        flex items-center justify-center
                        w-11 h-11 rounded-lg
                        ${show && 'shadow-lg ring-1 ring-black/10'}
                        backdrop-blur-sm
                        hover:scale-110 active:scale-95
                        bg-white/90 dark:bg-gray-900/80
                        transition-all duration-300
                    `}
                >
                    <a target="_blank" href="https://www.facebook.com/messages/t/591659854040788?locale=vi_VN">
                        <Image src={ic_mess.src} width={60} height={60} alt="Messenger" className="w-6 h-6"/>
                    </a>
                </div>
                <div
                    title="Liên hệ Phone"
                    className={`
                        fixed right-5 ${show ? 'bottom-50' : 'bottom-20'} z-50
                        flex items-center justify-center
                        w-11 h-11 rounded-lg
                        ${show && 'shadow-lg ring-1 ring-black/10'}
                        backdrop-blur-sm
                        hover:scale-110 active:scale-95
                        bg-white/90 dark:bg-gray-900/80
                        transition-all duration-300
                    `}
                >
                    <a target="_blank" href="tel:0328494998">
                        <Image src={ic_phone.src} width={60} height={60} alt="Phone" className="w-6 h-6"/>
                    </a>
                </div>
                <div
                    title="Liên hệ SMS"
                    className={`
                        fixed right-5 ${show ? 'bottom-35' : 'bottom-20'} z-50
                        flex items-center justify-center
                        w-11 h-11 rounded-lg
                        ${show && 'shadow-lg ring-1 ring-black/10'}
                        backdrop-blur-sm
                        hover:scale-110 active:scale-95
                        bg-white/90 dark:bg-gray-900/80
                        transition-all duration-300
                    `}
                >
                    <a target="_blank" href="sms:0328494998">
                        <Image src={ic_sms.src} width={60} height={60} alt="SMS" className="w-6 h-6"/>
                    </a>
                </div>
            </div>
            <button 
                onClick={() => setShow(!show)}
                title="Liên hệ"
                className="
                    fixed right-5 bottom-20 z-50
                    flex items-center justify-center
                    w-11 h-11 rounded-lg
                    shadow-lg ring-1 ring-black/10
                    backdrop-blur-sm
                    hover:scale-110 active:scale-95 transition-transform
                    bg-white/90 dark:bg-gray-900/80
                "
            >
                <Ellipsis className="w-5 h-5 text-light_brownish!" />
            </button>
        </>
    );
};

export default ActionButton;

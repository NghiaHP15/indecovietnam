'use client';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "./ui/progress";
import { getAllGallery } from "@/services/galleryService";
import { TypeGallery } from "@/constants/enum";
import { Gallery } from "@/constants/types";
import Link from "next/link";

const HomeSlider = () => {
    const [mounted, setMounted] = useState(false);
    const [data, setData] = useState<Gallery[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const slideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            startAutoSlide();
            return () => stopAutoSlide();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        // reset lại mỗi khi currentIndex thay đổi
        stopAutoSlide();
        startAutoSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const fetchData = async () => {
        try {
            const res = await getAllGallery({ params: { type: TypeGallery.SLIDER } });
            if(res.data.success){
                setData(res.data.data);
                setMounted(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const startAutoSlide = useCallback(() => {
        stopAutoSlide(); // clear nếu đã có
        intervalRef.current = setInterval(() => {
            handleNext();
        }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const stopAutoSlide = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);

    const handleNext = useCallback(() => {
        if (data.length > 0){
            const list = slideRef.current?.querySelectorAll('.item');
            if (list && list.length > 0) {
            slideRef.current?.appendChild(list[0]);
            setCurrentIndex((prev) => (prev + 1) % data.length);
            }
        };
    },[data]);

    const handlePrev = useCallback(() => {
        const list = slideRef.current?.querySelectorAll('.item');
        if (list && list.length > 0) {
        slideRef.current?.prepend(list[list.length - 1]);
        setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
        }
    },[data]);

    if (!mounted) return null; 

    return (
        <div className="relative overflow-hidden" suppressHydrationWarning>
            <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                ref={slideRef} className="slider w-full h-[100vh]"
            >
                {data.map((item, index) => (
                    <div
                        key={index} 
                        className="item w-[200px] h-[300px] rounded-xl"
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }} 
                    >
                        <div className="content relative z-2 flex flex-col gap-2 h-full justify-end p-4 text-white">
                            <span className="top border-b border-white w-3"></span>
                            <span className="name text-sm tracking-tighter text-shadow-lg">Lối sống hiện đại với Indeco VietNam</span>
                            <h3 className="title text-xl font-semibold tracking-tighter leading-[0.9] text-shadow-lg">{item.title}</h3>
                            <span className="des hidden tracking-wide leading-[1] text-shadow-lg">{item.description}</span>
                            <span className="btn hidden relative overflow-hidden py-2 mt-4 w-[100px] md:w-[170px] items-center justify-center text-sm font-semibold border rounded-3xl border-white shadow-md group">
                                <Link href={item.href || "/"} className="relative text-sm md:text-base z-10 text-white text-shadow-lg">Xem thêm</Link>
                                <div className="absolute inset-0 bg-btn_light_brownish/50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0" />
                            </span>
                        </div>
                        <div className="bg z-1 absolute rounded-xl top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                ))}
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="absolute top-[calc(70%+120px)] left-1/2 right-20 z-2 flex items-center justify-between gap-6"
            >
                <div className="flex gap-2">
                    <button onClick={handlePrev} className="p-2 h-[40px] w-[40px] border rounded-full text-white border-white hover:text-btn_dark_brownish hover:border-btn_dark_brownish hoverEffect"><ChevronLeft/></button>
                    <button onClick={handleNext} className="p-2 h-[40px] w-[40px] border rounded-full text-white border-white hover:text-btn_dark_brownish hover:border-btn_dark_brownish hoverEffect"><ChevronRight/></button>
                </div>
                <div className="w-full">
                    <Progress value={((currentIndex + 1) / data.length) * 100} className="[&>div]:bg-white bg-white/10 h-1" />
                </div>
                <div className="text-4xl text-white font-medium underline-offset-4 relative">
                    <span>0</span>
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-x-5.5"
                        >
                            {String(currentIndex + 1)}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default HomeSlider;

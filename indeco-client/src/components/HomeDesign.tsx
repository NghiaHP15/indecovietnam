"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Image from 'next/image'
import { cn } from "@/constants/utils";
import { AnimatePresence, motion } from "motion/react";
import { Title } from "./ui/text";
import { Gallery } from "@/constants/types";
import { getAllGallery } from "@/services/galleryService";
import { TypeGallery } from "@/constants/enum";


const HomeDesign = () => {
    const [data, setData] = useState<Gallery[]>([])
    const [activeIndex, setActiveIndex] = useState<number>(0)

    useEffect(() => {
        fetchData();
    }, []);

  // Auto chuyển mỗi 3s
    useEffect(() => {
        if(data.length === 0) return;
        const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % data.length)
        }, 7000)
        return () => clearInterval(interval)
    }, [data])

    const fetchData = async () => {
        try {
            const res = await getAllGallery({ params: { type: TypeGallery.DESIGN } });
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.01, 
            },
        },
    }

    const child = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

    return (
        <div className="py-10 bg-shop_light_pink/50">
            <Container>
                <div data-aos="fade-up" data-aos-delay="100">
                    <span className="text-darkColor">Sản phẩm theo yêu cầu</span>
                    <Title className="mb-6 uppercase">Thiết kế sản phẩm</Title>
                </div>
                <div className="flex flex-col md:flex-row h-[600px] md:h-[500px] gap-2" data-aos="fade-up" data-aos-delay="200">
                {data.map((slide, index) => {
                    const isActive = activeIndex === index

                    return (
                    <div
                        key={slide.id}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                        'relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700',
                        'flex-[1] md:flex-[1]',
                        {
                            'flex-[3] md:flex-[5]': isActive,
                        },
                        'h-[120px] md:h-full'
                        )}
                    >
                        <Image
                        src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4 z-10 bg-white/20 text-white backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                            0{index + 1}
                        </div>
                        {isActive && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className={`  absolute bottom-0 p-6 left-0 z-10 w-full text-white`}
                            >
                            <h2 className="text-2xl font-bold line-clamp-1">{slide.title}</h2>
                            <motion.p
                                variants={container}
                                initial="hidden"
                                animate="visible" 
                                className="text-sm mt-1 h-11 line-clamp-2 w-full flex flex-wrap"
                            >
                                {slide?.description?.split('').map((char, idx) => (
                                <motion.span key={idx} variants={child}>
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                                ))}
                            </motion.p>
                            </motion.div>
                        </AnimatePresence>
                        )}
                    </div>
                    )
                })}
                </div>
            </Container>
        </div>
    );
};

export default HomeDesign;

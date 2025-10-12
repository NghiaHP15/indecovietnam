"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import { TypeGallery } from "@/constants/enum";
import { getAllGallery } from "@/services/galleryService";
import { Gallery } from "@/constants/types";

const HomeBanner = () => {
    const [data, setData] = useState<Gallery>();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await getAllGallery({ params: { type: TypeGallery.BANNER } });
            if(res.data.success){
                setData(res.data.data.find((item: Gallery) => item.type === TypeGallery.BANNER));
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="py-10 md:py-10 bg-shop_light_pink/50">
            <Container>
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden" data-aos="fade-up">
                {/* Video từ link ngoài */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source
                    src={data?.image ||"https://res.cloudinary.com/dn1tmr9ya/video/upload/v1751769668/indeco/03._GH%E1%BA%BE_B%C3%80NH_IDC_V%E1%BA%A2I_04-VIDEO_wqfhwx.mp4"}
                    type="video/mp4"
                    />
                    Trình duyệt của bạn không hỗ trợ video.
                </video>

                <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10" />
                    <div className="relative z-20 p-10 flex items-center h-full">
                        <div className="flex flex-col text-start space-y-2 text-white">
                            <h1 className="text-xl uppercase font-bold" data-aos="fade-up" data-aos-delay="100">
                                Indeco Viet Nam <br />
                                {data?.title}
                            </h1>
                            <span data-aos="fade-up" data-aos-delay="200">{data?.description}</span>
                            <Link data-aos="fade-up" data-aos-delay="300" href={data?.href || "/product"} className="px-4 py-1 mt-4 bg-light_brownish/40 relative overflow-hidden w-max  border rounded-3xl border-white group">
                                <span className="relative text-sm md:text-base z-10 text-white text-shadow-lg">Xem thêm</span>
                                <div className="absolute inset-0 bg-btn_light_brownish transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HomeBanner;

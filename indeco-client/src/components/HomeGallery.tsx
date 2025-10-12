"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Title } from "./ui/text";
import CarouselGallery from "./CarouselGallery";
import { Gallery } from "@/constants/types";
import { TypeGallery } from "@/constants/enum";
import { getAllGallery } from "@/services/galleryService";

const HomeGallery = () => {
  const [data, setData] = useState<Gallery[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllGallery({ params: { type: TypeGallery.SOCIAL } });
      if(res.data.success){
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-10">
    <Container>
        <div data-aos="fade-up" data-aos-delay="100">
          <span className="text-darkColor">Nổi bật trên mạng xã hội</span>
          <Title className="mb-6 uppercase">Hình ảnh nổi bật</Title>
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <CarouselGallery data={data}/>
        </div>
    </Container>
    </div>
  );
};

export default HomeGallery;

"use client";
import React, { useEffect, useState } from "react";
import { Title } from "./ui/text";
import Container from "./Container";
import { RoomCategory } from "@/constants/types";
import { getAllRooms } from "@/services/roomCategoryService";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

const HomeCategories = () => {
  const [data, setData] = useState<RoomCategory[]>([]);

  useEffect(() => {
    fetchRoomCategory();
  }, []);

  const fetchRoomCategory = async () => {
    try {
      const res = await getAllRooms();
      if (res.data.success) {
        const newData = res.data.data.filter((item: RoomCategory) => item.featured === true);
        setData(newData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="py-10">
      <Container>
        <div data-aos="fade-up" data-aos-delay="100">
          <span className="text-darkColor" >Lựa chọn hàng đầu</span>
          <Title className="mb-6 uppercase" >Danh mục sản phẩm</Title>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div data-aos="fade-right" data-aos-delay="200" className='col-span-4 md:col-span-1 w-full h-[200px] md:h-[425px] rounded-lg overflow-hidden relative group'>
            <div 
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dfermor0a/image/upload/v1760680046/indecovietnam/category-product_rjf8ne.jpg')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                  className={`relative h-full w-full transition-transform duration-300 group-hover:scale-105`}
            />
            <div className="absolute z-1 bottom-0 left-0 w-full p-5 flex flex-col">
              <span className="text-lg text-btn_light_brownish uppercase font-medium">
                Sản phẩm
              </span>
              <span className="text-white">Tất cả sản phẩm nổi bật</span>
              <Link href="/product" className="flex gap-1 items-center mt-2 text-sm font-bold text-light_brownish hover:underline hoverEffect">
                <span>Xem thêm</span>
                <MoveUpRight className="text-light_brownish size-3 font-bold" />
              </Link>
            </div>
            <div className="absolute top-0 r-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent z-0"></div>
          </div>
          <div className="col-span-4 md:col-span-3">
            <div className="grid grid-cols-5 gap-6">
              <div data-aos="fade-left" data-aos-delay="200" className="col-span-5 md:col-span-2">
                <div className='w-full h-[200px] rounded-lg overflow-hidden relative group'>
                  <div 
                      style={{
                          backgroundImage: `url(${data[0]?.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                        className={`relative h-full w-full transition-transform duration-300 group-hover:scale-105`}
                  />
                  <div className="z-1 absolute top-0 left-0 w-full p-5 flex flex-col">
                    <span className="text-lg text-btn_light_brownish uppercase font-medium">
                      {data[0]?.title}
                    </span>
                    <span className="text-white w-full md:w-[150px] line-clamp-2">{data[0]?.description}</span>
                    <Link href={`/product?room=${data[0]?.slug}`} className="flex gap-1 items-center mt-2 text-sm font-bold text-light_brownish hover:underline hoverEffect">
                      <span>Xem thêm</span>
                      <MoveUpRight className="text-light_brownish size-3 font-bold" />
                    </Link>
                  </div>
                  <div className="absolute top-0 r-0 w-full h-full bg-gradient-to-r from-black/50 to-transparent z-0"></div>
                </div>
              </div>
              <div data-aos="fade-left" data-aos-delay="300" className="col-span-5 md:col-span-3">
                <div className='w-full h-[200px] rounded-lg overflow-hidden relative group'>
                  <div 
                      style={{
                          backgroundImage: `url(${data[1]?.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                        className={`relative h-full w-full transition-transform duration-300 group-hover:scale-105`}
                  />
                  <div className="z-1 absolute top-0 right-0 w-full p-5 flex flex-col items-end">
                    <span className="text-lg text-btn_light_brownish uppercase font-medium">
                      {data[1]?.title}
                    </span>
                    <span className="text-white w-full md:w-[200px] line-clamp-2 text-end">{data[1]?.description}</span>
                    <Link href={`/product?room=${data[1]?.slug}`} className="flex gap-1 items-center mt-2 text-sm font-bold text-light_brownish hover:underline hoverEffect">
                      <span>Xem thêm</span>
                      <MoveUpRight className="text-light_brownish size-3 font-bold" />
                    </Link>
                  </div>
                  <div className="absolute top-0 r-0 w-full h-full bg-gradient-to-l from-black/30 to-transparent z-0"></div>
                </div>
              </div>
              <div data-aos="fade-left" data-aos-delay="200" className="col-span-5 md:col-span-3">
                <div className='w-full h-[200px] rounded-lg overflow-hidden relative group'>
                  <div 
                      style={{
                          backgroundImage: `url(${data[2]?.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                        className={`relative h-full w-full transition-transform duration-300 group-hover:scale-105`}
                  />
                  <div className="z-1 absolute top-0 left-0 w-full p-5 flex flex-col">
                    <span className="text-lg text-btn_light_brownish uppercase font-medium">
                      {data[2]?.title}
                    </span>
                    <span className="text-white w-full md:w-[220px] line-clamp-2">{data[2]?.description}</span>
                    <Link href={`/product?room=${data[2]?.slug}`} className="flex gap-1 items-center mt-2 text-sm font-bold text-light_brownish hover:underline hoverEffect">
                      <span>Xem thêm</span>
                      <MoveUpRight className="text-light_brownish size-3 font-bold" />
                    </Link>
                  </div>
                  <div className="absolute top-0 r-0 w-full h-full bg-gradient-to-r from-black/30 to-transparent z-0"></div>
                </div>
              </div>
              <div data-aos="fade-left" data-aos-delay="300" className="col-span-5 md:col-span-2">
                <div className='w-full h-[200px] rounded-lg overflow-hidden relative group'>
                  <div 
                      style={{
                          backgroundImage: `url(${data[3]?.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                        className={`relative h-full w-full transition-transform duration-300 group-hover:scale-105`}
                  />
                  <div className="z-1 absolute top-0 right-0 w-full p-5 flex flex-col items-end">
                    <span className="text-lg text-btn_light_brownish uppercase font-medium">
                      {data[3]?.title}
                    </span>
                    <span className="text-white w-full md:w-[220px] line-clamp-2 text-end">{data[3]?.description}</span>
                    <Link href={`/product?room=${data[3]?.slug}`} className="flex gap-1 items-center mt-2 text-sm font-bold text-light_brownish hover:underline hoverEffect">
                      <span>Xem thêm</span>
                      <MoveUpRight className="text-light_brownish size-3 font-bold" />
                    </Link>
                  </div>
                  <div className="absolute top-0 r-0 w-full h-full bg-gradient-to-l from-black/50 to-transparent z-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      
    </div>
  );
};

export default HomeCategories;
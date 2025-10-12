"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LikeShare from "./LikeShare";
import { CategoryService, Service } from "@/constants/types";
import { emptyImage } from "@/images";
import Breakcrum from "./Breakcrum";
import Container from "./Container";
import SideBarCategory from "./SideBarCategory";
import { getAllServiceCategory, getAllServices, getServiceBySlug } from "@/services/serviceService";
import SideBarLatest from "./SideBarLatest";
import Loading from "./Loading";

const ServiceDetail = ({ slug }: { slug: string }) => {
    const [service, setService] = useState<Service | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [categories, setCategories] = useState<CategoryService[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
            const [serviceRes, categoriesRes, servicesRes] = await Promise.all([
                getServiceBySlug(slug),
                getAllServiceCategory(),
                getAllServices({ params: { limit: 8 } }),
            ]);

            if (serviceRes.data.success) setService(serviceRes.data.data);
            if (categoriesRes.data.success) setCategories(categoriesRes.data.data);
            if (servicesRes.data.success) setServices(servicesRes.data.data);
            } catch (err) {
            console.error(err);
            }
        };

        fetchData();
    }, [slug]);

    return (
        <>
        <Breakcrum title={service?.title || "" } description={service?.description || ""}/>
            <Container className="py-10 ">
                {!service ? (
                    <Loading/>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        <div className="col-span-4 md:col-span-3">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <Image
                                        src={service?.image || emptyImage}
                                        alt="blogImage"
                                        width={400}
                                        height={400}
                                        className="w-full h-auto object-cover rounded-[5px]"
                                    ></Image>
                                </div>
                                <div className="space-y-3">
                                    <h1 className="text-2xl text-darkColor font-bold">{service?.title}</h1>
                                    <p className="text-gray-600 text-base">{service?.description}</p>
                                    <div className="flex items-center gap-5">
                                        <div className="border-l-2 pl-2 border-gray-300 hover:text-dark_brownish hoverEffect">
                                            <Link href={`/service?category=${service?.category?.slug}`}><span>{service?.category?.title}</span></Link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {service?.body !== undefined ? (
                                        <div dangerouslySetInnerHTML={{ __html: service?.body || "" }} />
                                    ) : (
                                        <span>Đang cập nhật ...</span>
                                    )}
                                </div>
                                <div className="flex items-center flex-wrap gap-2">
                                    <span>Tags: </span>
                                    {service?.tag?.map((tag, index) => (
                                    <span key={index}>
                                        <span className="inline-block bg-gray-100 text-sm text-gray-600 rounded px-2 py-1 mr-2 hover:bg-gray-200">
                                        #{tag}
                                        </span>
                                    </span>
                                    ))}
                                </div>
                                <LikeShare url={`/service/${service?.slug}`}/>
                            </div>
                        </div>
                        <div className="col-span-4 md:col-span-1">
                            <SideBarCategory title="Danh mục dịch vụ" data={categories} />
                            <SideBarLatest title="Các dịch vụ khác" data={services} />
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};

export default ServiceDetail;

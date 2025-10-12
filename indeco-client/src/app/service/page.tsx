import ServiceView from "@/components/ServiceView";
import { CategoryService } from "@/constants/types";
import { seo_service } from "@/images";
import { getAllServiceCategory } from "@/services/serviceService";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ category?: string }>;
};
 
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await searchParams || {};

  const post = await getAllServiceCategory();

  let data = { title: "Dịch vụ của Indeco", description: "Những dịch vụ tốt nhất từ Indeco VietNam" };

  data = category && post.data?.data?.find((item: CategoryService) => item.slug === category);

  const url = category
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}?category=${category}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`;
 
  return {
    title: category ? `${data?.title} | Indeco VietNam` : `Dịch vụ của Indeco | Indeco VietNam`,
    description: category ? data?.description : "Những dịch vụ tốt nhất từ Indeco VietNam",
    keywords: [data?.title, "service", "dịch vụ", "tin tức"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: data?.title,
      description: data?.description,
      images: [{
        url: seo_service.src,
        width: 1200,
        height: 630,
        alt: data?.title,
      }],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.title,
      description: data?.description,
      images: [seo_service.src],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

const ServicePage = async ({ searchParams }: { searchParams?: Promise<{ category?: string }>}) => {

  const { category } = await searchParams || {};

  return (
    <ServiceView category={category} />
  );
};

export default ServicePage;
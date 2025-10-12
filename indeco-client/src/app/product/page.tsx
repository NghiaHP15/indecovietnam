/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductView from "@/components/ProductView";
import { seo_product } from "@/images";
import { getAllRooms } from "@/services/roomCategoryService";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ room?: string; category?: string; }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { room, category } = await searchParams || {};

  // Fetch toàn bộ rooms
  const rooms = await getAllRooms();

  // SEO mặc định
  let title = "Sản phẩm của Indeco | Indeco VietNam";
  let description = "Những bài viết tốt nhất từ Indeco VietNam";
  let image = seo_product.src;

  // Nếu có room
  const selectedRoom = room
    ? rooms.data?.data?.find((item : any) => item.slug === room)
    : null;

  // Nếu có category trong room
  let selectedCategory = null;
  if (selectedRoom && category) {
    selectedCategory = selectedRoom.productCategories.find(
      (c: any) => c.slug === category
    );
  }

  if (selectedCategory) {
    // ✅ Trường hợp có cả room & category
    title = `${selectedCategory.title} | ${selectedRoom?.title} | Indeco VietNam`;
    description = selectedRoom?.description || description;
    image = selectedRoom?.image || image;
  } else if (selectedRoom) {
    // ✅ Trường hợp chỉ có room
    title = `${selectedRoom.title} | Indeco VietNam`;
    description = selectedRoom.description || description;
    image = selectedRoom.image || image;
  } else {
    // ✅ Trường hợp không có room & category
    title = "Sản phẩm Nội thất | Indeco VietNam";
    description = "Khám phá những ý tưởng nội thất mới nhất từ Indeco VietNam";
    image = seo_product.src;
  }

  const url = category
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}?room=${room}&category=${category}`
    : room
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}?room=${room}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`;

  return {
    title,
    description,
    keywords: [title, "san pham", "product", "Indeco VietNam"],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

const ProductPage = async ({ searchParams }: { searchParams?: Promise<{ room?: string; category?: string; }>}) => {
    const { room, category } = await searchParams || {};

    return (
        <ProductView room={room} category={category}  />
    );
};

export default ProductPage;

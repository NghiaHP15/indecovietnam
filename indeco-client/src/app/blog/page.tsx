import BlogView from "@/components/BlogView";
import { CategoryBlog } from "@/constants/types";
import { seo_blog } from "@/images";
import { getAllBlogCategory } from "@/services/blogService";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ category?: string }>;
};
 
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await searchParams || {};

  const post = await getAllBlogCategory();

  let data = { title: "Bài viết của Indeco", description: "Những bài viết tốt nhất từ Indeco VietNam" };

  data = category && post.data?.data?.find((item: CategoryBlog) => item.slug === category);

  const url = category
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}?category=${category}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`;
 
  return {
    title:  category ? `${data?.title} | Indeco VietNam` : `Bài viết của Indeco | Indeco VietNam`,
    description: category ? data?.description : "Những bài viết tốt nhất từ Indeco VietNam",
    keywords: [data?.title, "blog", "tin tức"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: data?.title,
      description: data?.description,
      images: [{
        url: seo_blog.src,
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
      images: [seo_blog.src],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

const BlogPage = async ({ searchParams }: { searchParams?: Promise<{ category?: string }>}) => {

  const { category } = await searchParams || {};

  return (
    <BlogView category={category} />
  );
};

export default BlogPage;
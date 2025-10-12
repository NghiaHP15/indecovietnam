import BlogDetail from "@/components/BlogDetail";
import { getBlogBySlug } from "@/services/blogService";
import type { Metadata } from 'next'
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
 
  // fetch post information
  const post = await getBlogBySlug(slug);

  if (!post?.data?.data) {
    return {
      title: "Bài viết không tồn tại | Indeco VietNam",
      description: "Trang này không tìm thấy hoặc đã bị xoá.",
      robots: { index: false, follow: false },
    };
  }

  const { title, description, image, updated_at, created_at, author, tag } = post.data.data;

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;
 
  return {
    title: `${title} | Indeco VietNam`,
    description,
    keywords: [title, "blog", "tin tức", ...tag],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      images: [{
        url: image || "/default-og.png",
        width: 1200,
        height: 630,
        alt: title,
      }],
      locale: "vi_VN",
      type: "article",
      authors: author.fullname, 
      publishedTime: created_at,
      modifiedTime: updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || "/default-og.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

const BlogPage = async ({ params}: {params: Promise<{ slug: string }>}) => {

    const { slug } = await params;

    return (
        <>
           <BlogDetail slug={slug} />
        </>
    );
};

export default BlogPage;

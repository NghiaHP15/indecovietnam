import Breakcrum from "@/components/Breakcrum";
import Container from "@/components/Container";
import { seo_policy } from "@/images";
import { getPolicyBySlug } from "@/services/policyService";
import type { Metadata } from 'next'
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
 
  // fetch post information
  const post = await getPolicyBySlug(slug);

  if (!post?.data?.data) {
    return {
      title: "Chính sách không tồn tại | Indeco VietNam",
      description: "Trang này không tìm thấy hoặc đã bị xoá.",
      robots: { index: false, follow: false },
    };
  }

  const { title } = post.data.data;

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/policy/${slug}`;
 
  return {
    title: `${title} | Indeco VietNam`,
    description: "Thông tin chính sách của Indeco Vietnam",
    keywords: [title, "policy", "chính sách", "bảo hành", "tin tức"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: "Thông tin chính sách của Indeco Vietnam",
      images: [{
        url: seo_policy.src,
        width: 1200,
        height: 630,
        alt: title,
      }],
      locale: "vi_VN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Thông tin chính sách của Indeco Vietnam",
      images: [seo_policy.src],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

const PolicyPage = async ({ params}: {params: Promise<{ slug: string }>}) => {

    const { slug } = await params;

    const policy = await getPolicyBySlug(slug);

    return (
        <>
           <Breakcrum title={policy.data.data?.title || ""} description={"Thông tin chính sách của Indeco Vietnam"}/>
           <Container>
            <div className="py-10">
                {policy.data.data?.description !== undefined ? (
                    <div dangerouslySetInnerHTML={{ __html: policy.data.data?.description || "" }} />
                ) : (
                    <span>Đang cập nhật ...</span>
                )}
            </div>
           </Container>
        </>
    );
};

export default PolicyPage;

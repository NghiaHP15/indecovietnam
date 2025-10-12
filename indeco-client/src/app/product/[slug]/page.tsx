import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductBySlug } from "@/services/productService";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Gọi API lấy chi tiết sản phẩm
  const product = await getProductBySlug(slug);

  if (!product?.data?.data) {
    return {
      title: "Sản phẩm không tồn tại | Indeco VietNam",
      description: "Trang này không tìm thấy hoặc đã bị xoá.",
      robots: { index: false, follow: false },
    };
  }

  const { name, description, image } = product?.data?.data;
  console.log(product);
  

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/product/${slug}`;
  const imageSeo = image;

  return {
    title: `${name} | Indeco VietNam`,
    description: description?.slice(0, 160) || `Tìm hiểu chi tiết về ${name} tại Indeco VietNam.`,
    keywords: [name, "sản phẩm nội thất", "Indeco VietNam"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: name,
      description,
      url,
      siteName: "Indeco VietNam",
      images: [
        {
          url: imageSeo,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
      locale: "vi_VN",
      type: "website", // khác blog -> product
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [imageSeo],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const ProductDetailPage =  async ({ params }: {params: Promise<{ roomslug: string; categoryslug: string; slug: string }>}) => {
  const { slug } = await params;

  return <ProductDetailClient slug={slug} />;
};

export default ProductDetailPage;

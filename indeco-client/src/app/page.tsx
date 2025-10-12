import HomeBanner from "@/components/HomeBanner";
import HomeBlog from "@/components/HomeBlog";
import HomeCategories from "@/components/HomeCategory";
import HomeDesign from "@/components/HomeDesign";
import HomeGallery from "@/components/HomeGallery";
import HomeProduct from "@/components/HomeProduct";
import Slider from "@/components/HomeSlider";
import { ProductStatus } from "@/constants/enum";
import { seo_home } from "@/images";
import Script from "next/script";

export const metadata = {
  title: "Indeco Việt Nam | Nội thất cao cấp, hiện đại và bền vững",
  description:
    "Indeco Việt Nam – thương hiệu nội thất cao cấp, mang đến giải pháp không gian sống tinh tế, hiện đại. Khám phá sofa, bàn ghế, giường tủ và nhiều sản phẩm chất lượng.",
  keywords: [
    "Indeco Việt Nam",
    "nội thất cao cấp",
    "nội thất phòng khách",
    "nội thất phòng ngủ",
    "thiết kế nội thất hiện đại",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
  openGraph: {
    title: "Indeco Việt Nam | Nội thất cao cấp",
    description:
      "Khám phá bộ sưu tập nội thất cao cấp của Indeco – Sofa, bàn ghế, giường tủ và giải pháp không gian sống hiện đại.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: "Indeco Việt Nam",
    images: [
      {
        url: seo_home.src,
        width: 1200,
        height: 630,
        alt: "Indeco Việt Nam - Nội thất cao cấp",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const Home = () => {

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}`,
        "name": "Indeco Việt Nam",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "name": "Indeco Việt Nam",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}`,
        "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61576607768367&locale=vi_VN",
          "https://www.instagram.com/indeco.vietnam/",
          "https://www.tiktok.com/@indeco_vietnam"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+84 32-8494-998",
          "contactType": "customer service",
          "areaServed": "VN",
          "availableLanguage": ["Vietnamese", "English"],
        },
      },
      {
        "@type": "WebPage",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}`,
        "name": "Indeco Việt Nam | Nội thất cao cấp",
        "description":
          "Indeco Việt Nam – thương hiệu nội thất cao cấp, mang đến giải pháp không gian sống tinh tế, hiện đại.",
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": `${process.env.NEXT_PUBLIC_SITE_URL}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <Script
          id="home-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Slider/>
      <HomeCategories />
      <HomeBanner/>
      <HomeProduct type={ProductStatus.NEW}/>
      <HomeProduct type={ProductStatus.HOT}/>
      <HomeProduct type={ProductStatus.SALE}/>
      <HomeDesign/>
      <HomeBlog/>
      <HomeGallery/>
    </>
  );
}
export default Home;

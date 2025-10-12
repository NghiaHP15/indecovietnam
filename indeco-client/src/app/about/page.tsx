import Breakcrum from "@/components/Breakcrum";
import Container from "@/components/Container";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import React from "react";

export const metadata = {
    title: "Giới thiệu về Indeco Việt Nam | Nội thất cao cấp",
    description:
      "Indeco Việt Nam – thương hiệu nội thất cao cấp, mang đến các sản phẩm hiện đại, tinh tế và bền vững. Khám phá câu chuyện, sứ mệnh và giá trị cốt lõi của chúng tôi.",
    keywords: [
      "Indeco Việt Nam",
      "giới thiệu Indeco",
      "nội thất cao cấp",
      "sứ mệnh Indeco",
      "giới thiệu công ty nội thất"
    ],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    },
    openGraph: {
      title: "Giới thiệu Indeco Việt Nam",
      description:
        "Tìm hiểu về Indeco Việt Nam – thương hiệu nội thất cao cấp với sứ mệnh mang đến không gian sống tinh tế.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
      siteName: "Indeco Việt Nam",
      images: [
        {
          url: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751925096/indeco/about_cuw3do.jpg",
          width: 1200,
          height: 630,
          alt: "Giới thiệu Indeco Việt Nam",
        },
      ],
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
}

const AboutUs = () => {

    const schema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Giới thiệu Indeco Việt Nam",
        "description": "Indeco Việt Nam – thương hiệu nội thất cao cấp, mang đến không gian sống tinh tế, hiện đại và bền vững.",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
        "mainEntity": {
        "@type": "Organization",
        "name": "Indeco Việt Nam",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}`,
        "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
        "sameAs": [
            "https://www.facebook.com/profile.php?id=61576607768367&locale=vi_VN",
            "https://www.instagram.com/indeco.vietnam/",
            "https://www.tiktok.com/@indeco_vietnam"
        ],
        "foundingDate": "2025",
        "founders": [
            {
            "@type": "Person",
            "name": "Pham Luong Thinh"
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hải Phòng",
            "addressLocality": "Hải Phòng",
            "addressRegion": "HP",
            "postalCode": "04000",
            "addressCountry": "VN"
        }
        }
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": `${process.env.NEXT_PUBLIC_SITE_URL}`
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Về chúng tôi",
            "item": `${process.env.NEXT_PUBLIC_SITE_URL}/about`
        },
        ]
    };

    return (
        <>
        <div
            style={{
                backgroundImage: `url(${"https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751922004/indeco/tbn5_szfy3z.jpg"})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
            className="relative"
        >
            <div className="bg-white/70">
                <Breakcrum title="Về Indeco Việt Nam" description="Giới thiệu về chúng tôi" />
                <Container>
                    <div className="py-10">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                            <div className="col-span-2 space-y-10" data-aos="fade-right" data-aos-delay="100">
                                <h2 className="text-2xl font-medium uppercase">Giới thiệu <span className="text-light_brownish">IndecoVietNam</span></h2>
                                <p className="text-lightColor">
                                    INDECO VIETNAM là thương hiệu nội thất hiện đại hàng đầu, mang sứ mệnh kiến
                                    tạo không gian sống tinh tế, tiện nghi và đậm chất cá nhân cho mọi gia đình
                                    Việt. <br /><br />
                                    Với phương châm `&quot;`Hiện đại trong từng chi tiết - Tinh tế trong từng không
                                    gian`&quot;`, Chúng tôi không ngừng đổi mới thiết kế, cải tiến công nghệ và nâng
                                    cao chất lượng sản phẩm.<br /><br />
                                    Mang đến giải pháp nội thất toàn diện, từ thiết kế đến thi công – với chất lượng vượt trội, thiết kế sáng tạo và dịch vụ tận tâm – góp phần nâng tầm trải nghiệm sống cho mọi khách hàng.
                                </p>
                            </div>
                            <div className="col-span-3 flex justify-end" data-aos="fade-left" data-aos-delay="100">
                                <div className="relative z-0">
                                    <Image
                                        src={"https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751925096/indeco/about_cuw3do.jpg"}
                                        alt=""
                                        width={350}
                                        height={350}
                                        className="w-auto h-full object-cover z-10 hover:scale-95 transition-all duration-300 relative"
                                    >
                                    </Image>
                                    <div className="absolute top-10 left-[-40px] w-full h-full border border-gray-100 z-0"></div>
                                    <div className="bg-gray-100 w-max h-[80px] px-8 flex items-center justify-center absolute z-20 right-[40px] bottom-[-40px]">
                                        <span className="text-base uppercase">Indeco <span className="text-light_brownish">VietNam</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                backgroundImage: `url(${"https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751926860/indeco/FBI_BLADESMAN_06-scaled_gok9ki.jpg"})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                // backgroundAttachment: 'fixed',
                            }}
                            data-aos="fade-up" data-aos-delay="200"
                            className="relative h-[200px] md:h-[400px] w-full mt-20 mb-10"
                        >
                        </div>
                        <div className="flex items-center justify-center" data-aos="fade-up" data-aos-delay="300">
                            <span className="text-lightColor">
                                Trở thành thương hiệu nội thất hiện đại được yêu thích hàng đầu tại Việt Nam và khu vực, tiên phong trong xu hướng thiết kế nội thất tối giản, thông minh và bền vững.
                            </span>
                        </div>
                        <div className="pt-10 pb-0 md:pt-15 md:pb-10">
                            <div className="grid md:grid-cols-2 gap-10 items-center">
                                {/* Left content */}
                                <div className="space-y-6" data-aos="fade-right" data-aos-delay="100">
                                    <div>
                                        <p className="text-sm font-medium text-dark_brownish tracking-wide uppercase">
                                        Sứ mệnh và tầm nhìn của chúng tôi
                                        </p>
                                        <h2 className="text-xl md:text-2xl font-medium mt-2">
                                        <span className="text-light_brownish">INDECO VIETNAM</span> mang đến <br /> giải pháp nội thất toàn diện
                                        </h2>
                                        <p className="text-gray-600 mt-4 leading-relaxed">
                                        Chúng tôi hướng tới việc tạo ra những món đồ nội thất rời vừa thẩm mỹ, vừa tiện ích, vừa khác biệt – để mỗi khách hàng có thể thể hiện phong cách riêng và kiến tạo không gian sống đẳng cấp mà không cần đầu tư quá lớn
                                        </p>
                                    </div>

                                    {/* Feature 1 */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-full bg-[#b65c41]/10 flex items-center justify-center">
                                        <CheckCircle2 className="text-[#b65c41]" size={20} />
                                        </div>
                                        <div>
                                        <h3 className="font-semibold">Sứ mệnh</h3>
                                        <p className="text-gray-600 mt-1">
                                            NDECO VIETNAM mang sứ mệnh kiến tạo không gian sống hiện đại, tinh tế và đậm dấu ấn cá nhân cho mỗi gia đình Việt. Với phương châm &apos; Hiện đại trong từng chi tiết – Tinh tế trong từng không gian &apos;, chúng tôi không ngừng đổi mới thiết kế, ứng dụng công nghệ tiên tiến và nâng cao chất lượng sản phẩm.
                                        </p>
                                        </div>
                                    </div>

                                    {/* Feature 2 */}
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-10 h-10 rounded-full bg-[#b65c41]/10 flex items-center justify-center">
                                            <CheckCircle2 className="text-[#b65c41]" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Tầm nhìn</h3>
                                            <p className="text-gray-600 mt-1">
                                                Trở thành thương hiệu nội thất hàng đầu Việt Nam trong lĩnh vực thiết kế và sản xuất nội thất hiện đại, tiên phong ứng dụng công nghệ – vật liệu mới, đồng thời hướng tới thị trường quốc tế với những sản phẩm sáng tạo, chất lượng và thân thiện với môi trường.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right image */}
                                <div className="flex justify-end" data-aos="fade-left" data-aos-delay="100">
                                    <div className="relative z-0">
                                        <Image
                                            src="https://res.cloudinary.com/dfermor0a/image/upload/v1757791803/abou-indeco_yrpr1u.jpg"
                                            alt="Indeco VietNam"
                                            height={500}
                                            width={500}
                                            className="w-auto h-full object-cover z-10 hover:scale-95 transition-all duration-300 relative"
                                        />
                                        <div className="hidden md:block absolute top-[-20px] bottom-[-20px] left-[-20px] right-[20px] border border-light_brownish z-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
        <Script
            id="about-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Script
            id="jsonld-breadcrumb"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        </>
    );
};

export default AboutUs;

import Breakcrum from "@/components/Breakcrum";
import Container from "@/components/Container";
import SocialMedia from "@/components/SocialMedia";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Script from "next/script";
import FormFeedback from "@/components/FormFeedback";
import FeedbackResponse from "@/components/Feedback";

export const metadata = {
    title: "Liên hệ Indeco Việt Nam | Nội thất cao cấp",
    description:
      "Liên hệ ngay với Indeco Việt Nam để được tư vấn thiết kế, báo giá sản phẩm nội thất cao cấp và hỗ trợ khách hàng nhanh chóng.",
    keywords: [
      "Liên hệ Indeco",
      "Indeco Việt Nam",
      "nội thất cao cấp",
      "báo giá nội thất",
      "hỗ trợ khách hàng Indeco"
    ],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    },
    openGraph: {
      title: "Liên hệ Indeco Việt Nam",
      description:
        "Kết nối với Indeco Việt Nam – thương hiệu nội thất cao cấp. Gọi ngay hoặc gửi email để được hỗ trợ nhanh nhất.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
      siteName: "Indeco Việt Nam",
      images: [
        {
          url: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751925096/indeco/about_cuw3do.jpg",
          width: 1200,
          height: 630,
          alt: "Liên hệ Indeco Việt Nam",
        },
      ],
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
}

const ContactPage = () => {

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Liên hệ Indeco Việt Nam",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Indeco Việt Nam",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}`,
      "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+84 32-8494-998",
          "contactType": "customer service",
          "areaServed": "VN",
          "availableLanguage": ["Vietnamese", "English"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Hải Phòng",
        "addressLocality": "Hải Phòng",
        "addressRegion": "HP",
        "postalCode": "04000",
        "addressCountry": "VN"
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61576607768367&locale=vi_VN",
        "https://www.instagram.com/indeco.vietnam/",
        "https://www.tiktok.com/@indeco_vietnam"
      ]
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
        "name": "Liên hệ",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL}/contact`
    },
    ]
  };

  const faqItems = [
    {
      id: "item-1",
      question: "Indeco VietNam cung cấp những dịch vụ nào?",
      answer:
        "Chúng tôi cung cấp dịch vụ thiết kế và thi công nội thất trọn gói, đáp ứng nhu cầu không gian sống và làm việc của khách hàng.",
    },
    {
      id: "item-2",
      question: "Thời gian thi công nội thất mất bao lâu?",
      answer:
        "Thời gian thi công phụ thuộc vào quy mô và yêu cầu chi tiết của từng dự án.",
    },
    {
      id: "item-3",
      question: "Indeco VietNam có hỗ trợ thiết kế theo yêu cầu không?",
      answer:
        "Có, chúng tôi cung cấp dịch vụ thiết kế riêng theo yêu cầu của khách hàng, đảm bảo tối ưu công năng và phù hợp với sở thích cá nhân.",
    },
    {
      id: "item-4",
      question: "Chính sách bảo hành sản phẩm như thế nào?",
      answer:
        "Sản phẩm được bảo hành theo chính sách cụ thể cho từng hạng mục. Vui lòng liên hệ trực tiếp để biết chi tiết.",
    },
  ]

  return (
    <>
    <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
    <Script
        id="jsonld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
    />
    <div
      style={{
        backgroundImage: `url("https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751922004/indeco/tbn5_szfy3z.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="relative"
    >
      <div className=" bg-white/70">
        <Breakcrum title="Liên hệ" description="Liên hệ với Indeco" />
        <Container className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Thông tin liên hệ */}
            <div data-aos="fade-right" data-aos-delay="100">
              <h1 className="text-2xl md:text-3xl font-bold uppercase">
                Liên hệ với <span className="text-light_brownish">chúng tôi</span>
              </h1>
              <div className="space-y-3 mt-4">
                <p>INDECO VIETNAM đem đến giải pháp nội thất toàn diện từ thiết kế đến thi công, với sự sáng tạo, chất lượng vượt trội và dịch vụ tận tâm – góp phần nâng tầm trải nghiệm sống của khách hàng. Hãy đặt trước hôm nay để là một trong những người đầu tiên sở hữu những thiết kế độc bản từ INDECO</p>
                <h2 className="text-dark_brownish text-lg">Thông tin liên hệ</h2>
                <div><span className="text-dark_brownish">Địa chỉ: </span><span>Thạch thất - Hà Nội</span></div>
                <div><span className="text-dark_brownish">SĐT: </span><a href="tel:+843284994998">+84 32.8494.998</a></div>
                <div><span className="text-dark_brownish">Email: </span><a href="mailto:indecovietnam.fur@gmail">indecovietnam.fur@gmail</a></div>
                <div><span className="text-dark_brownish">Giờ hoạt động: </span>T2 - T7: 10:00 AM - 7:00 PM</div>
                <SocialMedia />
              </div>
            </div>

            {/* Form liên hệ */}
            <div data-aos="fade-left" data-aos-delay="200">
              <h2 className="text-dark_brownish text-lg mb-4">Điền thông tin liên hệ</h2>
              <FormFeedback />
            </div>
          </div>
        </Container>

        {/* Feedback Carousel */}
        <div
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751920415/indeco/banner2_hx1wjw.jpg')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          className="h-[400px] w-full my-8 md:my-10 flex items-center"
        >
          <Container>
            <FeedbackResponse/>
          </Container>
        </div>

        {/* Q&A */}
        <Container className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div data-aos="fade-right" data-aos-delay="100" className="col-span-2">
              <p className="uppercase text-sm font-semibold tracking-wide text-amber-700">
                FAQ’s
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                Câu hỏi thường gặp?
              </h2>
            </div>

            {/* Left content */}
            <div data-aos="fade-right" data-aos-delay="200" className="col-span-2 md:col-span-1">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tại Indeco VietNam, chúng tôi cung cấp dịch vụ thiết kế và thi công nội
                thất trọn gói, giúp khách hàng hiện thực hóa không gian sống và làm
                việc lý tưởng. Với đội ngũ giàu kinh nghiệm, chúng tôi cam kết đảm
                bảo tiến độ, chất lượng và tính thẩm mỹ cao trong từng công trình.
                <br />
                <br />
                Bên cạnh dịch vụ thi công, Indeco VietNam còn cung cấp sản phẩm nội
                thất cao cấp, đa dạng mẫu mã, phù hợp với nhiều phong cách từ hiện
                đại, tối giản đến tân cổ điển, đáp ứng nhu cầu của mọi khách hàng.
                <br />
                <br />
                Nếu bạn có bất kỳ thắc mắc nào về quy trình thi công, chất liệu, giá
                cả hay chính sách bảo hành, hãy xem ngay phần Câu hỏi thường gặp để
                biết thêm chi tiết hoặc liên hệ với chúng tôi để được tư vấn trực
                tiếp! 🚀
              </p>
            </div>

            {/* Right FAQ accordion */}
            <div data-aos="fade-left" data-aos-delay="200" className="col-span-2 md:col-span-1">
              <Accordion type="single" collapsible className="w-full space-y-2">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="bg-white/80 border border-gray-200 rounded-lg px-4 py-2"
                  >
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="accordion-content text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container>
      </div>
    </div>
    </>
  );
};

export default ContactPage;

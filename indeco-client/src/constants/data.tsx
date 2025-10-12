import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { ContactItemData } from "./types";
import { facebook, instagram, tiktok, youtube } from "@/images";


export const productType = [
  { title: "Gadget", value: "gadget" },
  { title: "Appliances", value: "appliances" },
  { title: "Refrigerators", value: "refrigerators" },
  { title: "Others", value: "others" },
];

export const socailLinks = [
    { title: "Facebook", href: "https://www.facebook.com/profile.php?id=61576607768367", icon: facebook.src},
    { title: "Instagram", href: "https://www.instagram.com/indeco.vietnam/", icon: instagram.src },
    { title: "YouTube", href: "https://www.youtube.com", icon: youtube.src },
    { title: "TikTok", href: "https://www.tiktok.com/@indeco_vietnam", icon: tiktok.src },
]

export const contact: ContactItemData[] = [
  {
    title: "Địa chỉ",
    subtitle: "Thạch Thất, Hà Nội",
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-dark_brownish transition-colors" />
    ),
  },
  {
    title: "Liên hệ",
    subtitle: "+84 32 8494998",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:dark_brownish transition-colors" />
    ),
  },
  {
    title: "Giờ làm việc",
    subtitle: "T2 - T7: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:dark_brownish transition-colors" />
    ),
  },
  {
    title: "Email",
    subtitle: "indecovietnam.fur@gmail.com",
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:dark_brownish transition-colors" />
    ),
  },
];

export const categoryProduct = [
  {
    id: "1",
    title: "Phòng ngủ",
    href: "/product/bedroom",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751690538/indeco/1_tdi9du.png",
    items: [
      {
        title: "Giường",
        href: "/product/bedroom/bed",
        image: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2021/12/6/0/RX_HGMAG097_Nasir-06.jpg.rend.hgtvcom.616.822.85.suffix/1638822975797.webp",
      },
      {
        title: "Tủ quần áo",
        href: "/product/bedroom/wardrobe",
        image: "https://qghome.vn/wp-content/uploads/2024/08/TQA15.jpg",
      },
      {
        title: "Bàn trang điểm",
        href: "/product/bedroom/dressing-table",
        image: "https://product.hstatic.net/200000539781/product/ban-trang-diem-treo-tuong-1_bb1e1a3485d7453ea2c3787b9c85078f.png",
      },
      {
        title: "Tủ đầu giường",
        href: "/product/bedroom/nightstand",
        image: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljz2dsch3p2sd7"
      },
    ]
  },
  {
    id: "2",
    title: "Phòng khách",
    href: "/product/living-room",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751690538/indeco/2_vhomvb.jpg",
    items: [
      {
        title: "Sofa",
        href: "/product/living-room/sofa",
        image: "https://www.made4home.com.vn/wp-content/uploads/2024/08/living-room-japandi-interior-design2-2.jpg"
      },
      {
        title: "Bàn trà",
        href: "/product/living-room/coffee-table",
        image: "https://taduko.com/wp-content/uploads/2023/04/Ban-Tra-Sofa-Doi-Mat-Kinh-Gia-Da.jpg"
      },
      {
        title: "Kệ TV",
        href: "/product/living-room/tv-stand",
        image: "https://media.loveitopcdn.com/39292/anh-dai-dien-005.jpg"
      },
      {
        title: "Kệ sách",
        href: "/product/living-room/bookcase",
        image: "https://anhquanpro.vn/wp-content/uploads/2019/03/ke-sach-dung-hinh-cay.jpg"
      }
    ]
  },
  {
    id: "3",
    title: "Phòng ăn",
    href: "/product/dining-room",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751690538/indeco/3_wggau0.jpg",
    items: [
      {
        title: "Bàn ăn",
        href: "/product/dining-room/dining-table",
        image: "https://hoaphatsaigon.com/upload/sanpham/large/1158-ban-an-ba504a-1.jpg",
      },
      {
        title: "Ghế ăn",
        href: "/product/dining-room/dining-chair",
        image: "https://haydecor.com/wp-content/uploads/2022/02/Ghe-FAUTEUIL-7.jpg",
      },
      {
        title: "Tủ rượu",
        href: "/product/dining-room/wine-cabinet",
        image: "https://noithatab.net/wp-content/uploads/2023/11/tu-trung-bay-ruou-nho-gon-TTB072.png",
      },
      {
        title: "Tủ bếp",
        href: "/product/dining-room/kitchen-cabinet",
        image: "https://media.noithatcaco.vn/upanh/uploads/03-2023/og1t2d.jpg"
      }
    ]
  },
  {
    id: "4",
    title: "Phòng làm việc",
    href: "/product/office",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751690540/indeco/4_xmxq0j.png",
    items: [
      {
        title: "Bàn làm việc",
        href: "/product/office/desk",
        image: "https://noithattoz.com/wp-content/uploads/2024/07/ban-lam-viec-ikea-1m4-IKA1606.jpg",
      },
      {
        title: "Ghế văn phòng",
        href: "/product/office/office-chair",
        image: "https://ghexoayvanphong.com.vn/wp-content/uploads/2017/11/ghe-xoay-van-phong-mc10114-u2.jpg",
      },
      {
        title: "Tủ hồ sơ",
        href: "/product/office/file-cabinet",
        image: "https://toanmanh.com/wp-content/uploads/2022/09/THS421.png",
      },
      {
        title: "Kệ sách văn phòng",
        href: "/product/office/office-bookcase",
        image: "https://nicegarden.vn/upload/hinhthem/kesatvanphong8-9417.jpg"
      }
    ]
  }
]

export const dataProducts = [
  {
    id: "1e3c7901-d0ef-40b5-8bf7-67984c270001",
    name: "Ghế Sofa Cổ Điển",
    slug: "ghe-sofa-co-dien",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Kích thước: D250x S109x C77 cm /Phong cách: Contemporary Italian – thanh lịch, hiện đại /Chất liệu: Vải cao cấp phối viền da nhân tạo - Khung gỗ tự nhiên - Chân inox /Gối đi kèm: 8 gối rời, bao gồm gối tựa lưng và gối trang trí /Màu sắc: Trắng xám phối đen – hiện đại, tinh tế và dễ kết hợp",
    status: 1,
    featured: true,
    body: "updating",
    variants: [
      {
        id: "1e3c7901-d1ef-40b5-8bf7-67984c270001",
        sku: "CODE.SP01",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "small",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7901-d0ef-50b5-8bf7-67984c270001",
        sku: "CODE.SP02",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7901-d0ef-58b5-8bf7-67984c270001",
        sku: "CODE.SP03",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7901-d0ef-58b5-8bf7-67984c270201",
        sku: "CODE.SP04",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7901-d0ef-58b5-8bf7-67984c270301",
        sku: "CODE.SP05",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "small",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7902-d0ef-40b5-8bf7-67984c270002",
    name: "Bàn Ăn Gỗ Tự Nhiên",
    slug: "ban-an-go-tu-nhien",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Bàn ăn cho gia đình 6 người",
    status: 2,
    featured: false,
    body: "updating",
    variants: [
      {
        id: "3e3c7901-d1ef-40b5-8bf7-67984a270001",
        sku: "CODE.SP06",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "large",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "4e3c7901-d0ef-50a5-8bf7-67984c270001",
        sku: "CODE.SP07",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "5e3c7901-d0ef-58b5-8bf7-6a984c270001",
        sku: "CODE.SP08",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "6e3c7901-d0ef-58b5-8bf7-67984cs70201",
        sku: "CODE.SP09",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "7e3c7901-d0ef-58b5-8bf7-679s4c270301",
        sku: "CODE.SP10",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7903-d0ef-40b5-8bf7-67984c270003",
    name: "Tủ Giày Hiện Đại",
    slug: "tu-giay-hien-dai",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Tủ giày gọn gàng",
    status: 3,
    featured: true,
    body: "updating",
    variants: [
      {
        id: "8e3c7901-d1ef-40b5-8bf7-97984c270001",
        sku: "CODE.SP11",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "M",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "9e3c7901-d0ef-50b5-8bf7-6798sc270001",
        sku: "CODE.SP12",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "L",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e5c7901-d0ef-58b5-8bf7-67984cx70001",
        sku: "CODE.SP13",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "XL",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e6c7901-d0ef-58b5-8bf7-c7984c270201",
        sku: "CODE.SP14",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "L",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e7c7901-d0ef-58b5-8bf7-67984c270x01",
        sku: "CODE.SP15",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7914-d0ef-40b5-8bf7-67984c270004",
    name: "Giường Ngủ Gỗ Sồi",
    slug: "giuong-ngu-go-soi",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Giường ngủ đơn giản, chắc chắn",
    status: 1,
    featured: true,
    body: "updating",
    variants: [
      {
        id: "1e3c7901-d1ef-40bs-8bf7-67984c270001",
        sku: "CODE.SP16",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "1m",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7921-d0ef-50b5-8bf7-64984c270001",
        sku: "CODE.SP17",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "2m",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7931-d0ef-58b5-8bf7-67984c2700b1",
        sku: "CODE.SP18",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "1.5m",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7951-d0ef-58b7-8bf7-67984c270201",
        sku: "CODE.SP19",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "1m",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7991-d0ef-58b5-8bf7-67984c271301",
        sku: "CODE.SP20",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "1m",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7901-d0ef-40b5-8bf7-6b984c270001",
    name: "Ghế Sofa Cổ Điển",
    slug: "ghe-sofa-co-dien",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Ghế cho phòng khách sang trọng",
    status: 2,
    featured: true,
    body: "updating",
    variants: [
      {
        id: "1e3c7901-d1ef-40b5-8bf7-f7984c270001",
        sku: "CODE.SP01",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "large",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7901-d0ef-50b5-8bf7-6798ac270001",
        sku: "CODE.SP02",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7901-d0ef-58b5-8bf7-67a84c270001",
        sku: "CODE.SP03",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7s01-d0ef-58b5-8bf7-67984c270201",
        sku: "CODE.SP04",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7901-d0ef-58b5-8tf7-67984c270301",
        sku: "CODE.SP05",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7902-d0ef-40b5-8bf7-67984c270s02",
    name: "Bàn Ăn Gỗ Tự Nhiên",
    slug: "ban-an-go-tu-nhien",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Bàn ăn cho gia đình 6 người",
    status: 3,
    featured: false,
    body: "updating",
    variants: [
      {
        id: "3e3c7901-d1ef-40b5-8bf7-c7984c270001",
        sku: "CODE.SP06",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "large",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "4e3c7901-d0ef-50b5-8bf7-6798xc270001",
        sku: "CODE.SP07",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "5e3c7901-d0ef-58b5-8bf7-67984c271001",
        sku: "CODE.SP08",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "6e3c7901-d0ef-58b5-8bf7-67984c2c0201",
        sku: "CODE.SP09",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "7e3c7901-d0ef-58b5-3bf7-67984c270301",
        sku: "CODE.SP10",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7903-d0ef-40b5-8bf7-6s984c270003",
    name: "Tủ Giày Hiện Đại",
    slug: "tu-giay-hien-dai",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Tủ giày gọn gàng",
    status: 1,
    featured: true,
    body: "updating",
    variants: [
      {
        id: "8e3c7901-d1ef-40b5-8bf7-679841270001",
        sku: "CODE.SP11",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "large",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "9e3c7901-d0ef-50b5-8bf7-67984s270001",
        sku: "CODE.SP12",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e5c7901-d0ef-58b5-8bf7-17984c270001",
        sku: "CODE.SP13",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e6c7901-d0ef-58b5-8bf7-6798sc270201",
        sku: "CODE.SP14",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e7c7901-d0ef-58b5-8bf7-67984c370301",
        sku: "CODE.SP15",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7914-d0ef-40b5-8bf7-6798gc270004",
    name: "Giường Ngủ Gỗ Sồi",
    slug: "giuong-ngu-go-soi",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Giường ngủ đơn giản, chắc chắn",
    status: 2,
    featured: true,
    body: "updating",
    variants: [
      {
        id: "1e3c7901-d1ef-40b5-8bf7-6798cc270001",
        sku: "CODE.SP16",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "large",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7921-d0ef-50b5-8bf7-27984c270001",
        sku: "CODE.SP17",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7931-d0ef-58b5-8bf7-67984c270c01",
        sku: "CODE.SP18",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7931-d0ef-58b5-8bf7-67984c270201",
        sku: "CODE.SP19",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7991-d0ef-58b5-8bf7-67184c270301",
        sku: "CODE.SP20",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7901-d0ef-40b5-8bf7-679s4c270001",
    name: "Ghế Sofa Cổ Điển",
    slug: "ghe-sofa-co-dien",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Ghế cho phòng khách sang trọng",
    status: 3,
    featured: true,
    body: "updating",
    variants: [
      {
        id: "1e3c7901-d1ef-40b5-8bf7-67984c2d0001",
        sku: "CODE.SP01",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "large",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7901-d0ef-50b5-8bf7-v7984c270001",
        sku: "CODE.SP02",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c790a-d0ef-58b5-8bf7-67984c270001",
        sku: "CODE.SP03",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7901-d0ef-58b5-8bf7-6s984c270201",
        sku: "CODE.SP04",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7901-d0ef-58b5-8bf7-67984cd70301",
        sku: "CODE.SP05",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7902-d0ef-40b5-8bf7-67984c270f02",
    name: "Bàn Ăn Gỗ Tự Nhiên",
    slug: "ban-an-go-tu-nhien",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Bàn ăn cho gia đình 6 người",
    status: 1,
    featured: false,
    body: "updating",
    variants: [
      {
        id: "3e3c7901-d1ef-40b5-8bf7-67984c270001",
        sku: "CODE.SP06",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "large",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "4e3c7901-d0ef-50b5-8bf7-67984c270001",
        sku: "CODE.SP07",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "5e3c7901-d0ef-58b5-8bf7-67984c270001",
        sku: "CODE.SP08",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "6e3c7901-d0ef-58b5-8bf7-67984c270201",
        sku: "CODE.SP09",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "7e3c7901-d0ef-58b5-8bf7-67984c270301",
        sku: "CODE.SP10",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7903-d0ef-40b5-8bf7-67984c27t003",
    name: "Tủ Giày Hiện Đại",
    slug: "tu-giay-hien-dai",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Tủ giày gọn gàng",
    status: 2,
    featured: true,
    body: "updating",
    variants: [
      {
        id: "8e3c7901-d1ef-40b5-8bf7-67984c270001",
        sku: "CODE.SP11",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "large",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "9e3c7901-d0ef-50b5-8bf7-67984c270001",
        sku: "CODE.SP12",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e5c7901-d0ef-58b5-8bf7-67984c270001",
        sku: "CODE.SP13",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e6c7901-d0ef-58b5-8bf7-67984c270201",
        sku: "CODE.SP14",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e7c7901-d0ef-58b5-8bf7-67984c270301",
        sku: "CODE.SP15",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
  {
    id: "1e3c7914-d0ef-40b5-8bf7-67984c2700h4",
    name: "Giường Ngủ Gỗ Sồi",
    slug: "giuong-ngu-go-soi",
    image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg",
    description: "Giường ngủ đơn giản, chắc chắn",
    status: 3,
    featured: true,
    body: "updating",
    variants: [
      {
        id: "1e3c7901-d1ef-40b5-8bf7-6a984c270001",
        sku: "CODE.SP16",
        image: 'https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769696/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_02_fz0dzd.jpg',
        color: "bg-gray-100",
        size: "large",
        price: 12000000,
        show: true,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7921-d0ef-50b5-8bf7-67984c270001",
        sku: "CODE.SP17",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_01_actnfi.jpg",
        color: "bg-stone-200" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7931-d0ef-58b5-8bf7-67984c270001",
        sku: "CODE.SP18",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769695/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_03_repp7x.jpg",
        color: "bg-gray-400" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7951-d0ef-58b5-8bf7-67984c270201",
        sku: "CODE.SP19",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-neutral-900" ,
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
      {
        id: "1e3c7991-d0ef-58b5-8bf7-67984c270301",
        sku: "CODE.SP20",
        image: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751769694/indeco/01._GH%E1%BA%BE_XOAY_NHUNG_CAO_C%E1%BA%A4P_0_cnt7sy.jpg",
        color: "bg-amber-300",
        size: "large",
        price: 12000000,
        show: false,
        discount: 10,
        is_active: true,
        material: "Gỗ sồi",
        inventoryitems: 5
      },
    ],
    category: {
      title: "Phòng khách",
      slug: "living-room",
      subCategory: {
        title: "Sofa",
        slug: "sofa"
      }
    }
  },
]

export const feedbackData = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    address: "Hanoi, Vietnam",
    message: "Dịch vụ kiến trúc augue metus the nec feugiat erat hendrerit nec. Duis ve ante the lemon sanleo nec feugiat erat hendrerit necuis ve ante.",
    avatar: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751919873/indeco/1_uf43pd.jpg",
  },
  {
    id: "2",
    name: "Nguyễn Văn A",
    address: "Hanoi, Vietnam",
    message: "Dịch vụ kiến trúc augue metus the nec feugiat erat hendrerit nec. Duis ve ante the lemon sanleo nec feugiat erat hendrerit necuis ve ante.",
    avatar: "https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751919873/indeco/1_uf43pd.jpg",
  }
]

export const sizeOptions: { size: string; code: string }[] = [
  { size: "Nhỏ", code: "small" },
  { size: "Vừa", code: "medium" },
  { size: "Lớn", code: "large" },
  { size: "Tùy chỉnh", code: "custom" },
];

export const priceOptions: { title: string; value: string }[] = [
  { title: "1 Triệu - 3 Triệu", value: "1000000-3000000" },
  { title: "3 Triệu - 6 Triệu", value: "3000000-6000000" },
  { title: "6 Triệu - 9 Triệu", value: "6000000-9000000" },
  { title: "Trên 9 Triệu", value: "9000000-100000000" },
];

export const dataAddress: {id: string, receiverName: string, addressLine: string, ward: string, district: string, city: string, isDefault: boolean }[] = [
  {
    id: "1",
    receiverName: "Nguyen Van A",
    addressLine: "So 1, Nguyen Van Linh, Dong Da, Ha Noi",
    ward: "Phuong Dong Da",
    district: "Quan Dong Da",
    city: "Ha Noi",
    isDefault: true
  },
  {
    id: "2",
    receiverName: "Nguyen Van B",
    addressLine: "So 2, Nguyen Van Linh, Dong Da, Ha Noi",
    ward: "Phuong Dong Da",
    district: "Quan Dong Da",
    city: "Ha Noi",
    isDefault: false
  },
  {
    id: "3",
    receiverName: "Nguyen Van C",
    addressLine: "So 3, Nguyen Van Linh, Dong Da, Ha Noi",
    ward: "Phuong Dong Da",
    district: "Quan Dong Da",
    city: "Ha Noi",
    isDefault: false
  }
]

export const typeFeedbackOptions: { title: string; value: string }[] = [
  { title: "Liên hệ", value: "contact" },
  { title: "Thiết kế", value: "design" },
  { title: "Đánh giá", value: "feedback" },
  { title: "Khác", value: "other" },
]

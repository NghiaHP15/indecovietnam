import { OrderStatus, PaymentMethod, PaymentStatus, ProductStatus, TypeGallery } from "./enum";

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstname: string;
  lastname: string;
  avatar: string | null;
  provider: string;
}

export interface UserInfor {
  id: string;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  gender: string;
  date_of_birth: string;
  avatar: string | null;
  level: string;
}

export interface Customer {
  id: string;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  gender: string;
  date_of_birth: Date | null;
  avatar: string | null;
  level: string;
  addressese: Address[];
  orders: Order[];
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface ContactItemData {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

export interface CategoryProduct {
  id: string;
  title: string;
  description?: string;
  slug: string;
  image: string;
  roomCategory: RoomCategory;
  
}

export interface RoomCategory {
  title: string;
  description?: string;
  featured?: boolean;
  slug: string;
  image: string;
  productCategories?: CategoryProduct[];
}

export interface Color {
  id: string;
  name: string;
  code: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string | null; 
  description: string;
  status: ProductStatus 
  featured: boolean; 
  views?: number;
  min_price: number;
  max_price: number;
  body: string;
  policy: string;
  variants: ProductVariant[];
  productCategory: CategoryProduct;
}

export interface ProductVariant {
  id: string;
  sku: string;
  image: string; 
  color: {
    id: string;
    name: string;
    code: string;
  };
  size: string;
  price: number;
  discount: number;
  is_active: boolean; 
  quantity_in_stock: number;
  quantity_reserved?: number;
  quantity_selled: number;
}

export interface ProductOrder {
 name: string;
 slug: string;
}

export interface CartItem {
  product: ProductOrder;
  variant: ProductVariant;
  quantity: number;
}

export interface FavoriteItem {
  product: ProductOrder;
  variant: ProductVariant;
}

export interface OrderItem {
  id: string;
  name: string;
  slug: string;
  total_price: number;
  quantity: number;
  product_variant: ProductVariant;
}

export interface Order {
  id: string;
  txnRef: string;
  order_date: string;
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  total_amount: number;
  address: Address;
  note?: string;
  paymentmethod?: PaymentMethod;
  customer: User;
  products: OrderItem[];
}

export interface CategoryBlog {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface Blog {
  id: string,
  title: string,
  slug: string,
  image: string | null,
  description: string,
  latest_blog: boolean,
  author: {
    id: string,
    fullname: string
  },
  category: {
    id: string,
    title: string,
    slug: string
  },
  published_at: string,
  tag: string[],
  body: string | null,
}

export interface CategoryService {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface Service {
  id: string,
  title: string,
  slug: string,
  image: string | null,
  description: string,
  category: {
    id: string,
    title: string,
    slug: string
  },
  published_at: string,
  tag: string[],
  body: string | null,
}


export interface Address {
  id?: string,
  receiver_name: string,
  phone: string,
  address_line: string,
  ward: string,
  district: string,
  city: string,
  default: boolean
}

export interface Gallery {
  id: string,
  title: string,
  href?: string,
  description?: string,
  image: string,
  type: TypeGallery
}

export interface Filter {
  color: string | null;
  size: string | null;
  price: string | null;
}

export interface Payment {
  id: string,
  name: string,
  image: string,
  description: string,
  active: boolean
}

export interface Feedback {
  id?: string,
  name: string,
  avartar?: string,
  role?: string,
  email: string,
  phone: string,
  type: string,
  subject: string,
  message: string
}

export interface LocationValue {
  city: string;
  cityName: string;
  district: string;
  districtName: string;
  ward: string;
  wardName: string;
}
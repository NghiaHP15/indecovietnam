

export const enum ProductStatus {
    HOT = "hot",
    NEW = "new",
    SALE = "sale",
    DEFAULT = "",
}

export const enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipping',
    COMPLETED = 'delivered',
    CANCELLED = 'cancelled',
}

export const enum PositionMenu {
    HEADER = 'header',
    FOOTER = 'footer',
}

export const enum FooterName {
    FOOTER1 = 'footer_1',
    FOOTER2 = 'footer_2',
    FOOTER3 = 'footer_3',
    FOOTER4 = 'footer_4',
}

export const enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export const enum SettingType {
  TEXT = 'text',
  IMAGE = 'image',
  URL = 'url',
  HTML = 'html',
  JSON = 'json',
}

export const enum Level {
    SILVER = 'silver',
    GOLD = 'gold',
    VIP = 'vip',
}

export const enum Provider {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    LOCAL = 'local',
}

export const enum Status_active {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export const enum Position {
    CEO = 'ceo',
    MANAGER = 'manager',
    CSKH = 'cskh',
    STAFF = 'staff',
    OTHER = 'other',
}

export const enum StatusProduct {
    SALE = 'sale',
    NEW = 'new',
    HOT = 'hot',
    DEFAULT = 'default',
}

export const enum PaymentStatus {
    PENDING = 'pending',
    AWAITTING_CONFIRMATION = 'awaiting_confirmation',
    PAID = 'paid',
    CANCELLED = 'cancelled',
}

export const enum ProductRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export const enum ProductBatchesStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export const enum WarehouseImportStatus {
    PENDING = 'pending',
    CHECKED = 'checked',
    DEFECTIVE = 'defective',
}

export const enum CheckStatus {
    PASS = 'pass',
    FAIL = 'fail',
}

export const enum DamagereportStatus {
    OPEN = 'open',
    RESOLVED = 'resolved',
}

export const enum ShipperType {
    INTERNAL = 'internal',
    EXTERNAL = 'external',
}

export const enum ShippingStatus {
    PREPARING = 'preparing',
    SHIPPING = 'shipping',
    DELIVERED = 'delivered',
    FAILED = 'failed',
    RETURNED = 'returned',
}

export const enum DefaultPassword {
    DEFAULT_PASSWORD = '123456'
}

export const enum TypeGallery {
    SLIDER = 'slider',
    BANNER = 'banner',
    DESIGN = 'design',
    SOCIAL = 'social',
}

export const enum SortByProduct {
    NEW = 'new',
    HOT = 'hot',
    MIN_PRICE = 'min_price',
    MAX_PRICE = 'max_price',
}

export enum PaymentMethod {
    MOMO = 'momo',
    VNPAY = 'vnpay',
    BANK = 'bank'
}

export enum StatusUrl {
    SUCCESS = 'success',
    FAIL = 'fail'
}

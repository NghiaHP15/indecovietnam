-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE address (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  receiver_name character varying NOT NULL,
  address_line character varying NOT NULL,
  ward character varying NOT NULL,
  district character varying NOT NULL,
  city character varying NOT NULL,
  default boolean NOT NULL DEFAULT false,
  customerId uuid,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  phone character varying UNIQUE,
  CONSTRAINT address_pkey PRIMARY KEY (id),
  CONSTRAINT FK_dc34d382b493ade1f70e834c4d3 FOREIGN KEY (customerId) REFERENCES customer(id)
);
CREATE TABLE blog (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title character varying NOT NULL UNIQUE,
  slug character varying NOT NULL UNIQUE,
  image character varying,
  latest_blog boolean NOT NULL DEFAULT false,
  body text,
  published_at date,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  categoryId uuid,
  authorId uuid,
  description text,
  tag text NOT NULL,
  title_normalized character varying NOT NULL UNIQUE,
  CONSTRAINT blog_pkey PRIMARY KEY (id),
  CONSTRAINT FK_2585c11fedee21900a332b554a6 FOREIGN KEY (categoryId) REFERENCES blog_category(id),
  CONSTRAINT FK_a001483d5ba65dad16557cd6ddb FOREIGN KEY (authorId) REFERENCES employee(id)
);
CREATE TABLE blog_category (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title character varying NOT NULL UNIQUE,
  slug character varying NOT NULL UNIQUE,
  description text,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  title_normalized character varying NOT NULL DEFAULT ''::character varying,
  CONSTRAINT blog_category_pkey PRIMARY KEY (id)
);
CREATE TABLE color (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL UNIQUE,
  code character varying NOT NULL UNIQUE,
  CONSTRAINT color_pkey PRIMARY KEY (id)
);
CREATE TABLE customer (
  lastname character varying NOT NULL,
  phone character varying,
  password_hash character varying,
  gender USER-DEFINED NOT NULL DEFAULT 'other'::customer_gender_enum,
  date_of_birth date,
  level USER-DEFINED NOT NULL DEFAULT 'silver'::customer_level_enum,
  avatar character varying,
  provider USER-DEFINED NOT NULL DEFAULT 'local'::customer_provider_enum,
  provider_id character varying,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  email character varying NOT NULL UNIQUE,
  firstname character varying NOT NULL,
  refresh_token character varying,
  CONSTRAINT customer_pkey PRIMARY KEY (id)
);
CREATE TABLE employee (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  email character varying NOT NULL UNIQUE,
  fullname character varying NOT NULL,
  phone character varying,
  password_hash character varying NOT NULL,
  gender USER-DEFINED NOT NULL DEFAULT 'other'::employee_gender_enum,
  address character varying,
  date_of_birth date,
  status_active USER-DEFINED NOT NULL DEFAULT 'active'::employee_status_active_enum,
  avatar character varying,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  roleId uuid,
  position USER-DEFINED NOT NULL DEFAULT 'other'::employee_position_enum,
  CONSTRAINT employee_pkey PRIMARY KEY (id),
  CONSTRAINT FK_646b91cc56d9fd9760973b4980d FOREIGN KEY (roleId) REFERENCES role(id)
);
CREATE TABLE factory (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  description character varying NOT NULL,
  address character varying NOT NULL,
  contact_person character varying NOT NULL,
  email character varying NOT NULL,
  phone character varying NOT NULL,
  CONSTRAINT factory_pkey PRIMARY KEY (id)
);
CREATE TABLE feedback (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  email character varying NOT NULL,
  phone character varying NOT NULL,
  subject character varying NOT NULL,
  message text NOT NULL,
  show boolean NOT NULL DEFAULT false,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  avatar character varying,
  role character varying,
  type USER-DEFINED NOT NULL DEFAULT 'feedback'::feedback_type_enum,
  CONSTRAINT feedback_pkey PRIMARY KEY (id)
);
CREATE TABLE gallery (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title character varying NOT NULL,
  href character varying,
  desciption character varying,
  type USER-DEFINED NOT NULL DEFAULT 'social'::gallery_type_enum,
  image character varying,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT gallery_pkey PRIMARY KEY (id)
);
CREATE TABLE inventory_item (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  code character varying NOT NULL UNIQUE,
  quantity integer NOT NULL,
  available_quantity integer NOT NULL,
  location character varying NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  batcheId uuid,
  importId uuid,
  warehouseId uuid,
  CONSTRAINT inventory_item_pkey PRIMARY KEY (id),
  CONSTRAINT FK_0693c20c84df5f479893f576b5b FOREIGN KEY (importId) REFERENCES warehouse_import(id),
  CONSTRAINT FK_acc2d1fe6c461484488183d5cfd FOREIGN KEY (warehouseId) REFERENCES warehouse(id),
  CONSTRAINT FK_f90e77105a11e2415e23ab22cb3 FOREIGN KEY (batcheId) REFERENCES product_batche(id)
);
CREATE TABLE menu (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  item text NOT NULL,
  position character varying NOT NULL,
  name_normalized character varying NOT NULL DEFAULT ''::character varying,
  CONSTRAINT menu_pkey PRIMARY KEY (id)
);
CREATE TABLE notification (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  type USER-DEFINED NOT NULL DEFAULT 'order'::notification_type_enum,
  message text NOT NULL,
  isRead boolean NOT NULL DEFAULT false,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  orderId uuid UNIQUE,
  contactId uuid UNIQUE,
  CONSTRAINT notification_pkey PRIMARY KEY (id),
  CONSTRAINT FK_158290aea1aeac94f43ff5ac34b FOREIGN KEY (orderId) REFERENCES order(id),
  CONSTRAINT FK_b9b8ac2c19ebdc8250fe13394a2 FOREIGN KEY (contactId) REFERENCES feedback(id)
);
CREATE TABLE order (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  order_date timestamp without time zone NOT NULL,
  status USER-DEFINED NOT NULL DEFAULT 'pending'::order_status_enum,
  payment_status USER-DEFINED NOT NULL DEFAULT 'pending'::order_payment_status_enum,
  note character varying NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  customerId uuid,
  total_amount numeric NOT NULL,
  paymentmethod USER-DEFINED NOT NULL DEFAULT 'vnpay'::order_paymentmethod_enum,
  txnRef character varying NOT NULL UNIQUE,
  addressId uuid,
  CONSTRAINT order_pkey PRIMARY KEY (id),
  CONSTRAINT FK_124456e637cca7a415897dce659 FOREIGN KEY (customerId) REFERENCES customer(id),
  CONSTRAINT FK_73f9a47e41912876446d047d015 FOREIGN KEY (addressId) REFERENCES address(id)
);
CREATE TABLE order_detail (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  quantity integer NOT NULL,
  orderId uuid,
  productVariantId uuid,
  total_price numeric NOT NULL,
  name character varying NOT NULL,
  slug character varying NOT NULL DEFAULT ''::character varying,
  CONSTRAINT order_detail_pkey PRIMARY KEY (id),
  CONSTRAINT FK_8311004c01cea183b2ca4b001b3 FOREIGN KEY (productVariantId) REFERENCES product_variant(id),
  CONSTRAINT FK_88850b85b38a8a2ded17a1f5369 FOREIGN KEY (orderId) REFERENCES order(id)
);
CREATE TABLE paymentmethod (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL UNIQUE,
  image character varying,
  description character varying NOT NULL,
  active boolean NOT NULL DEFAULT false,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT paymentmethod_pkey PRIMARY KEY (id)
);
CREATE TABLE policy (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title character varying NOT NULL UNIQUE,
  slug character varying NOT NULL UNIQUE,
  title_normalized character varying NOT NULL DEFAULT ''::character varying,
  description text,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT policy_pkey PRIMARY KEY (id)
);
CREATE TABLE product (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL UNIQUE,
  slug character varying NOT NULL UNIQUE,
  description text,
  status USER-DEFINED NOT NULL DEFAULT 'default'::product_status_enum,
  featured boolean NOT NULL DEFAULT false,
  body text,
  image character varying,
  productCategoryId uuid,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  min_price double precision NOT NULL DEFAULT '0'::double precision,
  max_price double precision NOT NULL DEFAULT '0'::double precision,
  name_normalized character varying NOT NULL DEFAULT ''::character varying,
  views integer NOT NULL DEFAULT 0,
  policy text,
  CONSTRAINT product_pkey PRIMARY KEY (id),
  CONSTRAINT FK_618194d24a7ea86a165d7ec628e FOREIGN KEY (productCategoryId) REFERENCES product_category(id)
);
CREATE TABLE product_batche (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  code character varying NOT NULL UNIQUE,
  quantity integer NOT NULL,
  producted_date date NOT NULL,
  status USER-DEFINED NOT NULL DEFAULT 'pending'::product_batche_status_enum,
  note character varying NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  factoryId uuid,
  requestId uuid,
  CONSTRAINT product_batche_pkey PRIMARY KEY (id),
  CONSTRAINT FK_026def4f0d26ad006d21f837c91 FOREIGN KEY (factoryId) REFERENCES factory(id),
  CONSTRAINT FK_3302d03fe696215509b75be3ad0 FOREIGN KEY (requestId) REFERENCES product_request(id)
);
CREATE TABLE product_category (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title character varying NOT NULL UNIQUE,
  slug character varying NOT NULL UNIQUE,
  image character varying,
  description text,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  roomCategoryId uuid,
  title_normalized character varying NOT NULL DEFAULT ''::character varying,
  CONSTRAINT product_category_pkey PRIMARY KEY (id),
  CONSTRAINT FK_81d21429011d84ad4671c7c249b FOREIGN KEY (roomCategoryId) REFERENCES room_category(id)
);
CREATE TABLE product_request (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  code character varying NOT NULL UNIQUE,
  status USER-DEFINED NOT NULL DEFAULT 'pending'::product_request_status_enum,
  requested_date date,
  due_date date,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  factoryId uuid,
  orderId uuid,
  CONSTRAINT product_request_pkey PRIMARY KEY (id),
  CONSTRAINT FK_3d3a5cfa162ffb8c1905079f1c2 FOREIGN KEY (orderId) REFERENCES order(id),
  CONSTRAINT FK_bda022a47577baa67e52e550831 FOREIGN KEY (factoryId) REFERENCES factory(id)
);
CREATE TABLE product_variant (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  sku character varying NOT NULL UNIQUE,
  size character varying NOT NULL,
  price character varying NOT NULL,
  discount character varying NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  productId uuid,
  batchesId uuid,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  image character varying,
  colorId uuid,
  quantity_in_stock integer NOT NULL DEFAULT 0,
  quantity_reserved integer NOT NULL DEFAULT 0,
  quantity_selled integer NOT NULL DEFAULT 0,
  CONSTRAINT product_variant_pkey PRIMARY KEY (id),
  CONSTRAINT FK_740b7c25c6e9dda7cb4deff5444 FOREIGN KEY (batchesId) REFERENCES product_batche(id),
  CONSTRAINT FK_646f2685fe07002ddfff1c5cb87 FOREIGN KEY (colorId) REFERENCES color(id),
  CONSTRAINT FK_6e420052844edf3a5506d863ce6 FOREIGN KEY (productId) REFERENCES product(id)
);
CREATE TABLE qaulity_check (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  code character varying NOT NULL UNIQUE,
  status USER-DEFINED NOT NULL DEFAULT 'pass'::qaulity_check_status_enum,
  note character varying NOT NULL,
  checked_ate date NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  checkedById uuid,
  CONSTRAINT qaulity_check_pkey PRIMARY KEY (id),
  CONSTRAINT FK_07cdca811e72cdd8af55df0f598 FOREIGN KEY (checkedById) REFERENCES employee(id)
);
CREATE TABLE refresh_token (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  token character varying NOT NULL,
  expiresAt timestamp without time zone NOT NULL,
  createdAt timestamp without time zone NOT NULL DEFAULT now(),
  ip character varying,
  userAgent character varying,
  customerId uuid,
  CONSTRAINT refresh_token_pkey PRIMARY KEY (id),
  CONSTRAINT FK_0da79bf62a70a6530405ea98a62 FOREIGN KEY (customerId) REFERENCES customer(id)
);
CREATE TABLE role (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  permission text NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  description character varying,
  CONSTRAINT role_pkey PRIMARY KEY (id)
);
CREATE TABLE room_category (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title character varying NOT NULL UNIQUE,
  slug character varying NOT NULL UNIQUE,
  image character varying,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  title_normalized character varying NOT NULL DEFAULT ''::character varying,
  description text DEFAULT ''::text,
  CONSTRAINT room_category_pkey PRIMARY KEY (id)
);
CREATE TABLE service (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title character varying NOT NULL UNIQUE,
  slug character varying NOT NULL UNIQUE,
  description text,
  image character varying,
  tag text NOT NULL,
  body text,
  published_at date,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  categoryId uuid,
  title_normalized character varying NOT NULL DEFAULT ''::character varying,
  CONSTRAINT service_pkey PRIMARY KEY (id),
  CONSTRAINT FK_cb169715cbb8c74f263ba192ca8 FOREIGN KEY (categoryId) REFERENCES service_category(id)
);
CREATE TABLE service_category (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title character varying NOT NULL UNIQUE,
  slug character varying NOT NULL UNIQUE,
  description text,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  title_normalized character varying NOT NULL DEFAULT ''::character varying,
  CONSTRAINT service_category_pkey PRIMARY KEY (id)
);
CREATE TABLE shipment_detail (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  quantity integer NOT NULL,
  itemId uuid,
  variantId uuid,
  shippingId uuid,
  CONSTRAINT shipment_detail_pkey PRIMARY KEY (id),
  CONSTRAINT FK_824c720e3838698ed363ace4c68 FOREIGN KEY (variantId) REFERENCES product_variant(id),
  CONSTRAINT FK_d65448d88438e1faafdc96d5a6d FOREIGN KEY (itemId) REFERENCES inventory_item(id),
  CONSTRAINT FK_e4e549c8060faf0b4e0adaf2e59 FOREIGN KEY (shippingId) REFERENCES shipping(id)
);
CREATE TABLE shipper (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  contact character varying NOT NULL,
  type USER-DEFINED NOT NULL DEFAULT 'internal'::shipper_type_enum,
  is_active boolean NOT NULL DEFAULT true,
  CONSTRAINT shipper_pkey PRIMARY KEY (id)
);
CREATE TABLE shipping (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  code character varying NOT NULL UNIQUE,
  status USER-DEFINED NOT NULL DEFAULT 'preparing'::shipping_status_enum,
  estimated_date date NOT NULL,
  delevered_at date NOT NULL,
  note character varying NOT NULL,
  shipperId uuid,
  orderId uuid,
  CONSTRAINT shipping_pkey PRIMARY KEY (id),
  CONSTRAINT FK_91c580b175a9798453fe13d24b7 FOREIGN KEY (shipperId) REFERENCES shipper(id),
  CONSTRAINT FK_ca6a07e6f19abf7a0f2fadf62eb FOREIGN KEY (orderId) REFERENCES order(id)
);
CREATE TABLE site_setting (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  value text NOT NULL,
  group character varying NOT NULL,
  type USER-DEFINED NOT NULL DEFAULT 'text'::site_setting_type_enum,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT site_setting_pkey PRIMARY KEY (id)
);
CREATE TABLE staticspage (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  content text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  CONSTRAINT staticspage_pkey PRIMARY KEY (id)
);
CREATE TABLE warehouse (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  description character varying NOT NULL,
  address character varying NOT NULL,
  CONSTRAINT warehouse_pkey PRIMARY KEY (id)
);
CREATE TABLE warehouse_import (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  code character varying NOT NULL UNIQUE,
  import_date date NOT NULL,
  status USER-DEFINED NOT NULL DEFAULT 'pending'::warehouse_import_status_enum,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  batcheId uuid,
  warehouseId uuid,
  CONSTRAINT warehouse_import_pkey PRIMARY KEY (id),
  CONSTRAINT FK_b067cae91fbd79d9e1f67060d07 FOREIGN KEY (warehouseId) REFERENCES warehouse(id),
  CONSTRAINT FK_fddc3a7fd28147f66ffa27d729d FOREIGN KEY (batcheId) REFERENCES product_batche(id)
);
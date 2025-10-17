/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Breakcrum from "@/components/Breakcrum";
import Container from "@/components/Container";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import useStore from "../../../store";
import PriceFormatter from "@/components/PriceFormatter";
import { PaymentMethod } from "@/constants/enum";
import { emptyImage, momo, qr_bank, vnpay, zalopay } from "@/images";
import { createdOrder } from "@/services/orderService";
import provinceApi from "@/lib/provinceAPI";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { shoppingCart } from "@/images";
import NoAccess from "@/components/NoAccess";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationValue } from "@/constants/types";

const defaultLocation: LocationValue = {
  city: "",
  cityName: "",
  district: "",
  districtName: "",
  ward: "",
  wardName: "",
};

const defaultError = {
  receiver_name: "",
  phone: "",
  city: "",
  district: "",
  ward: "",
  address_line: "",
}

const Checkout = () => {
  const { user, getItemCount, getTotalPrice, getSubTotalPrice } = useStore();
  const groupedItems = useStore((state) => state.getGroupedItems());

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationValue>(defaultLocation);
  const [error, setError] = useState(defaultError);
  const [data, setData] = useState({
    order_date: new Date().toISOString(),
    note: "",
    paymentmethod: "",
    total_amount: getTotalPrice(),
    receiver_name: `${user?.firstname || ""} ${user?.lastname || ""}`,
    phone: user?.phone || "",
    address_line: "",
    customer: { id: user?.id },
    products: groupedItems.map((item) => ({
      name: item.product.name,
      slug: item.product.slug,
      quantity: item.quantity,
      product_variant: { id: item.variant.id },
    })),
  });

  useEffect(() => {
      provinceApi.get("/p/").then((res) => setProvinces(res.data));
    }, []);
  
    useEffect(() => {
      if (location.city) {
        provinceApi.get(`/p/${location.city}?depth=2`).then((res) => setDistricts(res.data.districts || []));
        setWards([]);
      }
    }, [location.city]);
  
    useEffect(() => {
      if (location.district) {
        provinceApi.get(`/d/${location.district}?depth=2`).then((res) => setWards(res.data.wards || []));
      }
    }, [location.district]);

  /** ✅ Update state */
  const handleChange = useCallback((value: string, name: string)=> {
    setData((prev) => ({ ...prev, [name]: value }))
    setError((prev) => ({ ...prev, [name]: "" }))
  },[]);

  const updateLocation = (updates: Partial<LocationValue>) => {
    setLocation({ ...location, ...updates });
  };

  const handleCheckError = useCallback(() => {
    if (!data.receiver_name) setError((prev) => ({ ...prev, receiver_name: "Chưa nhập tên người nhận" }));
    if (!data.phone) setError((prev) => ({ ...prev, phone: "Chưa có số điện thoại" }));
    if (!location.cityName) setError((prev) => ({ ...prev, city: "Chưa chọn thành phố" }));
    if (!location.districtName) setError((prev) => ({ ...prev, district: "Chưa chọn tỉnh" }));
    if (!location.wardName) setError((prev) => ({ ...prev, ward: "Chưa chọn phường" }));
    if (!data.address_line) setError((prev) => ({ ...prev, address_line: "Chưa nhập địa chỉ nhà cụ thể" }));
  },[data, location]);

  /** ✅ Handle checkout */
  const handleCheckout = useCallback(async () => {
    if (groupedItems.length === 0) return toast.error("Bạn chưa có sản phẩm trong giỏ hàng");
    if (!data.paymentmethod) return toast.error("Vui lòng chọn phương thức thanh toán");
    if(!data.receiver_name || !data.phone || !location.cityName || !location.districtName || !location.wardName || !data.address_line) return handleCheckError();

    const payload = {
      ...data,
      address: {
        receiver_name: data.receiver_name,
        phone: data.phone,
        address_line: data.address_line,
        city: location.cityName,
        district: location.districtName,
        ward: location.wardName,
      },
    };

    try {
      setLoading(true);
      const res = await createdOrder(payload);
      if (res.data.success) window.location.href = res.data.data.paymentUrl;
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  }, [data, groupedItems, location, handleCheckError]);

  if (!user ) return <NoAccess />;

  return (
    <div>
      <Breakcrum title="Thanh toán" description="Thanh toán đơn hàng" />
      <div className="py-10">
        <Container>
          {groupedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              {/* 🟢 Form thông tin giao hàng */}
              <div className="col-span-3 flex flex-col gap-4">
                <form className="grid grid-cols-3 gap-4">
                  <h2 className="text-xl col-span-3">Thông tin giao hàng</h2>
                  <div className="col-span-3">
                    <Input className={error.receiver_name ? "border-red-500" : ""} name="fullname" value={data.receiver_name || ""} onChange={(e) => handleChange(e.target.value, "receiver_name")} placeholder="Họ và tên" required/>
                    {error.receiver_name && <span className="text-red-500">{error.receiver_name}</span>}
                  </div>
                  <div className="col-span-2" >
                    <Input name="email" value={user?.email || ""} readOnly placeholder="Email" />
                  </div>
                  <div className="col-span-1">
                    <Input className={error.phone ? "border-red-500" : ""} name="phone" value={data.phone || ""} onChange={(e) => handleChange(e.target.value, "phone")} placeholder="Số điện thoại" required />
                    {error.phone && <span className="text-red-500">{error.phone}</span>}
                  </div>
                  {/* Chọn tỉnh */}
                  <div>
                    <Select
                      value={location.city}
                      onValueChange={(code) => {
                        const province = provinces.find((p) => p.code.toString() === code);
                        updateLocation({
                          city: code,
                          cityName: province?.name || "",
                          district: "",
                          districtName: "",
                          ward: "",
                          wardName: "",
                        });
                        setError((prev) => ({ ...prev, city: "" }));
                      }}
                    >
                      <SelectTrigger className={`${error.city ? "border-red-500" : "" } w-full`}>
                        <SelectValue placeholder="Chọn tỉnh / thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {provinces.map((p) => (
                            <SelectItem key={p.code} value={p.code.toString()}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {error?.city && <p className="text-red-500">{error.city}</p>}
                  </div>

                  {/* Chọn huyện */}
                  <div>
                    <Select
                      value={location.district}
                      disabled={!location.city}
                      onValueChange={(code) => {
                        const district = districts.find((d) => d.code.toString() === code);
                        updateLocation({
                          district: code,
                          districtName: district?.name || "",
                          ward: "",
                          wardName: "",
                        });
                        setError((prev) => ({ ...prev, district: "" }));
                      }}
                    >
                      <SelectTrigger className={`${error.district ? "border-red-500" : "" } w-full`}>
                        <SelectValue placeholder="Chọn quận / huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {districts.map((d) => (
                            <SelectItem key={d.code} value={d.code.toString()}>
                              {d.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {error?.district && <p className="text-red-500">{error.district}</p>}
                  </div>

                  {/* Chọn xã */}
                  <div>
                    <Select
                      value={location.ward}
                      disabled={!location.district}
                      onValueChange={(code) => {
                        const ward = wards.find((w) => w.code.toString() === code);
                        updateLocation({
                          ward: code,
                          wardName: ward?.name || "",
                        });
                        setError((prev) => ({ ...prev, ward: "" }));
                      }}
                    >
                      <SelectTrigger className={`${error.ward ? "border-red-500" : "" } w-full`}>
                        <SelectValue placeholder="Chọn xã / phường" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {wards.map((w) => (
                            <SelectItem key={w.code} value={w.code.toString()}>
                              {w.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {error?.ward && <p className="text-red-500">{error.ward}</p>}
                  </div>
                  <div className="col-span-3">
                    <Input className={error.address_line ? "border-red-500" : ""} name="address_line" value={data.address_line || ""} onChange={(e) => handleChange(e.target.value, "address_line")} placeholder="Địa chỉ cụ thể" required />
                    {error.address_line && <span className="text-red-500">{error.address_line}</span>}
                  </div>
                  <Textarea name="note" value={data.note || ""} onChange={(e) => handleChange(e.target.value, "note")} placeholder="Thông tin thêm" className="col-span-3" />
                  <Link href="/profile" className="col-span-3 text-base text-blue-400 underline underline-offset-3">Thông tin khách hàng</Link>
                </form>

                {/* 🟢 Vận chuyển */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl">Thông tin vận chuyển</h2>
                  <div className="w-full h-20 border border-gray-200 rounded-md flex items-center justify-center text-gray-400">
                    Chi phí vận chuyển sẽ được liên hệ sau.
                  </div>
                </div>

                {/* 🟢 Phương thức thanh toán */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl">Phương thức thanh toán</h2>
                  <div className="flex flex-col border border-gray-200 rounded-md p-4 gap-4">
                    {[PaymentMethod.MOMO, PaymentMethod.VNPAY, PaymentMethod.BANK].map((method) => (
                      <div key={method} className="flex items-center gap-3 border-b border-gray-200 pb-4 last:border-none">
                        <Checkbox id={method} disabled={method === PaymentMethod.MOMO || method === PaymentMethod.VNPAY} checked={method === data.paymentmethod} onCheckedChange={() => handleChange(method, "paymentmethod")} />
                        <Label htmlFor={method} className="text-darkGray text-base font-normal cursor-pointer flex items-center gap-2">
                          <Image src={method === PaymentMethod.MOMO ? momo.src : method === PaymentMethod.VNPAY ? vnpay.src : zalopay.src} width={40} height={40} alt={method} className="border border-gray-200 rounded-md" />
                          {method === PaymentMethod.BANK ? "Chuyển khoản ngân hàng" : method}
                        </Label>
                      </div>
                    ))}
                    {data.paymentmethod === PaymentMethod.BANK && (
                      <div className="flex items-center gap-6">
                        <div>
                          <Image src={qr_bank.src} alt="QR Bank" width={150} height={150} />
                        </div>
                        <div className="text-center text-darkGray pt-2">
                          <p>Số tài khoản: 0348207420</p>
                          <p>Ngân hàng: MBBank</p>
                          <p>Nội dung: Họ tên + Email + Số điện thoại</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 🟢 Thông tin đơn hàng */}
              <div className="col-span-2 flex flex-col gap-4">
                <h2 className="text-xl">Thông tin đơn hàng</h2>
                <div className="flex flex-col gap-2">
                  {groupedItems.map((item) => {
                    const itemCount = getItemCount(item.variant.id);
                    return (
                      <div key={item.variant.id} className="border-b p-2.5 flex items-center gap-4">
                        <Image src={item?.variant?.image || emptyImage.src} alt="product" width={80} height={80} className="border rounded-md object-cover" />
                        <div className="flex-1">
                          <p>{item.product.name}</p>
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 border rounded ${item.variant.color?.code}`} />
                            <span>{item.variant.size}</span>
                          </div>
                        </div>
                        <PriceFormatter amount={item.variant.price} />
                        <span className="bg-gray-400 text-white px-2 rounded-full text-xs">{itemCount}</span>
                      </div>
                    );
                  })}
                </div>

                {/* 🟢 Tổng cộng */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between"><span>Tạm tính:</span><PriceFormatter amount={getSubTotalPrice()} /></div>
                  <div className="flex justify-between"><span>Đã giảm:</span><PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} /></div>
                  <div className="flex justify-between"><span>Tổng cộng:</span><PriceFormatter amount={getTotalPrice()} /></div>
                </div>

                <div className="flex justify-between border-t pt-4">
                  <Link href="/cart" className="text-blue-400 underline">Trở lại giỏ hàng</Link>
                  <Button onClick={handleCheckout} isLoading={loading} className="bg-light_brownish text-white">Thanh toán</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 text-center">
              <Image src={shoppingCart.src} alt="Empty Cart" width={100} height={100} />
              <h2 className="text-2xl font-semibold">Giỏ hàng trống</h2>
              <p className="text-sm text-gray-500">Sản phẩm sẽ hiển thị ở đây khi bạn thêm vào giỏ.</p>
              <Button><Link href="/product">Tiếp tục mua sắm</Link></Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Checkout;

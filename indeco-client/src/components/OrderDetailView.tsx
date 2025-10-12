"use client";
import { getOrderTxnRef } from "@/services/orderService";
import React, { useEffect, useState } from "react";
import Breakcrum from "./Breakcrum";
import Container from "./Container";
import Image from "next/image";
import PriceFormatter from "./PriceFormatter";
import BadgePaymentStatus from "./BadgePaymentStatus";
import BadgeOrderStatus from "./BadgeOrderStatus";
import { Order } from "@/constants/types";
import Loading from "./Loading";
import { emptyImage } from "@/images";
import dayjs from "dayjs";
import { PaymentMethod } from "@/constants/enum";

const OrderDetailView = ({ txnRef }: {txnRef: string}) => {
    const [data, setData] = useState<Order | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if(txnRef) {
                try {
                    const res = await getOrderTxnRef(txnRef);
                    if(res.data.success) {
                        setData(res.data.data);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchData();
    },[txnRef]);

    return (
        <>
            <Breakcrum title="Đơn hàng" description="Thông tin chi tiết đơn hàng"/>
            <Container>
                {!data ? (
                    <Loading/>
                ) : (
                    <div className="py-10">
                        <div className="grid grid-cols-3 gap-10">
                            <div className="col-span-3 md:col-span-2 space-y-8">
                                <div>
                                    <div className="mb-4">
                                        <h3 className="text-lh uppercase border-l-4 border-light_brownish pl-2">Chi tiết đơn hàng</h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                        <thead className="border-b border-gray-100">
                                            <tr className="bg-gray-100/70">
                                            <th className="p-2 text-left font-medium">Mã sản phẩm</th>
                                            <th className="p-2 text-left font-medium">Tên sản phẩm</th>
                                            <th className="p-2 text-left font-medium">Hình ảnh</th>
                                            <th className="p-2 text-left font-medium md:table-cell">Số lượng</th>
                                            <th className="p-2 text-right font-medium md:table-cell">Tổng giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.products.map((item) => (
                                                <tr key={item?.id} className="border-b border-gray-100 items-center">
                                                <td className="p-2">
                                                    <span>{item?.product_variant?.sku}</span>
                                                </td>
                                                <td className="p-2">
                                                    <span>{item?.name}</span>
                                                </td>
                                                <td className="p-2">
                                                    <Image src={item?.product_variant?.image || emptyImage.src} alt="" width={100} height={100} className="w-20 h-auto rounded-[5px]" />
                                                </td>
                                                <td className="p-2 capitalize md:table-cell">
                                                    <span>{item?.quantity}</span>
                                                </td>
                                                <td className="p-2 text-right capitalize md:table-cell">
                                                    <PriceFormatter amount={item?.total_price || 0} />
                                                </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-md p-4 md:border-none md:rounded-none md:p-0">
                                    <div className="mb-4">
                                        <h3 className="text-lh uppercase border-l-4 border-light_brownish pl-2">Thông tin thanh toán</h3>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Trang thái thanh toán:</span>
                                            {data?.payment_status &&<BadgePaymentStatus status={data?.payment_status}/>}
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Tổng giá sản phẩm: </span>
                                            <PriceFormatter amount={data?.total_amount || 0} />
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Chi phí vận chuyển: </span>
                                            <PriceFormatter amount={0} />
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Tổng tiền: </span>
                                            <PriceFormatter amount={data?.total_amount || 0} className="text-xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 md:col-span-1 space-y-8">
                                <div className="border border-gray-200 rounded-md p-4">
                                    <div className="mb-4">
                                        <h3 className="text-lh uppercase border-l-4 border-light_brownish pl-2">Thông tin khách hàng</h3>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Email: </span>
                                            <span>{data?.customer?.email}</span>
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Khách hàng: </span>
                                            <span>{data?.customer?.firstname} {" "} {data?.customer?.lastname }</span>
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Người nhận: </span>
                                            <span>{data?.address?.receiver_name}</span>
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Số điện thoại: </span>
                                            <span>{data?.address?.phone}</span>
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Địa chỉ:</span>
                                            <span>{data?.address?.address_line + " - " + data?.address?.ward + " - " + data?.address?.district + " - " + data?.address?.city}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-md p-4">
                                    <div className="mb-4">
                                        <h3 className="text-lh uppercase border-l-4 border-light_brownish pl-2">Thống tin đơn hàng</h3>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Mã đơn hàng: </span>
                                            <span>{data?.txnRef}</span>
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Ngày đặt: </span>
                                            <span>{dayjs(data?.order_date).format("DD-MM-YYYY")}</span>
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span>Phương thức thanh toán: </span>
                                            <span>{data?.paymentmethod === PaymentMethod.BANK ? "Chuyển khoản ngân hàng" : data?.paymentmethod === PaymentMethod.MOMO ? "Thanh toán qua Momo" : "Thanh toán qua Vnpay"}</span>
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Phương thức vận chuyển:</span>
                                            <span>Giao hàng tận nơi</span>
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Trang thái đơn hàng:</span>
                                            {data?.status && <BadgeOrderStatus status={data?.status}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};

export default OrderDetailView;

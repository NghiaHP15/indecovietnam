"use client";

import { getOrderTxnRef } from "@/services/orderService";
import React, { useEffect, useRef, useState } from "react";
import Breakcrum from "./Breakcrum";
import Container from "./Container";
import Image from "next/image";
import PriceFormatter from "./PriceFormatter";
import BadgePaymentStatus from "./BadgePaymentStatus";
import { Order } from "@/constants/types";
import Loading from "./Loading";
import { emptyImage, logo_mbbank, qr_bank } from "@/images";
import dayjs from "dayjs";
import { PaymentMethod } from "@/constants/enum";
import Logo from "./Logo";
// import { Button } from "./ui/button";
import BadgeOrderStatus from "./BadgeOrderStatus";
import useStore from "../../store";
import NoAccess from "./NoAccess";
// import { useReactToPrint } from "react-to-print";

const OrderDetailView = ({ txnRef }: {txnRef: string}) => {
    const [data, setData] = useState<Order | null>(null);
    const invoiceRef = useRef<HTMLDivElement>(null);
    const { user } = useStore();

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

    // const handlePrint = useReactToPrint({
    //     contentRef:  invoiceRef, 
    //     pageStyle: `
    //     @page { size: A4 portrait; margin: 10mm; }
    //     @media print {
    //         body { -webkit-print-color-adjust: exact; }
    //     }
    //     `,
    // });

    return (
        <>
            <Breakcrum title="Đơn hàng" description="Thông tin chi tiết đơn hàng"/>
            <Container>
                {user?.id ?
                (<>
                <>
                {!data ? (
                    <Loading/>
                ) : (
                    <div className="py-10">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <Logo />
                            {/* <div>
                                <Button variant={"outline"} onClick={handlePrint} className="border-light_brownish text-light_brownish hover:text-dark_brownish hoverEffect" >In hoá đơn</Button>
                            </div> */}
                        </div>
                        <div ref={invoiceRef} className="mt-10 grid grid-cols-2">
                            <div className="md:col-span-1 col-span-2 pr-0 border-r-0 md:border-gray-100 md:border-r md:pr-6">
                                <div className="mb-4">
                                    <h3 className="text-base uppercase border-l-4 border-light_brownish pl-2">Thông tin khách hàng</h3>
                                </div>
                                <div className="flex flex-col gap-2 px-4">
                                    <div className="flex gap-4 items-start justify-between">
                                        <span className="whitespace-nowrap">Email: </span>
                                        <span>{data?.customer?.email}</span>
                                    </div>
                                    <div className="flex gap-4 items-start justify-between">
                                        <span className="whitespace-nowrap">Khách hàng: </span>
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
                            <div className="md:col-span-1 col-span-2 mt-6 md:mt-0 md:pl-6">
                                <div className="mb-4">
                                    <h3 className="text-base uppercase border-l-4 border-light_brownish pl-2">Thông tin cửa hàng</h3>
                                </div>
                                <div className="flex flex-col gap-2 px-4">
                                    <div className="flex gap-4 items-start justify-between">
                                        <span className="whitespace-nowrap">Cửa hàng nội thất Indeco VietNam</span>
                                    </div>
                                    <div className="flex gap-4 items-start justify-between">
                                        <span className="whitespace-nowrap">Điện thoại: </span>
                                        <a href="tel:0328494998">032 849 4998</a>
                                    </div>
                                    <div className="flex gap-4 items-start justify-between">
                                        <span className="whitespace-nowrap">Email: </span>
                                        <a href="mailto:indecovietnam.fur@gmail.com">indecovietnam.fur@gmail.com</a>
                                    </div>
                                    <div className="flex gap-4 items-start justify-between">
                                        <span className="whitespace-nowrap">Địa chỉ: </span>
                                        <span>Thạch Thất, Hà Nội</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-1 col-span-2 border-t-0 m-0 md:border-gray-100 md:border-t md:m-6"></div>
                            <div className="md:col-span-1 col-span-2 border-t-0 m-0 md:border-gray-100 md:border-t md:m-6"></div>
                            <div className="md:col-span-1 col-span-2 pr-0 border-r-0 mt-6 md:mt-0 md:pr-6 md:border-gray-100 md:border-r">
                                <div className="mb-4">
                                    <h3 className="text-base uppercase border-l-4 border-light_brownish pl-2">Hóa đơn</h3>
                                </div>
                                <div className="flex flex-col gap-2 px-4">
                                    <div className="flex gap-4 items-start justify-between">
                                        <span className="whitespace-nowrap">Mã hóa đơn: </span>
                                        <span>{data.txnRef}</span>
                                    </div>
                                    <div className="flex gap-4 items-start justify-between">
                                        <span className="whitespace-nowrap">Ngày tạo: </span>
                                        <span><span>{dayjs(data?.order_date).format("DD-MM-YYYY")}</span></span>
                                    </div>
                                    <div className="flex gap-4 items-start justify-between">
                                        <span className="whitespace-nowrap">Tổng tiền: </span>
                                        <PriceFormatter amount={data?.total_amount || 0} className="text-base text-red-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-1 col-span-2 pl-0 mt-6 md:mt-0 md:pl-6">
                                <div className="mb-4">
                                    <h3 className="text-base uppercase border-l-4 border-light_brownish pl-2">Trạng thái thanh toán</h3>
                                </div>
                                <div className="flex flex-col gap-2 px-4">
                                    <div className="flex gap-4 items-start justify-between">
                                        <span className="whitespace-nowrap">Xác nhận thanh toán: </span>
                                        {data?.payment_status &&<BadgePaymentStatus status={data?.payment_status}/>}
                                    </div>
                                    {data?.paymentmethod === PaymentMethod.BANK && (
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Xác nhận đơn hàng: </span>
                                            {data?.status &&<BadgeOrderStatus status={data?.status}/>}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {data.paymentmethod === PaymentMethod.BANK && (
                                <>
                                <div className="col-span-2 mt-6">
                                    <div className="flex flex-col md:flex-row gap-6 bg-gray-100/60 p-4 rounded-md items-start md:items-center">
                                        <Image src={qr_bank.src} alt="qr bank" width={200} height={200} className="md:w-42 md:h-42 w-full h-auto object-contain"/>
                                        <div className="flex flex-col gap-2">
                                            <Image src={logo_mbbank} alt="qr bank" width={100} height={40} />
                                            <h4 className="text-lg font-medium">MB Ngân hàng quân đội | MBBank</h4>
                                            <span className="text-base">Chủ tài khoản: Bùi Minh Nghĩa</span>
                                            <span className="text-base">Số tài khoản: 0348207420</span>
                                            <span className="text-base">Nội dung: Họ tên - Email - Số điện thoại</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 my-6">
                                    <p className="italic text-gray-600 text-sm"><span>Lưu ý: </span>Khách hàng khi thanh toán bằng chuyển khoản ngân hàng sẽ đợi 30 phút - 1 tiếng để xác nhận thoanh toán.</p>
                                </div>
                                </>
                            )}
                            <div className="col-span-2 md:col-span-2 space-y-8">
                                <div>
                                    <div className="mb-4">
                                        <h3 className="text-base uppercase border-light_brownish border-l-4 pl-2">Chi tiết đơn hàng</h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="md:w-full w-[600px] border-collapse">
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
                                            <span className="whitespace-nowrap">Tổng giá sản phẩm: </span>
                                            <PriceFormatter amount={data?.total_amount || 0} />
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Chi phí vận chuyển: </span>
                                            <PriceFormatter amount={0} />
                                        </div>
                                        <div className="flex gap-4 items-start justify-between">
                                            <span className="whitespace-nowrap">Tổng tiền: </span>
                                            <PriceFormatter amount={data?.total_amount || 0} className="text-xl text-red-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </>
                </>): 
                (<>
                    <NoAccess details="Vui lòng đăng nhập để có thông tin" />
                </>)
                }
            </Container>
        </>
    );
};

export default OrderDetailView;

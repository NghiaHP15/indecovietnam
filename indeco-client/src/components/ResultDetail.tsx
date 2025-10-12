"use client";   
import { useEffect } from "react";
import useStore from "../../store";
import { StatusUrl } from "@/constants/enum";
import Image from "next/image";
import { check, close } from "@/images";
import Link from "next/link";

const PageResultStatusDynamic = ({status, txnRef}: {status: string, txnRef: string}) => {
    const { resetCart } = useStore();

    useEffect(() => {
        if(status === StatusUrl.SUCCESS) resetCart();
    }, [resetCart, status]);

    return (
        <>
        {status === StatusUrl.SUCCESS ? (
            <div className="flex items-center justify-center py-12 md:py-32">
                <div className="flex flex-col items-center justify-center w-full max-w-md px-10 py-8 bg-white rounded-2xl shadow-xl">
                    <Image
                        src={check.src}
                        alt="check"
                        width={400}
                        height={400}
                        className="w-25 md:w-35 h-auto"
                    />
                    <h1 className="text-xl md:text-2xl font-medium text-green-700">Đặt hàng thành công</h1>
                    <span className="text-sm md:text-base text-center mt-3">Đơn hàng của quý khách đã thanh toán thành công. <br/>INDECOVIETNAM sẽ sớm liên hệ với quý khách để bàn giao sản phẩm.</span>
                    <Link href={`/order?txnRef=${txnRef}`} className="mt-6 bg-green-900 text-white px-6 py-2 rounded-xl text-lg">Thông tin đơn hàng</Link>
                </div>
            </div>
        ) : (
            <div className="flex items-center justify-center py-12 md:py-32">
                <div className="flex flex-col items-center justify-center w-full max-w-md px-10 py-8 bg-white rounded-2xl shadow-xl">
                    <Image
                        src={close.src}
                        alt="check"
                        width={400}
                        height={400}
                        className="w-25 md:w-35 h-auto"
                    />
                    <h1 className="text-xl md:text-2xl font-medium text-red-700">Thanh toán thất bại</h1>
                    <span className="text-sm md:text-base text-center mt-3">Đơn hàng của quý khách không thành công. <br/>Quý khách hãy kiểm tra lai thông tin thanh toán với INDECOVIETNAM.</span>
                    <Link href={`/checkout`} className="mt-6 bg-red-900 text-white px-6 py-2 rounded-xl text-base md:text-lg">Trở lại đơn hàng</Link>
                </div>
            </div>
        )}
        </>
    );
};

export default PageResultStatusDynamic;
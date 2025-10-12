/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaymentStatus } from "@/constants/enum";
import React from "react";

const BadgePaymentStatus = ({ status }: { status: string }) => {
    let className = "";
    let text = "";

    switch(status){
        case PaymentStatus.PENDING:
            className = "text-blue-400"
            text = "Chưa thanh toán"
            break;
        case PaymentStatus.PAID:
            className = "text-green-400"
            text = "Đã thanh toán"
            break;
        case PaymentStatus.AWAITTING_CONFIRMATION:
            className = "text-yellow-400"
            text = "Đã xác nhận"
            break;
        case PaymentStatus.CANCELLED:
            className = "text-red-400"
            text = "Hủy thanh toán"
            break;
        default:
            break;
    }
    
    return (
        <div className={`text-sm ${className}`}>{text}</div>
    );
};

export default BadgePaymentStatus;

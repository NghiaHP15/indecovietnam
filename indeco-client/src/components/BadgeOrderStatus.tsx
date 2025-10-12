/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrderStatus } from "@/constants/enum";
import React from "react";

const BadgeOrderStatus = ({ status }: { status: string }) => {
    let className = "";
    let text = "";

    switch(status){
        case OrderStatus.PENDING:
            className = "text-yellow-500"
            text = "Chờ xử lý"
            break;
        case OrderStatus.PROCESSING:
            className = "text-blue-500"
            text = "Đã nhận"
            break;
        case OrderStatus.SHIPPED:
            className = "text-orange-500"
            text = "Đang vận chuyển"
            break;
        case OrderStatus.CANCELLED:
            className = "text-red-500"
            text = "Đã hủy"
            break;
        case OrderStatus.COMPLETED:
            className = "text-green-500"
            text = "Hoàn thành"
            break;
        default:
            break;
    }
    
    return (
        <div className={`text-sm ${className}`}>{text}</div>
    );
};

export default BadgeOrderStatus;

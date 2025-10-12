import { Feedback } from "@/constants/types";
import { defautUser } from "@/images";
import Image from "next/image";
import React from "react";

const FeedBackCard = ({ data }: { data: Feedback }) => {
  return (
    <div className="p-8 space-y-6 bg-white/90 ">
        <h3 className="text-xl text-black/70 uppercase border-b pb-2 border-gray-200">Phản hồi của khách hàng</h3>
        <p className="text-lightColor">{data?.message}</p>
        <div className="flex items-center gap-4">
          <Image
            src={data?.avartar || defautUser.src}
            alt=""
            width={500}
            height={500}
            className="rounded-full w-15 h-15 object-cover"
          />
          <div className="space-y-1">
            <h4 className="text-light_brownish">{data?.name}</h4>
            <span className="text-sm text-lightColor">{data?.role || "Khách hàng"}</span>
          </div>
        </div>
    </div>
  );
};

export default FeedBackCard;

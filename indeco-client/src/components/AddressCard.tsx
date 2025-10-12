"use client";

import { Address } from "@/constants/types";
import React from "react";
import { Label } from "./ui/label"

const AddressCard = ({
  item,
}: {
  item: Address;
}) => {

  return (
    <div className="text-sm border border-gray-200 p-2 rounded-2xl relative">
      <div className="px-4 py-2 flex items-center justify-between bg-light_brownish/30 rounded-t-lg rounded-b-[2px]">
        <span className="text-darkColor font-medium">
          Người nhận: {item.receiver_name} {item.default ? "(Mặc định)" : ""}
          {item.phone ? ` - ${item.phone}` : ""}
        </span>
      </div>
      <div className="p-4 flex items-center gap-2">
        <Label htmlFor={item?.id} className="cursor-pointer font-normal text-darkColor">
          Địa chỉ: {item.address_line}, {item.ward}, {item.district}, {item.city}
        </Label>
      </div>
    </div>
  );
};

export default AddressCard;

"use client";

import Breakcrum from "@/components/Breakcrum";
import Container from "@/components/Container";
import SideInfo from "@/components/SideInfo";
import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import { getCustomerById } from "@/services/userService";
import { Address } from "@/constants/types";
import Image from "next/image";
import { emptyAddress } from "@/images";
import AddressCard from "@/components/AddressCard";
import NoAccess from "@/components/NoAccess";

const AddressPage = () => {
  const [data, setData] = useState<Address[]>([]);
  const { user } = useStore();

  const fetchUser = async (id: string) => {
    try {
      const res = await getCustomerById({ id });
      if (res.data.success) {
        setData(res.data.data.addresses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUser(user.id);
    }
  }, [user]);

  return (
    <div>
    {user ? (
        <>
        <Breakcrum title="Địa chỉ" description="Cập nhật địa chỉ" />
        <Container>
            <div className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <SideInfo />
                <div className="md:col-span-4 flex flex-col gap-4">
                <h3 className="text-lg font-medium text-darkColor">Danh sách điểm giao hàng</h3>
                {data.length > 0 ? (
                    data.map((item) => (
                    <AddressCard
                        key={item.id}
                        item={item}
                        // onChange={() => fetchUser(user?.id || "")}
                    />
                    ))
                ) : (
                    <div className="text-sm flex flex-col items-center justify-center border border-gray-200 p-4 rounded-2xl">
                    <Image
                        src={emptyAddress}
                        alt="emptyAddress"
                        width={20}
                        height={20}
                        className="w-auto h-30 object-cover hover:scale-105 transition duration-300 rounded-[2px]"
                    />
                    <span className="text-base text-gray-400">Danh sách trống</span>
                    <span className="text-gray-400">Không có địa chỉ giao hàng</span>
                    </div>
                )}
                </div>
            </div>
            </div>
      </Container>
        </>
    ): (
        <NoAccess details="Vui lòng đăng nhập để có thông tin địa chỉ" />
    )}
    </div>
  );
};

export default AddressPage;

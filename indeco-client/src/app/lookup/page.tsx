"use client";

import BadgePaymentStatus from "@/components/BadgePaymentStatus";
import Breakcrum from "@/components/Breakcrum";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import PriceFormatter from "@/components/PriceFormatter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Order } from "@/constants/types";
import { getOrderSearch } from "@/services/orderService";
import dayjs from "dayjs";
import React, { useState } from "react";

type Props = {
  name: string,
  label: string
}

const ITEMS_PER_PAGE = 5;

const Lookup = () => {
  const [type, ] = useState<Props[]>([
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: 'phone',
      label: 'Số điện thoại'
    },
  ]);
  const [param, setParam] = useState({
    type: 'email',
    value: ''
  });
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const currentData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const hanbleSubmit = async () => {
    try {
      setLoading(true);
      const res = await getOrderSearch(param);
      if(res.data.data) {
        setData(res.data.data);
        setCurrentPage(1);
      } 
    }catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
        <Breakcrum title="Tra cứu đơn hàng" description="Tra cứu thông tin đơn hàng" />
        <div className="py-5 md:py-10">
            <Container>
                <div className="grid grid-cols-3 gap-10">
                  <div className="col-span-3 md:col-span-1">
                    <div className="p-6 shadow-md rounded-md space-y-4 bg-light_brownish/10">
                      <h3>Kiểm tra đơn hàng của bạn</h3>
                      <div className="flex items-center gap-4">
                        {type.map((item, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <Checkbox 
                              id={item.name}
                              className="bg-white"
                              checked={param.type === item.name}
                              onCheckedChange={(checked) => {
                                setParam({
                                  ...param,
                                  type: checked ? item.name : ''
                                })
                              }}
                            />
                            <Label htmlFor={item.name} className="text-darkGray text-base font-normal cursor-pointer flex items-center gap-2">{item.label}</Label>
                          </div>
                        ))}
                      </div>
                      <Input 
                        placeholder="Nhập số điện thoại hoặc email người nhận"
                        className="bg-white text-base"
                        value={param.value}
                        onChange={(e) => {
                          setParam({
                            ...param,
                            value: e.target.value
                          })
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            hanbleSubmit();
                          }
                        }}
                      />
                      <div className="flex items-center justify-end">
                        <Button className="h-[30px]" onClick={hanbleSubmit}>Kiểm tra</Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    {loading ? (
                      <>
                        <Loading/>
                      </>
                    ): (
                      <div>
                        {data.length > 0 ? (
                          <div className="flex flex-col gap-4">
                          {currentData.map((item, index: number) => (
                            <div key={index} className="p-6 border border-gray-100 shadow-md rounded-md space-y-4">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-3">
                                  <span className="text-lg">Mã đơn hàng: {item.txnRef}</span>
                                </div>
                                <div className="col-span-2 flex flex-col text-base">
                                  <span>Khách hàng: {item?.address?.receiver_name}</span>
                                  <span>Số điện thoại: {item?.address?.phone}</span>
                                  <span>Email: {item?.customer?.email}</span>
                                  <span>Ngày mua: {dayjs(item?.order_date).format('DD/MM/YYYY')}</span>
                                  <span>Địa chỉ giao hàng: {item?.address?.address_line + " - " + item?.address?.ward + " - " + item?.address?.district + " - " + item?.address?.city}</span>
                                </div>
                                <div className="col-span-1 flex flex-col justify-between text-base">
                                  <div className="flex flex-col">
                                    <span>Tổng giá sản phẩm: <PriceFormatter amount={item?.total_amount} className="text-base"/></span>
                                    <span>Phí vận chuyển: <PriceFormatter amount={0} className="text-base"/></span>
                                    <span>Tổng tiền: <PriceFormatter amount={item?.total_amount} className="text-base text-red-600"/></span>
                                    <span>Số lượng sản phẩm: <span className="text-red-600">{item?.products.map((item) => item.quantity).reduce((a, b) => a + b, 0)}</span></span>
                                  <span>Trạng thái thanh toán: </span>{item?.payment_status && <BadgePaymentStatus status={item?.payment_status}/>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          </div>
                        ): (
                          <>
                            <div className="flex items-center justify-center p-5">
                              <span className="text-lg text-gray-600">Bạn chưa có đơn hàng nào.</span>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem className="cursor-pointer">
                        <PaginationPrevious
                          onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index} className="cursor-pointer">
                          <PaginationLink
                            isActive={currentPage === index + 1}
                            onClick={() => handleChangePage(index + 1)}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem className="cursor-pointer">
                        <PaginationNext
                          onClick={() =>
                            handleChangePage(Math.min(totalPages, currentPage + 1))
                          }
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </Container>
        </div>
    </>
  );
};

export default Lookup;

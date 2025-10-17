"use client";
import { CircleDollarSign, ShoppingBag, ShoppingCart } from "lucide-react";
import useStore from "../../store";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import Link from "next/link";
import Image from "next/image";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButton";
import { Button } from "./ui/button";

const Cart = () => {
  const { items, getItemCount, getTotalPrice, getSubTotalPrice, resetCart } = useStore();
  const groupedItems = useStore((state) => state.getGroupedItems());

  return (
    <>
    <Drawer direction="right">
        <DrawerTrigger>
            <span className="group relative">
                <ShoppingBag className="w-5 h-5 hover:text-text-light_brownish hoverEffect" />
                <span 
                    className="absolute -top-1 -right-1 bg-dark_brownish text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center"
                >{items?.length ? items?.length : 0}</span>
            </span>
        </DrawerTrigger>
        <DrawerContent className="p-2 md:p-5">
            <DrawerHeader className="border-b border-gray-200">
              <DrawerTitle className="w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-normal">Giỏ hàng</span> 
                      <span 
                          className="bg-dark_brownish text-white h-6 w-6 rounded-full text-sm font-semibold flex items-center justify-center"
                      >
                          {items?.reduce((total, item) => total + item.quantity, 0) || 0}
                      </span>
                    </div>
                    {items?.length !== 0 && <Button variant={"link"} className="underline" onClick={resetCart}>Xóa sản phẩm</Button>}
                  </div>
              </DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto">
                {groupedItems?.map((item ) => {
                    const itemCount = getItemCount(item?.variant?.id);
                    return (
                      <div
                        key={item?.variant?.id}
                        className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                      >
                        <div className="flex flex-1 items-start gap-2 ">
                          {item?.variant?.image && (
                            <div className="p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group" >
                              <Image
                                src={item?.variant?.image}
                                alt="productImage"
                                width={500}
                                height={500}
                                loading="lazy"
                                className="w-23 h-auto object-cover rounded-[5px] group-hover:scale-105 hoverEffect"
                              />
                            </div>
                          )}
                          <div className="h-full flex flex-1 flex-col justify-between py-1">
                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                              <h2 className="text-base line-clamp-1">
                                {item?.product.name}
                              </h2>
                              <div className="flex items-center gap-3">
                                <span className={`w-5 h-5 border border-gray-200 rounded-[5px]`} style={{ backgroundColor: item?.variant?.color?.code }}></span>
                                <span>{item?.variant?.size}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <QuantityButtons variant={item?.variant} product={item?.product} />
                                <PriceFormatter
                                  amount={(item?.variant?.price as number) * itemCount}
                                  className="text-lg font-medium"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  );
                })}
            </div>
            <DrawerFooter className="border-t border-gray-200">
              {groupedItems.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base">Tổng tiền:</span>
                    <PriceFormatter
                      amount={getSubTotalPrice()}
                      className={"text-darkColor text-lg font-medium"}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base">Giảm còn:</span>
                    <PriceFormatter
                      amount={getTotalPrice()}
                      className={"text-red-400 text-lg font-medium"}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base">Đã giảm:</span>
                    <PriceFormatter
                      amount={getSubTotalPrice() - getTotalPrice()}
                      className={"text-darkColor text-lg font-medium"}
                    />
                  </div>
                  <Link href={"/checkout"} className="px-4 py-3 relative overflow-hidden border rounded-sm border-gray-300 group">
                    <div className="relative text-sm md:text-base flex items-center justify-between z-10 text-darkColor group-hover:text-white hoverEffect"><span>Thanh toán</span> <CircleDollarSign className="w-6 h-6" /></div>
                    <div className="absolute inset-0 bg-btn_light_brownish transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0" />
                  </Link>
                  <Link href={"/cart"} className="px-4 py-3 relative overflow-hidden border rounded-sm border-gray-300 group">
                    <div className="relative text-sm md:text-base flex items-center justify-between z-10 text-darkColor group-hover:text-white hoverEffect"><span>Danh sách giỏ hàng</span> <ShoppingCart className="w-6 h-6" /></div>
                    <div className="absolute inset-0 bg-btn_light_brownish transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0" />
                  </Link>
                </div>
              )}
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
    </>
  );
};

export default Cart;

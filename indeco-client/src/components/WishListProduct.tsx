"use client";

import { useState } from "react";
import Container from "./Container";
import { Button } from "./ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import PriceFormatter from "./PriceFormatter";
import useStore from "../../store";
import { FavoriteItem } from "@/constants/types";
import Breakcrum from "./Breakcrum";
import AddToCartButton from "./AddToCartButton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import EmptyCart from "./EmptyCart";
import { X } from "lucide-react";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(7);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };

  const handleResetWishlist = () => {
    resetFavorite();
    toast.success("Wishlist reset successfully");
  };

  return (
    <>
        <Breakcrum title="Yêu thích" description="Danh sách yêu thích của bạn" />
        <Container>
            <div className="py-10">
                {favoriteProduct.length && favoriteProduct?.length > 0 ? (
                    <div className="">
                        <div className="overflow-x-auto">
                            <table className="w-[700px] md:w-full border-collapse">
                            <thead className="border-b border-gray-100">
                                <tr className="bg-black/5">
                                <th className="p-2 pl-10 font-medium text-left">Hình ảnh</th>
                                <th className="p-2 font-medium text-left">Tên sản phẩm</th>
                                <th className="p-2 font-medium text-left hidden md:table-cell">Loại</th>
                                <th className="p-2 font-medium text-left hidden md:table-cell">Trạng thái</th>
                                <th className="p-2 font-medium text-left ">Giá</th>
                                <th className="p-2 font-medium text-center md:text-left">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favoriteProduct
                                ?.slice(0, visibleProducts)
                                ?.map((item: FavoriteItem) => (
                                    <tr key={item?.variant?.id} className="border-b border-gray-100">
                                    <td className="px-2 py-4 flex items-center gap-3">
                                        <X
                                            onClick={() => {
                                                removeFromFavorite(item?.variant?.id);
                                                toast.success("Đã xóa sản phẩm!");
                                            }}
                                            size={18}
                                            className="hover:text-primary hover:cursor-pointer hoverEffect"
                                        />
                                        {item?.variant?.image && (
                                        <Link
                                            href={`/product/${item?.product.slug}`}
                                            className="rounded-md group"
                                        >
                                            <Image
                                            src={item?.variant?.image}
                                            alt={"product image"}
                                            width={80}
                                            height={80}
                                            className="rounded-md group-hover:scale-105 hoverEffect h-20 w-20 object-contain"
                                            />
                                        </Link>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        <span className="line-clamp-1">{item?.product.name}</span>
                                    </td>
                                    <td className="p-2 capitalize hidden md:table-cell">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-5 h-5 border border-gray-200 rounded-[5px]`} style={{ backgroundColor: item?.variant?.color?.code }}></span>
                                            <span>{item?.variant?.size}</span>
                                        </div>
                                    </td>
                                    <td
                                        className={`p-2 w-24 ${
                                        (item?.variant?.quantity_in_stock as number) > 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                        } font-medium text-sm hidden md:table-cell`}
                                    >
                                        {(item?.variant?.quantity_in_stock as number) > 0
                                        ? "Còn hàng"
                                        : "Hết hàng"}
                                    </td>
                                    <td className="p-2">
                                        <PriceFormatter amount={item?.variant?.price || 0} />
                                    </td>
                                    <td className="p-2">
                                        <AddToCartButton product={item?.product} variant={item?.variant} />
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                            {visibleProducts < favoriteProduct?.length && (
                            <div className="my-5">
                                <Button variant="outline" onClick={loadMore}>
                                Load More
                                </Button>
                            </div>
                            )}
                            {visibleProducts > 10 && (
                            <div className="my-5">
                                <Button
                                onClick={() => setVisibleProducts(10)}
                                variant="outline"
                                >
                                Load Less
                                </Button>
                            </div>
                            )}
                            {favoriteProduct?.length > 0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        className="my-5 font-semibold"
                                        size="lg"
                                        >
                                        Đặt lại
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Bán có muốn xóa?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Hành động này không thể hoàn tác, bán có muốn tiếp tục.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleResetWishlist}>Tiếp tục</AlertDialogAction>
                                        </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            )}
                        </div>
                    </div>
                ) : (
                    <EmptyCart/>
                )}
            </div>
        </Container>
    </>
  );
};

export default WishListProducts;
"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { Title } from "@/components/ui/text";
import QuantityButtons from "@/components/QuantityButton";
import useStore from "../../../store";
import Breakcrum from "@/components/Breakcrum";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import PriceView from "@/components/PriceView";

const CartPage = () => {
    const {
        deleteCartProduct,
        getTotalPrice,
        getItemCount,
        getSubTotalPrice,
        resetCart,
    } = useStore();
    const groupedItems = useStore((state) => state.getGroupedItems());
    const { user } = useStore();

    const handleResetCart = useCallback(() => {
        resetCart();
        toast.success("Giỏ hàng được đặt lại!");
    }, [resetCart]);

    return (
        <>
            {user ? (
            <>
                <Breakcrum title="Giỏ hàng" description="Chi tiết giỏ hàng" />
                {groupedItems?.length ? (
                <div className="py-5 md:py-10">
                    <Container>
                        <>
                        <div className="flex items-center gap-2 py-5">
                            <ShoppingBag className="text-darkColor" />
                            <Title className="text-base md:text-xl uppercase">Giỏ hàng của bạn</Title>
                        </div>
                        <div className="grid lg:grid-cols-3 md:gap-8">
                            <div className="lg:col-span-2 rounded-lg">
                            <div className="rounded-md">
                                {groupedItems?.map(({ variant, product }) => {
                                const itemCount = getItemCount(variant?.id);
                                return (
                                    <div
                                    key={variant?.id}
                                    className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                                    >
                                    <div className="flex flex-1 items-start gap-2 h-30 md:h-38">
                                        {variant?.image && (
                                        <Link
                                            href={`/product/${product.slug}`}
                                            className="p-0.5 md:p-1 mr-2
                                            overflow-hidden group"
                                        >
                                            <Image
                                            src={variant?.image}
                                            alt="productImage"
                                            width={500}
                                            height={500}
                                            loading="lazy"
                                            className="w-auto md:w-40 h-30 md:h-38 rounded-md object-cover group-hover:scale-105 hoverEffect"
                                            />
                                        </Link>
                                        )}
                                        <div className="h-full flex flex-1 flex-col justify-between py-1 gap-2 md:gap-4">
                                        <div className="flex flex-col gap-0.5 md:gap-1.5">
                                            <h2 className="text-lg line-clamp-1">
                                            {product.name}
                                            </h2>
                                            <div className="flex items-center flex-nowrap gap-2 text-base capitalize">
                                            <span>Màu: </span>
                                            <span className={`w-6 h-6 block rounded-[5px] border border-gray-300`} style={{ backgroundColor: variant.color.code }}></span>
                                            </div>
                                            <div className="flex items-center flex-nowrap gap-2 text-base capitalize">
                                            <span>Size:</span>
                                            <span className="pl-1">
                                                {variant?.size}
                                            </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                <ProductSideMenu
                                                    product={product}
                                                    variant={variant}
                                                    className="relative top-0 right-0"
                                                />
                                                </TooltipTrigger>
                                                <TooltipContent className="font-bold">
                                                Thêm yêu thích
                                                </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                <Trash
                                                    onClick={() => {
                                                    deleteCartProduct(variant?.id);
                                                    toast.success(
                                                        "Xóa thành công!"
                                                    );
                                                    }}
                                                    className="w-8 h-8 p-2 md:w-8 md:h-8 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                                />
                                                </TooltipTrigger>
                                                <TooltipContent className="font-bold">
                                                Xóa sản phẩm
                                                </TooltipContent>
                                            </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between h-30 md:h-38 p-0.5 md:p-1">
                                        <PriceView
                                            price={variant?.price * itemCount}
                                            discount={variant?.discount}
                                            className="text-base font-medium"
                                        />
                                        <QuantityButtons variant={variant} product={product} />
                                    </div>
                                </div>
                                );
                                })}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className="m-5 font-semibold"
                                            >
                                            Đặt lại
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Bạn có muốn xóa?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Hành động này không thể hoàn tác, bán có muốn tiếp tục.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleResetCart}>Tiếp tục</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                            </div>
                            <div>
                            <div className="lg:col-span-1">
                                <div className="w-full bg-white p-6 rounded-lg border">
                                    <h2 className="text-lg md:text-xl font-medium mb-4">
                                        Thông tin đơn hàng
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                        <span>Tổng phụ</span>
                                        <PriceFormatter amount={getSubTotalPrice()} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                        <span>Giảm giá</span>
                                        <PriceFormatter
                                            amount={getSubTotalPrice() - getTotalPrice()}
                                        />
                                        </div>
                                        {/* <Separator /> */}
                                        <div className="flex items-center justify-between font-medium text-lg">
                                        <span>Tổng tiền</span>
                                        <PriceFormatter
                                            amount={getTotalPrice()}
                                            className="text-lg font-medium text-black"
                                        />
                                        </div>
                                        <div className="flex items-center justify-center mt-4">
                                            <Link
                                                className="w-max rounded-xl text-base font-medium tracking-wide bg-light_brownish hover:bg-light_brownish/80 py-2 px-4 text-white hoverEffect"
                                                href="/checkout"
                                            >
                                                Tiến hành thanh toán
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </>
                    </Container>
                </div>
                    ) : (
                        <EmptyCart />
                    )}
            </>
            ) : (
                <NoAccess />
            )}
        </>
    );
};

export default CartPage;
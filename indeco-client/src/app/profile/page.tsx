"use client";
import Breakcrum from "@/components/Breakcrum";
import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useCallback, useEffect, useState } from "react";
import useStore from "../../../store";
import { Customer, Order } from "@/constants/types";
import { getUserByEmail, updateCustomer } from "@/services/userService";
import { Button } from "@/components/ui/button";
import SideInfo from "@/components/SideInfo";
import NoAccess from "@/components/NoAccess";
import dayjs from "dayjs";
import BadgeOrderStatus from "@/components/BadgeOrderStatus";
import BadgePaymentStatus from "@/components/BadgePaymentStatus";
import PriceFormatter from "@/components/PriceFormatter";
import {EyeIcon, ListOrdered } from "lucide-react";
import Loading from "@/components/Loading";
import DatePicker from "@/components/DatePicker";
import Image from "next/image";
import { cancelOrder, getAllOrder, retryOrder } from "@/services/orderService";
import Link from "next/link";
import { PaymentMethod, PaymentStatus } from "@/constants/enum";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { momo, vnpay, zalopay } from "@/images";

const defaultUser = {
    id: "",
    email: "",
    phone: "",
    firstname: "",
    lastname: "",
    gender: "male",
    date_of_birth: null,
    avatar: "",
    level: "",
    addressese: [],
    orders: [],
}

const ITEMS_PER_PAGE = 5;

const Profile = () => {
    const [data, setData] = useState<Customer>(defaultUser);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [loadpayment, setLoadingPayment] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { user, setItem } = useStore();
    const router = useRouter();
    const [payment, setPayment] = useState<PaymentMethod>(PaymentMethod.BANK);

    // 📌 Hàm fetch data chung
    const fetchUserAndOrders = useCallback(async (email: string, id: string) => {
        try {
        const [userRes, orderRes] = await Promise.all([
            getUserByEmail({ email }),
            getAllOrder({ customer: id, limit: 100 }),
        ]);

        if (userRes.data.success) setData(userRes.data.data);
        if (orderRes.data.success) {
            setOrders(orderRes.data.data);
            setCurrentPage(1);
        }
        } catch (err) {
        console.error("Fetch error:", err);
        }
    }, []);

    // 📌 Chỉ gọi API khi có user
    useEffect(() => {
        if (user?.email) {
        fetchUserAndOrders(user.email, user.id);
        }
    }, [user, fetchUserAndOrders]);

    // 📌 Handler thay đổi input
    const handleChange = useCallback((value: string, name: string) => {
        setData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleChangePaymentMethod = useCallback((value: string) => {
        setPayment(value as PaymentMethod);
    }, []);

    // 📌 Submit form update user
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
        const res = await updateCustomer({ data, id: data.id });
        if (res.data.success) {
            setData(res.data.data);
            toast.success("Update successfully");
        }
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    // 📌 Pagination
    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
    const currentOrder = orders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleChangePage = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleReorder = useCallback((order: Order) => {
        const newCartItems = order.products.map((item) => ({
            product: {
                name: item.name,
                slug: item.slug,
            },
            quantity: item.quantity,
            variant: item.product_variant,
        }));
        setItem(newCartItems);
        router.push("/cart");
    }, [setItem, router]);

    const handleCancelOrder = useCallback(async (order: Order) => {
        try {
            setLoadingCancel(true);
            const res = await cancelOrder(order.id);
            if (res.data.success) {
                fetchUserAndOrders(user?.email || "", user?.id || "");
                toast.success("Đơn hàng đã được hủy");

            }
        } catch (err) {
            console.error("Cancel order error:", err);
        } finally {
            setLoadingCancel(false);
        }
    }, [fetchUserAndOrders, user]);

    const handleRetryPayment = useCallback(async (order: Order) => {
        try {
            setLoadingPayment(true);
            const res = await retryOrder(order.id, { paymentmethod: payment });
            if (res.data.success) window.location.href = res.data.data.paymentUrl;
        } catch (err) {
            console.error("Retry payment error:", err);
        } finally {
            setLoadingPayment(false);
        }
    }, [payment]);

    return (
        <div>
            {user?.id ? (
                <>
                <Breakcrum title="Trang cá nhân" description="Thông tin tài khoản cá nhân" />
                <Container>
                    <div className="py-10">
                        <div className="grid grid-cols-1 md:grid-cols-5">
                            <SideInfo/>
                            {!data?.id ? (
                                <div className="col-span-4 md:col-span-4">
                                    <Loading/>
                                </div>
                            ) : (
                                <div className="col-span-4 md:col-span-4 mt-6 md:mt-0">
                                    <h3 className="text-lg font-medium text-darkColor">Thông tin tài khoản</h3>
                                    <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                                        <div className="flex gap-2">
                                            <Label htmlFor="email" className="w-25">Email :</Label>
                                            <Input 
                                                id="email" 
                                                name="email" 
                                                required 
                                                type="text" 
                                                placeholder="Email" 
                                                className="w-full md:w-80"
                                                value={data.email}
                                                onChange={(e) => handleChange(e.target.value, "email")}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Label htmlFor="phone" className="w-25">Số điện thoại :</Label>
                                            <Input 
                                                id="phone" 
                                                name="phone" 
                                                required type="text" 
                                                placeholder="Số điện thoại" 
                                                className="w-full md:w-80" 
                                                value={data.phone || ""}
                                                onChange={(e) => handleChange(e.target.value, "phone")}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Label htmlFor="firstName" className="w-25">Họ :</Label>
                                            <Input 
                                                id="firstName" 
                                                name="firtName" 
                                                required 
                                                type="text" 
                                                placeholder="Họ" 
                                                className="w-full md:w-80" 
                                                value={data.firstname}
                                                onChange={(e) => handleChange(e.target.value, "firstname")}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Label htmlFor="lastName" className="w-25">Tên :</Label>
                                            <Input 
                                                id="lastName" 
                                                name="lastName" 
                                                required 
                                                type="text" 
                                                placeholder="Tên" 
                                                className="w-full md:w-80" 
                                                value={data.lastname}
                                                onChange={(e) => handleChange(e.target.value, "lastname")}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Label htmlFor="dateOfBirth" className="w-25">Ngày sinh :</Label>
                                            <DatePicker className="w-full md:w-80" value={data.date_of_birth} onChange={(date) => handleChange(new Date(date).toISOString(), "date_of_birth")} />
                                        </div>
                                        <div className="flex gap-2">
                                            <Label htmlFor="lastName" className="w-25">Giới tính :</Label>
                                            <RadioGroup name="gender" value={data.gender} className="flex gap-2" onValueChange={(value) => handleChange(value, "gender")}>
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem value="male" defaultChecked id="male" />
                                                    <Label htmlFor="male" className="cursor-pointer font-normal">Nam</Label>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem value="famale" id="female" />
                                                    <Label htmlFor="female" className="cursor-pointer font-normal">Nữ</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        <Button className="py-2 px-4 bg-light_brownish w-40 text-white rounded-[2px] hover:bg-dark_brownish hoverEffect" type="submit" isLoading={loading}>Cập nhật</Button>
                                    </form>
                                    <div className="flex flex-col gap-4 mt-8">
                                        <div className="flex items-center gap-3">
                                            <ListOrdered className="text-light_brownish"/>
                                            <h2>Danh sách đơn hàng của bạn</h2>
                                        </div>
                                         {orders?.length <= 0 ? (
                                            <div className="mt-4 p-4 bg-gray-100">
                                                <span className="text-lightColor">Bạn chưa có đơn hàng nào</span>
                                            </div>
                                         ) : (
                                            <>
                                            {currentOrder.map((item) => (
                                            <div key={item?.txnRef} className="border border-gray-200 p-4 rounded-md mb-4">
                                                <div className="flex items-center justify-between flex-wrap gap-2 border-b-1 border-gray-200 pb-2">
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <span>Mã đơn hàng: </span>
                                                        <span>{item?.txnRef}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <div className="flex items-center gap-2">
                                                            <span>Đơn hàng: </span> 
                                                            {item?.status && <BadgeOrderStatus status={item?.status} />}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span>Thanh toán: </span> 
                                                            {item?.payment_status && <BadgePaymentStatus status={item?.payment_status} />}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="my-3">
                                                    {item?.products?.map((item, index) => (
                                                        <div key={index} className="flex items-center justify-between gap-3 mt-2">
                                                            <div className="flex items-center gap-2">
                                                                <Image src={item?.product_variant?.image} alt={item?.name} width={50} height={50} className="w-20 h-auto rounded-md" />
                                                                <div className="flex flex-col gap-1">
                                                                    <span>{item?.name}</span>
                                                                    <span className={`${item?.product_variant?.color?.code} w-5 h-4 rounded-[2px]`}></span>
                                                                    <span className="text-sm text-gray-500">Số lượng x{item?.quantity}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <PriceFormatter amount={item?.product_variant?.price} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between flex-wrap gap-2 border-t-1 border-gray-200 pt-2">
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <span>Ngày đặt hàng: </span>
                                                        <span>{dayjs(item?.order_date).tz("Asia/Ho_Chi_Minh").format("hh:mm DD/MM/YYYY")}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <div>
                                                            <Link href={`/order?txnRef=${item?.txnRef}`} className="px-3 h-8 rounded-md flex items-center justify-end border-1 border-blue-400 text-blue-400 hover:bg-blue-400/10 hoverEffect">
                                                                <EyeIcon className="h-4 text-blue-400" />
                                                                Xem đơn hàng
                                                            </Link>
                                                        </div>
                                                        {
                                                            (item?.payment_status && ![PaymentStatus.PAID, PaymentStatus.AWAITTING_CONFIRMATION, PaymentStatus.CANCELLED].includes(item.payment_status)) &&
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button isLoading={loadingCancel} size={"sm"} variant="destructive" className="px-3 h-8 text-light_brownish bg-transparent border-light_brownish border-1 hover:bg-light_brownish/10 horverEffect">Hủy đơn hàng</Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Bạn có muốn hủy đơn hàng?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Hành động này không thể hoàn tác, bán có muốn tiếp tục.
                                                                        </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleCancelOrder(item)}>Tiếp tục</AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        }
                                                        {
                                                            (item?.payment_status && ![PaymentStatus.PAID, PaymentStatus.AWAITTING_CONFIRMATION, PaymentStatus.CANCELLED].includes(item.payment_status)) && 
                                                            <Button onClick={() => handleReorder(item)} size={"sm"} variant="default" className="px-3 h-8 text-light_brownish bg-transparent border-light_brownish border-1 hover:bg-light_brownish/10 horverEffect">Mua lại</Button>
                                                        }
                                                        {
                                                            (item?.payment_status && ![PaymentStatus.PAID, PaymentStatus.AWAITTING_CONFIRMATION, PaymentStatus.CANCELLED].includes(item.payment_status)) &&
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button isLoading={loadingCancel} size={"sm"} variant="destructive" className="px-3 h-8 border-blue-400 text-blue-400 bg-transparent border-1 hover:bg-blue-400/10 horverEffect">Thanh toán</Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Phương thức thanh toán?</AlertDialogTitle>
                                                                        <AlertDialogDescription asChild>
                                                                            <div className="flex flex-col gap-4">
                                                                                <div className="flex flex-col border border-gray-200 rounded-md p-4 gap-4">
                                                                                    {[PaymentMethod.MOMO, PaymentMethod.VNPAY, PaymentMethod.BANK].map((method) => (
                                                                                    <div key={method} className="flex items-center gap-3 border-b border-gray-200 pb-4 last:border-none">
                                                                                        <Checkbox id={method} checked={method === payment} onCheckedChange={() => handleChangePaymentMethod(method)} />
                                                                                        <Label htmlFor={method} className="text-darkGray text-base font-normal cursor-pointer flex items-center gap-2">
                                                                                        <Image src={method === PaymentMethod.MOMO ? momo.src : method === PaymentMethod.VNPAY ? vnpay.src : zalopay.src} width={40} height={40} alt={method} className="border border-gray-200 rounded-md" />
                                                                                        {method === PaymentMethod.BANK ? "Chuyển khoản ngân hàng" : method}
                                                                                        </Label>
                                                                                    </div>
                                                                                    ))}
                                                                                    {item.paymentmethod === PaymentMethod.BANK && (
                                                                                    <div className="text-center text-darkGray pt-2">
                                                                                        <p>Số tài khoản: 123456789</p>
                                                                                        <p>Ngân hàng: Teckcombank</p>
                                                                                        <p>Nội dung: Họ tên + Số điện thoại</p>
                                                                                    </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                                        <AlertDialogAction asChild>
                                                                            <Button onClick={() => handleRetryPayment(item)} isLoading={loadpayment} className="bg-light_brownish text-white">Thanh toán</Button>
                                                                        </AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        }   
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                            </>
                                         ) }
                                    </div>
                                    {totalPages > 1 && (
                                        <div className="mt-10 flex justify-center cursor-pointer">
                                        <Pagination>
                                            <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                                />
                                            </PaginationItem>

                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <PaginationItem key={index}>
                                                <PaginationLink
                                                    isActive={currentPage === index + 1}
                                                    onClick={() => handleChangePage(index + 1)}
                                                >
                                                    {index + 1}
                                                </PaginationLink>
                                                </PaginationItem>
                                            ))}

                                            <PaginationItem>
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
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
                </>
            ) : (
                <NoAccess details="Vui lòng đăng nhập để có thông tin" />
            )}
        </div>
    );
};

export default Profile;

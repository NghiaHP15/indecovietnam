/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum OrderApi {
  getOrderTxnRef = "/order/txnref",
  order = "/order",
  retry = "/order/retry",
  cancel = "/order/cancel",
  orderSearch = "order/search/order"
}

const getOrderTxnRef = async ( params: string) => await APIClient.get({ url: `${OrderApi.getOrderTxnRef}/${params}` });
const createdOrder = async ( data: any = {} ) => await APIClient.post({ url: OrderApi.order, data });
const getAllOrder = async ( params: any) => await APIClient.get({ url: `${OrderApi.order}`, params });
const cancelOrder = async ( orderId: string ) => await APIClient.put({ url: `${OrderApi.cancel}/${orderId}`, data: {} });
const retryOrder = async ( orderId: string, data: any ) => await APIClient.put({ url: `${OrderApi.retry}/${orderId}`, data });
const getOrderSearch = async ( params: any) => await APIClient.get({ url: `${OrderApi.orderSearch}`, params });

export { 
    getOrderTxnRef,
    createdOrder,
    getAllOrder,
    cancelOrder,
    retryOrder,
    getOrderSearch
}
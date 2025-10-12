import apiClient from "../apiClient";

export enum OrderApi {
  internalOrder = '/order',
}

const internalOrders = async (data: any = {}) => await apiClient.get({ url: `${OrderApi.internalOrder}/admin-get-all`, params: data })
const getOrder = async (id: string) => await apiClient.get({ url: `${OrderApi.internalOrder}/admin-get/${id}` })
const createOrder = async (data: any = {}) => await apiClient.post({ url: `${OrderApi.internalOrder}/admin-create`, data })
const updateOrder = async (id: string, data: any = {}) => await apiClient.put({ url: `${OrderApi.internalOrder}/admin-update/${id}`, data: data})
const deleteOrder = async (id: string) => await apiClient.delete({ url: `${OrderApi.internalOrder}/admin-cancel/${id}`})

export {
  internalOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder
};

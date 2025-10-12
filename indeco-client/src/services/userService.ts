/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum CustomerApi {
  getAllCustomers = "/customer",
  getUserByEmail = "/customer/email",
  updateCustomer = "/customer",
  getUserById = "/customer",
}

const getAllCustomers = async () => await APIClient.get({ url: CustomerApi.getAllCustomers });
const getCustomerById = async ({ id }: { id: string}) => await APIClient.get({ url: `${CustomerApi.getUserById}/${id}` });
const getUserByEmail = async ({ email }: { email: string}) => await APIClient.get({ url: `${CustomerApi.getUserByEmail}/${email}` });
const updateCustomer = async ({ data, id}: { data: any, id: string }) => await APIClient.put({ url: `${CustomerApi.updateCustomer}/${id}`, data });

export { 
    getAllCustomers,
    getUserByEmail,
    updateCustomer,
    getCustomerById
}
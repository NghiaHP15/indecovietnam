/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum AddressApi {
  createAddress = "/address",
  updateAddress = "/address",
  deleteAddress = "/address",
}

const createAddress = async ( data: any = {} ) => await APIClient.post({ url: AddressApi.createAddress, data });
const updateAddress = async ({ data, id }: { data: any, id: string} ) => await APIClient.put({ url: `${AddressApi.updateAddress}/${id}`, data });
const deleteAddress = async ( data: any = {} ) => await APIClient.delete({ url: `${AddressApi.deleteAddress}/${data.id}` });

export { 
    createAddress,
    updateAddress,
    deleteAddress
}
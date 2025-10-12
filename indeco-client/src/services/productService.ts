/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum ProductApi {
  getAllProduct = "/product",
}

const getAllProducts = async ({ params }: { params: any}) => await APIClient.get({ url: ProductApi.getAllProduct, params });
const getProductBySlug = async (slug: string) => await APIClient.get({ url: `${ProductApi.getAllProduct}/slug/${slug}` });
const getViews = async (id: string) => await APIClient.get({ url: `${ProductApi.getAllProduct}/view/${id}` });

export { 
    getAllProducts,
    getProductBySlug,
    getViews
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum ServiceApi {
  getBlog = "/service",
  getCategoryBlog = "/service-category",
}

const getAllServices = async ({ params }: { params?: any }) => await APIClient.get({ url: ServiceApi.getBlog, params });
const getServiceBySlug = async (slug: string) => await APIClient.get({ url: `${ServiceApi.getBlog}/slug/${slug}` });
const getAllServiceCategory = async () => await APIClient.get({ url: ServiceApi.getCategoryBlog });

export { 
    getAllServices,
    getServiceBySlug,
    getAllServiceCategory
}
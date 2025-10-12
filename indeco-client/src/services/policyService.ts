/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum PolicyApi {
  getAllPolicy = "/policy",
}

const getAllPolicy = async ({ params }: { params: any}) => await APIClient.get({ url: PolicyApi.getAllPolicy, params });
const getPolicyBySlug = async (slug: string) => await APIClient.get({ url: `${PolicyApi.getAllPolicy}/slug/${slug}` });

export { 
    getAllPolicy,
    getPolicyBySlug
}
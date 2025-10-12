/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum GalleryApi {
  getAllGallery = "/gallery",
}

const getAllGallery = async ({ params }: { params: any}) => await APIClient.get({ url: GalleryApi.getAllGallery, params });

export { 
    getAllGallery,
}
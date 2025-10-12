import APIClient from "@/lib/APIClient";

export enum ColorApi {
  getColor = "/color",
}

const getAllColors = async () => await APIClient.get({ url: ColorApi.getColor });

export { 
    getAllColors,
}
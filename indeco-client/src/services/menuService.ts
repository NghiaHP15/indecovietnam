/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum MenuApi {
  getMenuHeader = "/menu",
}

const getAllMenus = async () => await APIClient.get({ url: MenuApi.getMenuHeader });

export { 
    getAllMenus,
}
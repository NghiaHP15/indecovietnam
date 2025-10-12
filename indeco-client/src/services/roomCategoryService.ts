/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum RoomCategoryApi {
  getAllRoom = "/room-category",
}

const getAllRooms = async () => await APIClient.get({ url: RoomCategoryApi.getAllRoom });

export { 
    getAllRooms,
}
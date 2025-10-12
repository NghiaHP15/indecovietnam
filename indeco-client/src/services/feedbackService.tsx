/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feedback } from "@/constants/types";
import APIClient from "@/lib/APIClient";

export enum FeedbackApi {
  feedback = "/feedback",
}

const createFeedback = async ( data: Feedback ) => await APIClient.post({ url: FeedbackApi.feedback, data });
const getAllFeedback = async ({ params }: { params?: any }) => await APIClient.get({ url: FeedbackApi.feedback, params });

export { 
    createFeedback,
    getAllFeedback
}
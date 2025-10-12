"use client";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import FeedBackCard from "./FeedBackCard";
import { getAllFeedback } from "@/services/feedbackService";
import { Feedback } from "@/constants/types";

const FeedbackResponse = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    useEffect(() => {
        (async () => {
        try {
            const res = await getAllFeedback({ params: { limit: 5, show: true } });
            if (res.data.success) {
            setFeedbacks(res.data.data);
            }
        } catch (error) {
            console.error(error);
        }
        })();
    }, []);

    return (
        <Carousel className="w-[450px]">
        <CarouselContent>
            {feedbacks.map((item, index) => (
            <CarouselItem key={index}>
                <FeedBackCard data={item} />
            </CarouselItem>
            ))}
        </CarouselContent>
        </Carousel>
    );
};

export default FeedbackResponse;

import OrderDetailView from "@/components/OrderDetailView";
import React from "react";

const OrderDetailPage = async ({ searchParams }: { searchParams?: Promise<{ txnRef?: string; }>}) => {
    const { txnRef } = await searchParams || {};

    return (
        <>
            {txnRef && <OrderDetailView txnRef={txnRef} />}
        </>
    );
};

export default OrderDetailPage;

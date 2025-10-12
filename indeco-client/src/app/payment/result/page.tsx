import PageResultStatusDynamic from "@/components/ResultDetail";
import { StatusUrl } from "@/constants/enum";
import React from "react";

const PageResultStatus =  async ({ searchParams }: { searchParams?: Promise<{ status?: string; txnRef?: string; }>}) => {
    const { status, txnRef } = await searchParams || {};

    return (
        <>
            <PageResultStatusDynamic status={status as StatusUrl} txnRef={txnRef as string} />
        </>
    );
};

export default PageResultStatus;



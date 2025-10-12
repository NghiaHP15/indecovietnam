import { Service } from "@/constants/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceCard = ({ service }: { service: Service }) => {
    return (
        <div key={service?.id} className="rounded-lg overflow-hidden">
            {service?.image && (
              <Link href={`/service/${service?.slug}`} className="relative">
                <Image
                  src={service?.image}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-max flex items-center">
                  <div className="bg-white px-3 py-1">
                    <span className="text-sm">{service?.category?.title}</span>
                  </div>
                  <div className="bg-darkColor/80 px-3 py-1">
                    <span className="text-xs text-white">{dayjs(service?.published_at).format("DD - MM - YYYY")}</span>
                  </div>
                </div>
              </Link>
            )}
            <div className="bg-shop_light_bg/80 px-5 py-4">
              <Link
                href={`/service/${service?.slug}`}
                className="text-base font-semibold tracking-wide line-clamp-1 hover:text-dark_brownish hoverEffect"
              >
                {service?.title}
              </Link>
              <span className="tracking-wide line-clamp-1">{service?.description}</span>
            </div>
        </div>
    );
};

export default ServiceCard;

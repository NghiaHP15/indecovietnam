import { Blog } from "@/constants/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ blog, type }: { blog: Blog, type?: string }) => {
    return (
      <>
      { type === "home" ? (
          <div key={blog?.id} className="rounded-lg overflow-hidden">
            {blog?.image && (
              <Link href={`/blog/${blog?.slug}`} className="relative">
                <Image
                  src={blog?.image}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-max flex items-center">
                  <div className="bg-white px-3 py-1">
                    <span className="text-sm">{blog?.category?.title}</span>
                  </div>
                  <div className="bg-darkColor/80 px-3 py-1">
                    <span className="text-xs text-white">{dayjs(blog?.published_at).format("DD - MM - YYYY")}</span>
                  </div>
                </div>
              </Link>
            )}
            <div className="bg-shop_light_bg/80 px-5 py-4">
              <Link
                href={`/blog/${blog?.slug}`}
                className="text-base font-semibold tracking-wide line-clamp-1 hover:text-dark_brownish hoverEffect"
              >
                {blog?.title}
              </Link>
              <span className="tracking-wide line-clamp-1">{blog?.description}</span>
              <div className="mt-2">
                <span className="font-medium text-sm border-l-4 border-light_brownish pl-2">Tác giả: </span>
                <span className="text-sm">{blog?.author?.fullname}</span>
              </div>
            </div>
        </div>
      ) : (
        <div key={blog?.id} className="grid grid-cols-3 rounded-lg overflow-hidden">
            {blog?.image && (
              <Link href={`/blog/${blog?.slug}`} className="col-span-3 md:col-span-1 relative">
                <Image
                  src={blog?.image}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover"
                />
                <div className="absolute bottom-0 right-0 w-max flex items-center">
                  <div className="bg-white px-3 py-1">
                    <span className="text-sm">{blog?.category?.title}</span>
                  </div>
                  <div className="bg-darkColor/80 px-3 py-1">
                    <span className="text-xs text-white">{dayjs(blog.published_at).format("DD - MM - YYYY")}</span>
                  </div>
                </div>
              </Link>
            )}
            <div className="col-span-3 md:col-span-2 bg-shop_light_bg/80 px-5 py-4">
              <Link
                href={`/blog/${blog?.slug}`}
                className="text-base font-semibold tracking-wide line-clamp-1 hover:text-dark_brownish hoverEffect"
              >
                {blog?.title}
              </Link>
              <span className="tracking-wide line-clamp-3">{blog?.description}</span>
              <div className="mt-2">
                <span className="font-medium text-sm border-l-4 border-light_brownish pl-2">Tác giả: </span>
                <span className="text-sm">{blog?.author?.fullname}</span>
              </div>
              <Link href={`/blog/${blog?.slug}`} className="flex items-center gap-2 mt-2 group hoverEffect">
                <div className="h-[1px] w-[20px] bg-light_brownish group-hover:w-[30px] group-hover:bg-dark_brownish hoverEffect"></div>
                <span className=" text-light_brownish group-hover:text-dark_brownish hoverEffect">Xem thêm</span>
              </Link>
            </div>
        </div>

      )}
      </>
    );
};

export default BlogCard;

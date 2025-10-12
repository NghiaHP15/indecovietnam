"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LikeShare from "./LikeShare";
import { Blog, CategoryBlog } from "@/constants/types";
import { getAllBlogCategory, getAllBlogs, getBlogBySlug } from "@/services/blogService";
import { emptyImage } from "@/images";
import Breakcrum from "./Breakcrum";
import Container from "./Container";
import SideBarCategory from "./SideBarCategory";
import SideBarLatest from "./SideBarLatest";
import Loading from "./Loading";

const BlogDetail = ({ slug }: { slug: string }) => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<CategoryBlog[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogRes, categoriesRes] = await Promise.all([
                    getBlogBySlug(slug),
                    getAllBlogCategory(),
                ]);
                if (blogRes.data.success) setBlog(blogRes.data.data);
                if (categoriesRes.data.success) setCategories(categoriesRes.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [slug]);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await getAllBlogs({ params: { limit: 8, category: blog?.category?.id } });
                if (res.data.success) {
                    setBlogs(res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBlogs();
    },[blog])

    return (
        <>
        <Breakcrum title={blog?.title || "" } description={blog?.description || ""}/>
            <Container className="py-10 ">
                {!blog ? (
                    <Loading/>
                ): (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="col-span-4 md:col-span-3">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <Image
                                        src={blog?.image || emptyImage}
                                        alt="blogImage"
                                        width={400}
                                        height={400}
                                        className="w-full h-auto object-cover rounded-[5px]"
                                    ></Image>
                                </div>
                                <div className="space-y-3">
                                    <h1 className="text-2xl text-darkColor font-bold">{blog?.title}</h1>
                                    <p className="text-gray-600 text-base">{blog?.description}</p>
                                    <div className="flex items-center gap-5">
                                        <span>Tác giả: {blog?.author?.fullname}</span>
                                        <div className="flex items-center gap-2 border-l-2 pl-2 border-gray-300">
                                            <Calendar className="w-4 h-4"/>
                                            <span>Xuất bản: {blog?.published_at}</span>
                                        </div>
                                        <div className="border-l-2 pl-2 border-gray-300 hover:text-dark_brownish hoverEffect">
                                            <Link href={`/blog?category=${blog?.category?.slug}`}><span>{blog?.category?.title}</span></Link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {blog?.body !== undefined ? (
                                        <div dangerouslySetInnerHTML={{ __html: blog.body || "" }} />
                                    ) : (
                                        <span>Đang cập nhật ...</span>
                                    )}
                                </div>
                                <div className="flex items-center flex-wrap gap-2">
                                    <span>Tags: </span>
                                    {blog?.tag?.map((tag, index) => (
                                    <span key={index}>
                                        <span className="inline-block bg-gray-100 text-sm text-gray-600 rounded px-2 py-1 mr-2 hover:bg-gray-200">
                                        #{tag}
                                        </span>
                                    </span>
                                    ))}
                                </div>
                                <LikeShare url={`/blog/${blog?.slug}`}/>
                            </div>
                        </div>
                        <div className="col-span-4 md:col-span-1 space-y-6">
                            <SideBarCategory title="Danh mục bài viết" data={categories} />
                            <SideBarLatest title="Bài viết liên quan" data={blogs}/>
                        </div>
                        <div className="col-span-4 w-full h-[300px] rounded-xl"
                            style={{
                                backgroundImage: `url(https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751880557/indeco/banner_article_img_kgil8o.jpg)`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }} >
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};

export default BlogDetail;

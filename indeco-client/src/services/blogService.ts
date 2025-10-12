/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum BlogApi {
  getBlog = "/blog",
  getCategoryBlog = "/blog-category",
}

const getAllBlogs = async ({ params }: { params?: any }) => await APIClient.get({ url: BlogApi.getBlog, params });
const getBlogBySlug = async (slug: string) => await APIClient.get({ url: `${BlogApi.getBlog}/slug/${slug}` });
const getAllBlogCategory = async () => await APIClient.get({ url: BlogApi.getCategoryBlog });
const getBlogCategoryBySlug = async (slug: string) => await APIClient.get({ url: `${BlogApi.getCategoryBlog}/slug/${slug}` });

export { 
    getAllBlogs,
    getBlogBySlug,
    getAllBlogCategory,
    getBlogCategoryBySlug
}
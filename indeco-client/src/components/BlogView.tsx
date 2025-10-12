"use client";

import React, { useEffect, useMemo, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Breakcrum from "@/components/Breakcrum";
import Container from "@/components/Container";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Blog, CategoryBlog } from "@/constants/types";
import { getAllBlogCategory, getAllBlogs } from "@/services/blogService";
import SideBarCategory from "./SideBarCategory";
import SideBarLatest from "./SideBarLatest";
import SideBarSearch from "./SideBarSearch";
import Loading from "./Loading";
import { useDebounce } from "@/hooks";

const ITEMS_PER_PAGE = 9;

const BlogView = ({ category }: { category?: string }) => {
  const [data, setData] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<CategoryBlog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 500);

  // Cập nhật data theo slug và reset trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ blogsRes ] = await Promise.all([
          getAllBlogs({ params: { limit: 100, search: debouncedSearch } }),
        ]);
        if (blogsRes.data.success) {
          const allBlogs = blogsRes.data.data;
          setData(category ? allBlogs.filter((b: Blog) => b.category?.slug === category) : allBlogs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setCurrentPage(1);
  }, [category, debouncedSearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ categoriesRes, latestRes ] = await Promise.all([
          getAllBlogCategory(),
          getAllBlogs({ params: { limit: 8, latest_blog: true } }),
        ]);
        if (categoriesRes.data.success) setCategories(categoriesRes.data.data);
        if (latestRes.data.success) setBlogs(latestRes.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const currentData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  // Lấy tiêu đề chuyên mục nếu có slug
  const categoryTitle = useMemo(() => {
    if (!category) return "Danh sách bài viết";
    const found = data.find((item) => item.category?.slug === category);
    return found?.category?.title ?? "Danh sách bài viết";
  }, [category, data]);

  return (
    <>
      <Breakcrum
        title={categoryTitle}
        description="Chia sẻ những bài viết mới nhất"
      />
      <div className="py-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            <div className="col-span-7 md:col-span-5 space-y-6">
              {loading ? (
                <Loading />
              ): (
                currentData.length > 0 ? (
                  currentData.map((item) => (
                    <BlogCard key={item.id} blog={item} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center  mt-10">
                    <span className="text-xl font-medium text-gray-400">Không tìm thấy bài viết</span>
                  </div>

                )
              )}
              </div>
            <div className="col-span-7 md:col-span-2 space-y-6">
              <SideBarSearch value={search} setValue={setSearch}/>
              <SideBarCategory title="Danh mục bài viết" data={categories} />
              <SideBarLatest title="Bài viết mới nhất" data={blogs} />
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => handleChangePage(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handleChangePage(Math.min(totalPages, currentPage + 1))
                      }
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default BlogView;

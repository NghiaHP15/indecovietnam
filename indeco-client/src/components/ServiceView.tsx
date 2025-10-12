"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { Blog, Service } from "@/constants/types";
import ServiceCard from "./ServiceCard";
import { getAllServices } from "@/services/serviceService";

const ITEMS_PER_PAGE = 9;

const ServiceView = ({ category }: { category?: string }) => {
  const [data, setData] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Cập nhật data theo slug và reset trang
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getAllServices({ params: { limit: 100 } });
        if (res.data.success) {
          if(category){
            setData(res.data.data.filter((item: Blog) => item.category?.slug === category));
          } else {
            setData(res.data.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlog();
    setCurrentPage(1); 
  }, [category]);

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
    if (!category) return "Dịch vụ kiến trúc";
    const found = data.find((item) => item.category?.slug === category);
    return found?.category?.title ?? "Dịch vụ kiến trúc";
  }, [category, data]);

  return (
    <>
      <Breakcrum
        title={categoryTitle}
        description="Thông tin các dịch vụ cua chúng tôi"
      />
      <div className="py-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentData.map((item) => (
              <ServiceCard key={item.id} service={item} />
            ))}
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

export default ServiceView;

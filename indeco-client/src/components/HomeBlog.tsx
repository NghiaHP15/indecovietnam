"use client";
import React, { useEffect, useState } from "react";
import { Title } from "./ui/text";
import Container from "./Container";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import BlogCard from "./BlogCard";
import { getAllBlogs } from "@/services/blogService";
import { Blog } from "@/constants/types";

const HomeBlog = () => {
  const [blogs, setBlogs ] = useState<Blog[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs({ params: { limit: 8, latest_blog: true } });
        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogs();
  }, [])

  return (
    <div className="my-10">
      <Container>
        <div data-aos="fade-up" data-aos-delay="100">
          <span className="text-darkColor">Bài viết của Indeco</span>
          <Title className="mb-6 uppercase">Bài viết mới nhất</Title>
        </div>
        <Carousel className="mt-6" data-aos="fade-up">
            <CarouselContent>
              {blogs.map((blog, subIdx) => (
                <CarouselItem key={subIdx} data-aos="fade-up" data-aos-delay={(subIdx + 1) * 100} className="basis-1/2 md:basis-1/4">
                  <BlogCard blog={blog} type="home" />
                </CarouselItem>
              ))}
            </CarouselContent>
        </Carousel>
      </Container>
    </div>
  );
};

export default HomeBlog;
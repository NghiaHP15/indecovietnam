"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import ImageWapper from "./ImageWapper";
import { emptyImage } from "@/images";

interface ImageViewProps {
  images: string[] ;
  is_active: string;
}

export default function ImageView({ images, is_active }: ImageViewProps) {
  const [active, setActive] = useState<string>(images[0] || "");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Cập nhật ảnh đang active nếu props thay đổi
  useEffect(() => {
    if (images.length === 0) return;
    setActive(is_active || images[0]);
  }, [is_active, images]);

  const handlePreviewClick = () => {
    const idx = images.findIndex((img) => img === active);
    setIndex(idx >= 0 ? idx : 0);
    setOpen(true);
  };

  if (images.length === 0) return null;

  return (
    <div className="w-full space-y-2 md:space-y-4">
      <div className="flex flex-row-reverse gap-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-auto border border-darkColor/10 rounded-md group overflow-hidden cursor-pointer"
            onClick={handlePreviewClick}
          >
            <Image
              src={active || emptyImage}
              alt="productImage"
              width={700}
              height={700}
              priority
              className="w-full h-auto object-contain group-hover:scale-110 hoverEffect rounded-md"
            />
          </motion.div>
        </AnimatePresence>

        <div>
          <Carousel orientation="vertical" className="w-full h-full">
            <CarouselContent>
              {images.map((image, i) => (
                <CarouselItem key={`thumb-${i}`} className="basis-1/5">
                  <button
                    onClick={() => setActive(image)}
                    className="rounded-md relative overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${i}`}
                      width={80}
                      height={100}
                      className="w-[80px] md:w-full h-auto object-contain relative z-0"
                    />
                    {image === active && (
                      <div className="absolute inset-0 bg-black/40 z-10 border border-primary" />
                    )}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <ImageWapper open={open} setOpen={setOpen} images={images} index={index} />
    </div>
  );
}

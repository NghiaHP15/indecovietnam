import { loadImage } from "@/images";
import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="py-10 flex flex-col items-center justify-center">
    <Image
      src={loadImage.src}
      alt="loading"
      width={400}
      height={400}
      className="w-45 h-auto"
    />
    <h2 className="text-dark_brownish text-lg">Vui lòng đợi vài giây ...</h2>
  </div>
  );
};

export default Loading;

import { bgBreakcrum } from "@/images";
import React from "react";
import Container from "./Container";

interface Props {
    title: string;
    description: string;
}

const Breakcrum = ({ title, description }: Props) => {
  return (
    <div 
        style={{
            backgroundImage: `url(${bgBreakcrum.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}
        className="h-[200px] md:h-[300px] lg:h-[350px] w-full flex items-center justify-center relative"
    >
        <Container>
            <div className="p-4">
                <h1 className="text-xl md:text-3xl text-white text-shadow-2xs font-bold text-center capitalize">{title}</h1>
                <p className="text-sm md:text-base text-center text-white text-shadow-2xs">{description}</p>
            </div>
        </Container>
    </div>
  );
};

export default Breakcrum;

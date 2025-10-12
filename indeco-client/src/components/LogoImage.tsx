
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoImage = () => {
  return (
   <Link href="/">
     <Image
        alt="logoImage"
        width={80}
        height={80}
        className="w-auto max-h-80 object-cover"
        src={"https://res.cloudinary.com/dn1tmr9ya/image/upload/v1751817579/indeco/logoindeco_sspens.png"}
    ></Image>
    </Link>
  );
};

export default LogoImage;

import { UserRoundSearch } from "lucide-react";
import Link from "next/link";
import React from "react";

const Lookup = () => {
  return (
    <Link href="/lookup">
        <UserRoundSearch className="w-5 h-5 cursor-pointer hover:text-lightColor hoverEffect"  />
    </Link>
  );
};

export default Lookup;

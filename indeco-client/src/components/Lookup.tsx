import { UserRoundSearch } from "lucide-react";
import Link from "next/link";
import React from "react";

const Lookup = () => {
  return (
    <Link href="/lookup">
        <UserRoundSearch className="w-5 h-5 cursor-pointer hover:text-light_brownish hoverEffect"  />
    </Link>
  );
};

export default Lookup;

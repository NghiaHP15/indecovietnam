import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";

const SideInfo = () => {
  const pathname = usePathname();
  return (
    <div>
        <h3 className="text-lg font-medium text-darkColor">Tài khoản</h3>
        <div className="flex flex-col gap-3 mt-6">
            <Link href="/profile" className={` ${pathname === "/profile" ? "border-l-4 border-light_brownish pl-4" : "hover:border-l-4 hover:border-light_brownish hover:pl-4 hoverEffect"}`}>Thông tin tài khoản</Link>
            <Link href="/address" className={` ${pathname === "/address" ? "border-l-4 border-light_brownish pl-4" : "hover:border-l-4 hover:border-light_brownish hover:pl-4 hoverEffect"}`}>Danh sách địa chỉ</Link>
            <LogoutButton className="hover:border-l-4 hover:border-light_brownish hover:pl-4 hoverEffect" />
        </div>
    </div>
  );
};

export default SideInfo;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import { SubText, SubTitle } from "./ui/text";
import Link from "next/link";
import LogoImage from "./LogoImage";
import FacebookPage from "./FacebookPage";
import { FooterName, PositionMenu } from "@/constants/enum";
import { getAllMenus } from "@/services/menuService";

const Footer = () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchFooter()
  }, [])

  const fetchFooter = async () => {
    try {
      const res = await getAllMenus();
      if(res.data.success){
        const x = res.data.data.filter((item: any) => item?.position === PositionMenu.FOOTER);
        const _x = x.map((i: any) => {
          return {
            ...i,
            item: JSON.parse(i?.item)
          }
        });
        setData(_x);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <footer className="bg-white border-t flex-none">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center">
              <LogoImage />
              <Logo />
            </div>
            <SubText className="mt-2">
              {data.find(item => item?.name === FooterName.FOOTER1)?.item?.description}
            </SubText>
          </div>
          <div>
            <SubTitle>
              {data.find(item => item?.name === FooterName.FOOTER2)?.item?.title}
            </SubTitle>
            <ul className="space-y-3 mt-4">
              {data.find(item => item?.name === FooterName.FOOTER2)?.item?.items?.map((item: any) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-light_brownish hoverEffect"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>
              {data.find(item => item?.name === FooterName.FOOTER3)?.item?.title}
            </SubTitle>
            <ul className="space-y-3 mt-4">
              {data.find(item => item?.name === FooterName.FOOTER3)?.item?.items?.map((item: any) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-light_brownish hoverEffect"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 overflow-hidden">
            <SubTitle>
              {data.find(item => item?.name === FooterName.FOOTER4)?.item?.title}
            </SubTitle>
            <SubText>
              {data.find(item => item?.name === FooterName.FOOTER4)?.item?.description}
            </SubText>
            <FacebookPage/>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <span>© {new Date().getFullYear()}</span>
            <Logo className="text-sm" />
            <span>. All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
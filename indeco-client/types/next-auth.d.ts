/* eslint-disable @typescript-eslint/no-explicit-any */
// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: any; // hoặc bạn có thể định nghĩa kiểu chính xác hơn
  }

  interface User {
    customUser?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: any;
  }
}

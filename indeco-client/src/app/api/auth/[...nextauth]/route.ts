/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { loginSocail } from "@/services/authService";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Gửi thông tin user về backend để lưu
      const nameParts = user.name?.split(" ") || [];
      const firstname = nameParts[0] || "";
      const lastname = nameParts[1] || "";
      
      const res = await loginSocail({
        firstname,
        lastname,
        email: user.email,
        avatar: user.image,
        provider: account?.provider,
        provider_id: account?.providerAccountId,
      });
      
      if (res?.data?.success) {
        // ✅ ép kiểu user và account để thêm custom fields
        (user as any).customUser = res.data.data.user;
        (account as any).customAccessToken = res.data.data.accessToken;
        return true;
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // ✅ Lấy custom user từ user (chỉ có ở lần đầu login)
        token.user = (user as any).customUser ?? token.user;
      }
      if (account) {
        token.accessToken = (account as any).customAccessToken ?? token.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

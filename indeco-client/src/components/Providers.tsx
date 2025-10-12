/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import useStore from "../../store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
      <SyncZustandWithSession>{children}</SyncZustandWithSession>
    </SessionProvider>
  );
};

export default Providers;

// 👉 Tách riêng thành component sync session → zustand
const SyncZustandWithSession = ({ children }: { children: React.ReactNode }) => {
  const { addUser, addToken, logout } = useStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    const accessToken = (session as any)?.accessToken;
    if (!accessToken || !session?.user) return;

    // ✅ Chỉ sync nếu token trong Zustand khác với token mới
    const currentToken = localStorage.getItem("accessToken");
    if (currentToken !== accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("loginType", "oauth");
      addUser(session.user);
      addToken(accessToken);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]); // ✅ chỉ theo dõi status, không cần session trong deps

  useEffect(() => {
    if (status === "unauthenticated") {
      const loginType = localStorage.getItem("loginType");
      if (loginType === "oauth") logout();
    }
  }, [status, logout]);

  return <>{children}</>;
};
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateSlug = (title: string): string => {
  return slugify(title, { lower: true, strict: true, locale: 'vi' });
}

export const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("loginType");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseJwt = (token: string): any => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

export const checkTokenValid = (): boolean => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  const decoded = parseJwt(token);
  const currentTime = Date.now() / 1000;

  if (!decoded?.exp || decoded.exp < currentTime) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loginType");
    return false;
  }

  return true;
};

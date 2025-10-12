"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Login } from "@/constants/types";
import { login } from "@/services/authService";
import useStore from "../../store";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<Login>({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addUser, addToken } = useStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) return;

    try {
      setLoading(true);
      const res = await login(formData);

      if (res.data.success) {
        setError(false);
        const { user, accessToken } = res.data.data;
        addUser(user);
        addToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        router.push("/");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      console.error("Đăng nhập thất bại:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="grid">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@gmail.com"
            required
          />
        </div>

        <div className="grid relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
            required
            className="pr-10"
          />
          <button
            type="button"
            aria-label="Hiện/ẩn mật khẩu"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
          >
            {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeClosedIcon className="w-5 h-5" />}
          </button>
          {error && (
            <p className="absolute -bottom-6 text-red-500 text-sm mt-1">
              Sai tài khoản hoặc mật khẩu
            </p>
          )}
        </div>

        <div className="flex items-end">
          <Link
            href="/forgot-password"
            className="ml-auto text-primary text-sm underline-offset-4 hover:opacity-80"
          >
            Quên mật khẩu?
          </Link>
        </div>
      </div>

      <Button
        className="bg-btn_dark_brownish hover:bg-btn_light_brownish w-full font-bold"
        type="submit"
        isLoading={loading}
      >
        Đăng nhập
      </Button>
    </form>
  );
};

export default FormLogin;

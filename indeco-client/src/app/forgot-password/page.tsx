"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { bgLogin } from "@/images";
import SocalLoginButton from "@/components/SocalLoginButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { confirmOtp, forgotPassword, resetPassword } from "@/services/authService";
import Link from "next/link";
import { ChevronLeft, EyeClosedIcon, EyeIcon } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const otpSchema = z.object({
  otp: z.string().length(6, { message: "Mã OTP phải đủ 6 số" }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ!").min(1, "Vui lòng nhập email!"),
});

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
    confirmPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu không khớp!",
  });

enum Step {
  FORGOT_PASSWORD = "forgot-password",
  OTP = "otp",
  RESET_PASSWORD = "reset-password",
}

export default function ForgotPassword() {
  const [loadingForgot, setLoadingForgot] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<Step>(Step.FORGOT_PASSWORD);
  const [token, setToken] = useState("");
  const timeRef = useRef<HTMLSpanElement>(null);
  const timeLeft = useRef(300); // 3 phút
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();

  // Timer
  useEffect(() => {
    if (step !== Step.OTP) return;
    timeLeft.current = 300;
    setIsFinished(false);
    const interval = setInterval(() => {
      timeLeft.current -= 1;
      if (timeLeft.current < 0) {
        clearInterval(interval);
        setIsFinished(true);
        return;
      }
      const m = Math.floor(timeLeft.current / 60).toString().padStart(2, "0");
      const s = (timeLeft.current % 60).toString().padStart(2, "0");
      if (timeRef.current) timeRef.current.textContent = `${m}:${s}`;
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  // Forms
  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  // Handlers
  const handleForgotPasswordSubmit = async (formData: z.infer<typeof forgotPasswordSchema>) => {
    try {
      setLoadingForgot(true);
      timeLeft.current = 300;
      otpForm.reset();
      const res = await forgotPassword({ email: formData.email });
      if (res.data.success) {
        setToken(res.data.data.token || "");
        setStep(Step.OTP);
      }
    } catch (err) {
      console.error("Gửi email thất bại:", err);
    } finally {
      setLoadingForgot(false);
    }
  };

  const handleOTPSubmit = async (formData: z.infer<typeof otpSchema>) => {
    try {
      setLoadingOtp(true);
      const res = await confirmOtp({ token: token, otp: formData.otp });
      if (res.data.success === true) {
        setToken(res.data.data.token || token);
        setStep(Step.RESET_PASSWORD);
      }
    } catch (err) {
      console.error("Gửi OTP thất bại:", err);
      if(timeLeft.current > 0) otpForm.setError("otp", { message: "Mã OTP không hợp lệ!" });
        else otpForm.setError("otp", { message: "Mã OTP hết hạn!" });
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleResetPasswordSubmit = async (formData: z.infer<typeof resetPasswordSchema>) => {
    try {
      setLoadingReset(true);
      const res = await resetPassword({ token, newPassword: formData.newPassword });
      if (res.data.success) {
        toast.success("Đổi mật khẩu thành công!");
        router.push("/login");
      }
    } catch (err) {
      console.error("Đổi mật khẩu thất bại:", err);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <Container>
      <div className="flex items-center mt-10 justify-center py-12 md:py-32 p-0 md:p-4">
        <Card className="w-full md:w-[800px] p-4">
          <CardContent className="px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                style={{
                  backgroundImage: `url(${bgLogin.src})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                className="rounded-md h-[300px] md:h-full"
              />

              {/* Step 1: Quên mật khẩu */}
              {step === Step.FORGOT_PASSWORD && (
                <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPasswordSubmit)} className="flex flex-col gap-4 md:py-20 py-6">
                  <h1 className="text-2xl font-bold">Quên mật khẩu</h1>
                  <span>Nhập email đăng ký tài khoản của bạn</span>
                  <Input {...forgotPasswordForm.register("email")} placeholder="user@gmail.com" />
                  {forgotPasswordForm.formState.errors.email && (
                    <p className="text-red-500 text-sm">{forgotPasswordForm.formState.errors.email.message}</p>
                  )}
                  <Button type="submit" isLoading={loadingForgot} className="bg-btn_dark_brownish hover:bg-btn_light_brownish w-full font-bold">
                    Gửi Email
                  </Button>
                  <div className="text-center text-sm text-gray-400">Hoặc</div>
                  <SocalLoginButton />
                </form>
              )}

              {/* Step 2: OTP */}
              {step === Step.OTP && (
                <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="flex flex-col gap-6 md:py-20 py-6">
                  <h1 className="text-2xl font-bold">Mã xác nhận</h1>
                  <span>Nhập OTP đã gửi vào email</span>
                  <Controller
                    name="otp"
                    control={otpForm.control}
                    render={({ field }) => (
                      <InputOTP
                        value={field.value}
                        onChange={(val) => field.onChange(val)} // val là string, khớp kiểu OTPInput
                        onBlur={field.onBlur}
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        // ...các prop khác bạn cần
                      >
                        <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot key={i} index={i} className={otpForm.formState.errors.otp ? "border-red-400" : ""} />
                        ))}
                      </InputOTPGroup>
                      </InputOTP>
                    )}
                  />
                  {otpForm.formState.errors.otp && <p className="text-red-500 text-sm">{otpForm.formState.errors.otp.message}</p>}
                  {!isFinished ? <span ref={timeRef} className="mt-2 text-gray-700 text-lg">05:00</span> : <span className="cursor-pointer underline-offset-4" onClick={forgotPasswordForm.handleSubmit(handleForgotPasswordSubmit)}>Gửi lại mã OTP</span>}
                  <Button isLoading={loadingOtp} className="bg-btn_dark_brownish hover:bg-btn_light_brownish w-full font-bold">
                    Xác nhận
                  </Button>
                  <Link href="/login" className="flex items-center underline-offset-4 text-sm">
                    <ChevronLeft className="mr-1 h-5 w-5" /> Trở lại đăng nhập
                  </Link>
                </form>
              )}

              {/* Step 3: Reset password */}
              {step === Step.RESET_PASSWORD && (
                <form onSubmit={resetPasswordForm.handleSubmit(handleResetPasswordSubmit)} className="flex flex-col gap-4 md:py-20 py-6">
                  <h1 className="text-2xl font-bold">Thay đổi mật khẩu</h1>
                  <span>Thay đổi mật khẩu mới</span>
                  <div className="relative">
                    <Input {...resetPasswordForm.register("newPassword")} type={showPassword ? "text" : "password"} placeholder="Mật khẩu" />
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeClosedIcon className="w-5 h-5" />}
                    </button>
                  </div>
                  {resetPasswordForm.formState.errors.newPassword && (
                    <p className="text-red-500 text-sm">{resetPasswordForm.formState.errors.newPassword.message}</p>
                  )}
                  <Input {...resetPasswordForm.register("confirmPassword")} type={showPassword ? "text" : "password"} placeholder="Xác nhận mật khẩu" />
                  {resetPasswordForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{resetPasswordForm.formState.errors.confirmPassword.message}</p>
                  )}
                  <Button type="submit" isLoading={loadingReset} className="bg-btn_dark_brownish hover:bg-btn_light_brownish w-full font-bold">
                    Thay đổi
                  </Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

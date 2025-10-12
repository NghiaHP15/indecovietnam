/* eslint-disable @typescript-eslint/no-explicit-any */
import APIClient from "@/lib/APIClient";

export enum AuthApi {
  login = "/customer/login",
  loginSocail = "/customer/login-social",
  logout = "/customer/logout",
  register = "/customer/register",
  forgotPassword = "/customer/forgot-password",
  confirmOtp = "/customer/confirm-otp",
  resetPassword = "/customer/reset-password",
}

const login = async (data: any = {}) => await APIClient.post({ url: AuthApi.login, data })
const loginSocail = async (data: any = {}) => await APIClient.post({ url: AuthApi.loginSocail, data })
const logout = async () => await APIClient.post({ url: AuthApi.logout})
const register = async (data: any = "") => await APIClient.post({ url: AuthApi.register, data })
const forgotPassword = async (data: any = "") => await APIClient.post({ url: AuthApi.forgotPassword, data })
const confirmOtp = async (data: any = "") => await APIClient.post({ url: AuthApi.confirmOtp, data })
const resetPassword = async (data: any = "") => await APIClient.post({ url: AuthApi.resetPassword, data })

export { 
    login, 
    loginSocail,
    logout, 
    register,
    forgotPassword,
    confirmOtp,
    resetPassword
}
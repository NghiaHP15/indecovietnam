import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useStore from "../../store";
import { useRouter } from "next/navigation";
import { Register } from "@/constants/types";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { register } from "@/services/authService";

const FormSignin = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [data, setData] = useState<Register>({ firstname: "", lastname: "", email: "", password: "" });
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { addUser, addToken } = useStore();
    const router = useRouter();

    const handleChange = (value: string, name: string) => {
        setData({
        ...data,
        [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(data.email === "" && data.password === "" && data.firstname === "" && data.lastname === "") return;
        try {
        setLoading(true);
        const res = await register(data);
        if(res.data.success) {
            setError(false);
            addUser(res.data.data.user);
            addToken(res.data.data.accessToken);
            localStorage.setItem("accessToken", res.data.data.accessToken);
            router.push("/");
        }
        } catch (error) {
        setError(true);
        console.log("Lỗi hệ thống: ",error);
        } finally {
        setLoading(false);
        }
    };

    return (
        <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        id="firtstName"
                        type="firtstName"
                        placeholder="Họ"
                        value={data.firstname}
                        onChange={(e) => handleChange(e.target.value, "firstname")}
                        required
                    />
                    <Input
                        id="lastname"
                        type="lastname"
                        placeholder="Tên"
                        value={data.lastname}
                        onChange={(e) => handleChange(e.target.value, "lastname")}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Input
                        id="email"
                        type="email"
                        placeholder="user@gmail.com"
                        value={data.email}
                        onChange={(e) => handleChange(e.target.value, "email")}
                        required
                    />
                </div>
                <div className="grid relative">
                    <Input 
                        type={showPassword ? "text" : "password"} 
                        value={data.password}
                        onChange={(e) => handleChange(e.target.value, "password")}
                        placeholder="Mật khẩu"
                        required 
                        className="relative z-0"
                    />
                    {showPassword ? 
                    <EyeIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 z-1 text-gray-400 cursor-pointer" onClick={() => setShowPassword(false)} /> :
                    <EyeClosedIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 z-1 text-gray-400 cursor-pointer" onClick={() => setShowPassword(true)} />
                    }
                    <div className="absolute bottom-[-24px]">
                    {error === true && <p className="text-red-500 text-sm mt-2">Sai tài khoản hoặc mật khẩu</p>}
                    </div>
                </div>
            </div>
            <div>
                <Button className="bg-btn_dark_brownish hover:bg-btn_light_brownish hoverEffect w-full font-bold" isLoading={loading}>Login</Button>
            </div>
        </form>
    );
};

export default FormSignin;

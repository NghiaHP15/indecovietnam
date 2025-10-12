"use client";
import React, { useState } from "react";
import Container from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { bgLogin } from "@/images";
import FromLogin from "@/components/FromLogin";
import FormSignin from "@/components/FormSignin";
import { Button } from "@/components/ui/button";
import SocalLoginButton from "@/components/SocalLoginButton";

const Login = () => {
  const [show, setShow] = useState(true);

  return (
    <Container>
      <div className="flex items-center mt-10 justify-center py-12 md:py-32 p-0 md:p-4">
        <Card className="w-full md:w-[800px] lg:w-[800px] p-4">
          <CardContent className="px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div 
                style={{
                  backgroundImage: `url(${bgLogin.src})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }} 
                className="rounded-md h-[300px] md:h-full lg:h-full relative"
              >
              </div>
              <div className="py-4 md:py-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">{show ? "Welcome back" : "Welcome"}</h1>
                  <span>{show ? "Chúng tôi rất vui khi bạn trở lại" : "Chào mừng bạn đến với chúng tôi"}</span>
                </div>
                {show ? 
                <FromLogin/> :
                <FormSignin/>}
                <SocalLoginButton/>
                <span className="text-sm underline-offset-4">
                    {show ? "Chưa có tài khoản?" : "Đã có tài khoản"} 
                    <Button 
                        variant={"link"} 
                        onClick={() => setShow(!show)} 
                        className="px-2 text-primary inline-block hover:opacity-80 hoverEffect" 
                    >
                        {show ? "Đăng ký" : "Đăng nhập"}
                    </Button>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Login;

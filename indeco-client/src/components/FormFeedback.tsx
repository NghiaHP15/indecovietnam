"use client";
import React, { useCallback, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFeedback } from "@/services/feedbackService";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { check } from "@/images";
import { typeFeedbackOptions } from "@/constants/data";

const dataDefault = {
  name: "",
  email: "",
  phone: "",
  type: "",
  subject: "",
  message: "",
};

const contactSchema = z.object({
  name: z.string().min(1, "Họ tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .regex(/^(0|\+84)\d{9}$/, "Số điện thoại không hợp lệ"),
  type: z.string().min(1, "Vui lòng chọn kiểu liên hệ"),
  subject: z.string().min(1, "Tiêu đề không được để trống"),
  message: z.string().min(1, "Vui lòng nhập nội dung liên hệ"),
});

const FormFeedback = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: dataDefault,
    });

    const onSubmit = useCallback(async (values: z.infer<typeof contactSchema>) => {
        try {
        setLoading(true);
        const res = await createFeedback(values);
        if (res.data.success) {
            setOpen(true);
            form.reset(dataDefault);
        }
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }, [form]);

    return (
        <>
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-3"
            >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem className="col-span-2">
                    <FormControl>
                    <Input placeholder="Họ tên" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input type="tel" placeholder="Số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                <FormItem className="col-span-2">
                    <FormControl>
                    <Input placeholder="Tiêu đề" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                <FormItem className="col-span-2">
                    <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn kiểu liên hệ" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            {typeFeedbackOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.title}
                            </SelectItem>
                            ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                <FormItem className="col-span-2">
                    <FormControl>
                    <Textarea placeholder="Thông tin gửi" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <Button
                type="submit"
                isLoading={loading}
                className="col-span-2 px-3 py-2 bg-light_brownish hover:bg-dark_brownish text-white rounded-[2px]"
            >
                Gửi thông tin
            </Button>
            </form>
        </Form>
        {/* Dialog thành công */}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-[600px] py-10 md:py-20">
              <DialogTitle className="sr-only">Phản hồi thành công</DialogTitle>
              <div className="flex flex-col items-center gap-4">
                <Image src={check} alt="check" width={100} height={100} />
                <h3 className="text-xl font-medium text-green-900">Bạn đã phản hồi thành công</h3>
                <p className="text-center">
                  Chúng tôi đã tiếp nhận phản hồi của bạn. <br />
                  Sẽ phản hồi quý khách trong thời gian sớm nhất.
                </p>
              </div>
            </DialogContent>
        </Dialog>
        </>
    );
};

export default FormFeedback;

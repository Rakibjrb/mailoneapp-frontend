"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, SaveOutlined } from "@ant-design/icons";
import { useChangePasswordMutation } from "@/redux/features/dashboard/settings/password-settings/securityApi";
import { useToast } from "@/context/ToastContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout as authLogout } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();
    const [form] = Form.useForm();

    const [changePassword] = useChangePasswordMutation();
    const [logout] = useLogoutMutation();

    // handle change password function
    const onFinish = async (values: any) => {
        setIsLoading(true);
        try {
            await changePassword(values).unwrap();
            toast("Password changed successfully", "success");

            await logout({ refreshToken: Cookies.get("refreshToken") }).unwrap();
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            dispatch(authLogout());
            router.push("/login");
            toast("Please re-login to continue", "warning");
        } catch (error: any) {
            toast(error?.data?.message || "Something went wrong!", "error");
        } finally {
            form.resetFields();
            setIsLoading(false);
        }
    }

    return (
        <div className="py-2 space-y-6">
            <Form form={form} layout="vertical" className="w-full!" onFinish={onFinish}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item label={<span className="text-slate-300">Current Password</span>} name="oldPassword">
                        <Input.Password prefix={<LockOutlined className="text-slate-500 mr-2" />} placeholder="********" className="bg-slate-900/50! border-slate-700! text-white! p-2!" />
                    </Form.Item>
                    <Form.Item label={<span className="text-slate-300">New Password</span>} name="newPassword">
                        <Input.Password prefix={<LockOutlined className="text-slate-500 mr-2" />} placeholder="********" className="bg-slate-900/50! border-slate-700! text-white! p-2!" />
                    </Form.Item>
                </div>
                <Form.Item label={<span className="text-slate-300">Confirm Password</span>} name="confirmPassword">
                    <Input.Password prefix={<LockOutlined className="text-slate-500 mr-2" />} placeholder="********" className="bg-slate-900/50! border-slate-700! text-white! p-2!" />
                </Form.Item>

                <div className="flex justify-end pt-6 mt-6 border-t border-slate-700/50">
                    <Button type="primary" htmlType="submit" loading={isLoading} icon={<SaveOutlined />} className="bg-blue-600 border-none px-4!">
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ChangePassword;

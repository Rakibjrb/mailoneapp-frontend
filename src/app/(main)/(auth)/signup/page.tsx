"use client";
{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React from "react";
import { Form, Input, Button, Divider, Typography, ConfigProvider, theme } from "antd";
import { GoogleOutlined, MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { JSX } from "react";
import { AuthSignup } from "../../../../types/auth.types";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useToast } from "@/context/ToastContext";

const { Title, Text, Paragraph } = Typography;

export default function SignupPage(): JSX.Element {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const [register] = useRegisterMutation();

    const onFinish = async (values: AuthSignup) => {
        setLoading(true);
        try {
            const res = await register(values).unwrap();
            toast(res.data?.message || "User Registered Successfully", "success");
            router.push("/login");
        } catch (error: any) {
            toast(error.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: "#3b82f6",
                    borderRadius: 12,
                },
                components: {
                    Input: {
                        colorBgContainer: "rgba(15, 23, 42, 0.6)",
                        colorBorder: "rgba(51, 65, 85, 0.5)",
                        controlHeight: 48,
                    },
                    Button: {
                        controlHeight: 48,
                        fontWeight: 600,
                    },
                },
            }}
        >
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 relative overflow-hidden py-32">
                {/* Animated Background Orbs */}
                <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

                <div className="w-full max-w-[500px] relative z-10">

                    <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
                        {/* Subtle top light effect */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />

                        <div className="mb-10 text-center">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
                                    <MailOutlined className="text-white text-xl" />
                                </div>
                                <span className="text-white font-bold text-2xl tracking-tight">
                                    Mail<span className="text-blue-500">ONE</span>
                                </span>
                            </div>
                            <Title level={1} className="mb-2! text-white! text-3xl! font-extrabold! tracking-tight">
                                Create Account
                            </Title>
                            <Paragraph className="text-slate-400 text-base">
                                Start managing your emails more effectively today.
                            </Paragraph>
                        </div>

                        <Button
                            icon={<GoogleOutlined className="text-lg" />}
                            block
                            className="flex! items-center justify-center gap-3 bg-white! text-slate-900! hover:bg-slate-100! border-none! h-[56px]! rounded-2xl! transition-all duration-300 shadow-xl shadow-black/10"
                        >
                            <span className="text-base font-bold">Sign up with Google</span>
                        </Button>

                        <Divider className="border-slate-800/60! my-10!">
                            <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] px-4">OR REGISTER WITH EMAIL</span>
                        </Divider>

                        <Form
                            form={form}
                            name="signup"
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                            requiredMark={false}
                            className="space-y-4"
                        >
                            <Form.Item
                                name="name"
                                label={<span className="text-slate-300 text-sm font-bold ml-1">Full Name</span>}
                                rules={[{ required: true, message: "Full name is required" }]}
                            >
                                <Input
                                    prefix={<UserOutlined className="text-slate-500 mr-2" />}
                                    placeholder="John Doe"
                                    className="rounded-2xl! bg-slate-950/40! border-slate-800! hover:border-blue-500/50! focus:border-blue-500! transition-all text-white! placeholder:text-slate-600"
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label={<span className="text-slate-300 text-sm font-bold ml-1">Email Address</span>}
                                rules={[
                                    { required: true, message: "Email is required" },
                                    { type: 'email', message: "Please enter a valid email" }
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined className="text-slate-500 mr-2" />}
                                    placeholder="name@example.com"
                                    className="rounded-2xl! bg-slate-950/40! border-slate-800! hover:border-blue-500/50! focus:border-blue-500! transition-all text-white! placeholder:text-slate-600"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label={<span className="text-slate-300 text-sm font-bold ml-1">Password</span>}
                                rules={[
                                    { required: true, message: "Password is required" },
                                    { min: 6, message: "Password must be at least 6 characters" }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-slate-500 mr-2" />}
                                    placeholder="••••••••"
                                    className="rounded-2xl! bg-slate-950/40! border-slate-800! hover:border-blue-500/50! focus:border-blue-500! transition-all text-white! placeholder:text-slate-600"
                                />
                            </Form.Item>

                            <Form.Item className="mt-8! mb-0!">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    loading={loading}
                                    className="h-[56px]! rounded-2xl! text-base! bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
                                >
                                    Create Account
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="text-center mt-10">
                            <Text className="text-slate-500 font-semibold">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-blue-500 hover:text-blue-400 font-bold ml-1 transition-colors underline-offset-4 hover:underline"
                                >
                                    Sign in
                                </Link>
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}

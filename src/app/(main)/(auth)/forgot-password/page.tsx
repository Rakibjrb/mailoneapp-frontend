"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, ConfigProvider, theme } from "antd";
import { MailOutlined, LockOutlined, ArrowLeftOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import Link from "next/link";
import { JSX } from "react";
import { useRequestOtpMutation, useVerifyOtpMutation, useConfirmResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

type ResetStep = "email" | "otp" | "password";

export default function ResetPasswordPage(): JSX.Element {
    const [step, setStep] = useState<ResetStep>("email");
    const [email, setEmail] = useState<string>("");
    const [tempToken, setTempToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [resendLoading, setResendLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();

    const [requestOtp] = useRequestOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [confirmResetPassword] = useConfirmResetPasswordMutation();

    const onEmailFinish = async (values: { email: string }) => {
        step === "email" ? setLoading(true) : setResendLoading(true);
        try {
            await requestOtp(values).unwrap();
            setEmail(values.email);
            toast("OTP sent successfully, Please check your email", "success");
            setStep("otp");
        } catch (error: any) {
            toast(error?.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
            setResendLoading(false);
        }
    };

    const onOtpFinish = async (values: { otp: string }) => {
        setLoading(true);
        try {
            const res = await verifyOtp({ email, otp: Number(values.otp) }).unwrap();
            toast("OTP verified successfully", "success");
            setTempToken(res?.data?.tempToken);
            setStep("password");
        } catch (error: any) {
            toast(error?.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false)
        }
    };

    const onPasswordFinish = async (values: { password: string, confirm_password: string }) => {
        console.log({ tempToken, newPassword: values.password })
        setLoading(true);
        try {
            await confirmResetPassword({ tempToken, newPassword: values.password }).unwrap();
            toast("Password reset successfully", "success");
            toast("Please login with your new password", "success");
            router.push("/login");
        } catch (error: any) {
            toast(error?.data?.message || "Something went wrong", "error");
        } finally {
            setLoading(false)
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
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

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

                            {step === "email" && (
                                <>
                                    <Title level={1} className="mb-2! text-white! text-3xl! font-extrabold! tracking-tight">
                                        Forgot Password?
                                    </Title>
                                    <Paragraph className="text-slate-400 text-base">
                                        No worries! Enter your email and we{"'"}ll send you reset instructions.
                                    </Paragraph>
                                </>
                            )}

                            {step === "otp" && (
                                <>
                                    <Title level={1} className="mb-2! text-white! text-3xl! font-extrabold! tracking-tight">
                                        Verify Email
                                    </Title>
                                    <Paragraph className="text-slate-400 text-base">
                                        We{"'"}ve sent an 8-digit code to <span className="text-blue-400 font-semibold">{email}</span>
                                    </Paragraph>
                                </>
                            )}

                            {step === "password" && (
                                <>
                                    <Title level={1} className="mb-2! text-white! text-3xl! font-extrabold! tracking-tight">
                                        New Password
                                    </Title>
                                    <Paragraph className="text-slate-400 text-base">
                                        Almost there! Create a strong password for your account.
                                    </Paragraph>
                                </>
                            )}
                        </div>

                        {step === "email" && (
                            <Form
                                name="reset_email"
                                layout="vertical"
                                onFinish={onEmailFinish}
                                requiredMark={false}
                                className="space-y-4"
                            >
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

                                <Form.Item className="mt-8! mb-0!">
                                    <Button
                                        loading={loading}
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        className="h-[56px]! rounded-2xl! text-base! bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
                                    >
                                        Send OTP Code
                                    </Button>
                                </Form.Item>

                                <div className="text-center mt-8">
                                    <Link
                                        href="/login"
                                        className="text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 font-semibold"
                                    >
                                        <ArrowLeftOutlined className="text-xs" />
                                        Back to Login
                                    </Link>
                                </div>
                            </Form>
                        )}

                        {step === "otp" && (
                            <Form
                                name="reset_otp"
                                layout="vertical"
                                onFinish={onOtpFinish}
                                requiredMark={false}
                                className="space-y-4"
                            >
                                <Form.Item
                                    name="otp"
                                    label={<span className="text-slate-300 text-sm font-bold ml-1">8-Digit Reset Code</span>}
                                    rules={[
                                        { required: true, message: "Verification code is required" },
                                        { pattern: /^[0-9]{6}$/, message: "Please enter a valid 6-digit code" }
                                    ]}
                                >
                                    <Input
                                        prefix={<SafetyCertificateOutlined className="text-slate-500 mr-2" />}
                                        placeholder="000000"
                                        maxLength={6}
                                        className="rounded-2xl! bg-slate-950/40! border-slate-800! hover:border-blue-500/50! focus:border-blue-500! transition-all text-white! placeholder:text-slate-600 text-center text-2xl tracking-[0.5em] font-mono h-[64px]!"
                                    />
                                </Form.Item>

                                <Form.Item className="mt-8! mb-0!">
                                    <Button
                                        loading={loading}
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        className="h-[56px]! rounded-2xl! text-base! bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
                                    >
                                        Verify Code
                                    </Button>
                                </Form.Item>

                                <div className="text-center mt-8">
                                    <div className="text-slate-500 font-semibold mb-4">
                                        {"Didn't"} receive the code?{" "}
                                        <button
                                            type="button"
                                            onClick={() => onEmailFinish({ email })}
                                            className="text-blue-500 hover:text-blue-400 font-bold ml-1 transition-colors cursor-pointer"
                                        >
                                            {resendLoading ? "Sending" : "Resend OTP"}
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStep("email")}
                                        className="text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 font-semibold mx-auto"
                                    >
                                        <ArrowLeftOutlined className="text-xs" />
                                        Use different email
                                    </button>
                                </div>
                            </Form>
                        )}

                        {step === "password" && (
                            <Form
                                name="reset_password"
                                layout="vertical"
                                onFinish={onPasswordFinish}
                                requiredMark={false}
                                className="space-y-4"
                            >
                                <Form.Item
                                    name="password"
                                    label={<span className="text-slate-300 text-sm font-bold ml-1">New Password</span>}
                                    rules={[
                                        { required: true, message: "Password is required" },
                                        { min: 8, message: "Password must be at least 8 characters" }
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="text-slate-500 mr-2" />}
                                        placeholder="••••••••"
                                        className="rounded-2xl! bg-slate-950/40! border-slate-800! hover:border-blue-500/50! focus:border-blue-500! transition-all text-white! placeholder:text-slate-600"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirmPassword"
                                    label={<span className="text-slate-300 text-sm font-bold ml-1">Confirm New Password</span>}
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: "Please confirm your password" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords do not match!'));
                                            },
                                        }),
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
                                        loading={loading}
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        className="h-[56px]! rounded-2xl! text-base! bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
                                    >
                                        Reset Password
                                    </Button>
                                </Form.Item>

                                <div className="text-center mt-8">
                                    <Link
                                        href="/login"
                                        className="text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 font-semibold"
                                    >
                                        <ArrowLeftOutlined className="text-xs" />
                                        Back to Login
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}
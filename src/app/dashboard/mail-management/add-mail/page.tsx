"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React, { useState } from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { ArrowLeftOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import UploadModal from "./_components/UploadModal";
import { useUploadBulkMailMutation } from "@/redux/features/dashboard/mail-management/mailApi";
import { useToast } from "@/context/ToastContext";

const AddMailPage = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

    const router = useRouter();
    const { toast } = useToast();

    const [uploadBulkMail, { isLoading: isUploading }] = useUploadBulkMailMutation();

    const handleUpload = async (files: any) => {
        try {
            const formData = new FormData();
            if (files[0]?.originFileObj) {
                formData.append("file", files[0].originFileObj);
            } else {
                formData.append("file", files[0]);
            }
            await uploadBulkMail(formData).unwrap();
            setIsUploadModalOpen(false);
            toast("upload completed", "success");
            router.back();
        } catch (error: any) {
            toast(error?.data?.message || "Error uploading file:", "error");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    className="bg-transparent! border-slate-700! text-slate-300! hover:text-white! hover:border-slate-500!"
                >
                    Back
                </Button>

                <Button
                    icon={<UploadOutlined />}
                    className="bg-slate-800! border-slate-700! text-slate-300! hover:bg-slate-700! hover:border-slate-600! hover:text-slate-200!"
                    onClick={() => setIsUploadModalOpen(true)}
                >
                    Upload
                </Button>
            </div>
            <div className="min-h-[80vh] flex items-center justify-center p-4">
                <Card
                    className="bg-slate-800/40! border-slate-700/50! backdrop-blur-md! w-full max-w-md shadow-2xl md:p-6!"
                    variant="outlined"
                >
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold text-white mb-2">Add New Mail</h1>
                        <p className="text-slate-400 text-sm">Fill in the details to add a new contact to your mail list.</p>
                    </div>

                    <Form layout="vertical" className="space-y-4">
                        <Form.Item
                            label={<span className="text-slate-300 font-medium">Name</span>}
                            name="name"
                            rules={[{ required: true, message: 'Please enter a name' }]}
                        >
                            <Input
                                placeholder="John Doe"
                                className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-500! h-11"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-slate-300 font-medium">Email</span>}
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter an email' },
                                { type: 'email', message: 'Please enter a valid email' }
                            ]}
                        >
                            <Input
                                placeholder="john@example.com"
                                className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-500! h-11"
                            />
                        </Form.Item>

                        <Form.Item name="selectByDefault" valuePropName="checked">
                            <Checkbox className="text-slate-300! hover:text-white! transition-colors">
                                Select by Default
                            </Checkbox>
                        </Form.Item>

                        <div className="pt-1">
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className="w-full h-11! bg-blue-600! border-none! text-white font-bold hover:bg-blue-500! transition-all shadow-lg shadow-blue-900/20 uppercase"
                                htmlType="submit"
                            >
                                Add Now
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>

            <UploadModal open={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} handleUpload={handleUpload} isLoading={isUploading} />
        </div>
    );
};

export default AddMailPage;

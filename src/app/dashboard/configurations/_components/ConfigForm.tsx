"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React from "react";
import { Form, Input, Button, Select } from "antd";
import {
    SaveOutlined,
    ApiOutlined,
    UserOutlined,
    LockOutlined,
    MailOutlined
} from "@ant-design/icons";

type Props = {
    submit: {
        onSubmit: (data: any) => void;
        isLoading: boolean;
    },
    test?: {
        handleTest: () => void;
        isConfigTestLoading: boolean;
    }
    isRequired: boolean;
}

const ConfigForm = ({ submit, test, isRequired }: Props) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        submit.onSubmit(values);
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical" className="relative z-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                    label={<span className="text-slate-300 font-medium">SMTP User</span>}
                    name="user"
                    className="mb-0"
                    tooltip="Set the SMTP user of your SMTP server"
                    rules={[
                        {
                            required: isRequired,
                            message: "Please enter your SMTP user",
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="text-slate-500" />}
                        placeholder="user@smtp.com"
                        className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-600! h-11!"
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="text-slate-300 font-medium">SMTP Password</span>}
                    name="pass"
                    className="mb-0"
                    tooltip="Set the SMTP password of your SMTP server"
                    rules={[
                        {
                            required: isRequired,
                            message: "Please enter your SMTP password",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-slate-500" />}
                        placeholder="••••••••••••"
                        className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-600! h-11!"
                    />
                </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Form.Item
                    label={<span className="text-slate-300 font-medium">App Name</span>}
                    name="appName"
                    tooltip="The name that will appear as the sender in emails."
                    rules={[
                        {
                            required: isRequired,
                            message: "Please enter your App name",
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-slate-500" />}
                        placeholder="e.g. MailOne"
                        className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-600! h-11!"
                    />
                </Form.Item>
                <Form.Item
                    label={<span className="text-slate-300 font-medium">Host</span>}
                    name="host"
                    tooltip="Set the host of your SMTP server"
                    rules={[
                        {
                            required: isRequired,
                            message: "Please enter your Host",
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-slate-500" />}
                        placeholder="e.g. smtp.gmail.com"
                        className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-600! h-11!"
                    />
                </Form.Item>
                <Form.Item
                    label={<span className="text-slate-300 font-medium">Port</span>}
                    name="port"
                    tooltip="Set the port of your SMTP server"
                    rules={[
                        {
                            required: isRequired,
                            message: "Please enter your Port",
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="text-slate-500" />}
                        placeholder="e.g. 587"
                        className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-600! h-11!"
                    />
                </Form.Item>
            </div>

            <div>
                <Form.Item
                    label={<span className="text-slate-300 font-medium">Secure</span>}
                    name="secure"
                    tooltip="Set the secure of your SMTP server"
                    rules={[
                        {
                            required: isRequired!,
                            message: "Please select secure",
                        },
                    ]}
                >
                    <Select
                        placeholder="Select secure"
                        options={[
                            { value: true, label: "True" },
                            { value: false, label: "False (Recomended)" },
                        ]}
                        className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-600! h-11!"
                    />
                </Form.Item>

                {
                    !isRequired && (
                        <Form.Item
                            label={<span className="text-slate-300 font-medium">Status</span>}
                            name="isActive"
                            tooltip="Set the status of your SMTP server"
                        >
                            <Select
                                placeholder="Select status"
                                options={[
                                    { value: true, label: "Active (Recommended)" },
                                    { value: false, label: "Inactive if you don't want to use this SMTP config (Not Recommended)" },
                                ]}
                                className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-600! h-11!"
                            />
                        </Form.Item>
                    )
                }
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-700/50">
                {
                    test && (
                        <Button
                            loading={test.isConfigTestLoading}
                            onClick={() => test.handleTest()}
                            icon={<ApiOutlined />}
                            className="py-2! md:py-5! flex-1 bg-transparent! border-slate-600! text-slate-300! hover:text-white! hover:border-slate-400!"
                        >
                            Test Configuration
                        </Button>
                    )
                }
                <Button
                    loading={submit.isLoading}
                    type="primary"
                    icon={<SaveOutlined />}
                    htmlType="submit"
                    className="py-2! md:py-5! flex-1 bg-blue-600! border-none! text-white! font-semibold hover:bg-blue-500! shadow-lg shadow-blue-900/20"
                >
                    Save Settings
                </Button>
            </div>
        </Form>
    );
};

export default ConfigForm;

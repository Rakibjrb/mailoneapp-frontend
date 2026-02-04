"use client";

import React from "react";
import { Card, Form, Input, Button } from "antd";
import {
    SaveOutlined,
    ApiOutlined,
    UserOutlined,
    LockOutlined,
    MailOutlined
} from "@ant-design/icons";

const ConfigurationsPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl mx-auto">
            <Card
                className="w-full bg-slate-800/40! border-slate-700/50! backdrop-blur-md! shadow-2xl relative overflow-hidden"
                variant="outlined"
            >
                <h4 className="text-xl font-semibold mb-6 text-slate-400">Manage your SMTP mail server Configurations</h4>
                {/* Decorative background blur element */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <Form layout="vertical" className="relative z-10 space-y-5">
                    <Form.Item
                        label={<span className="text-slate-300 font-medium">Sender Name</span>}
                        name="senderName"
                        tooltip="The name that will appear as the sender in emails."
                        initialValue="MailOne System"
                    >
                        <Input
                            prefix={<UserOutlined className="text-slate-500" />}
                            placeholder="e.g. Acme Corp Support"
                            className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-600! h-11!"
                        />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            label={<span className="text-slate-300 font-medium">SMTP User</span>}
                            name="smtpUser"
                            className="mb-0"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input
                                prefix={<MailOutlined className="text-slate-500" />}
                                placeholder="user@smtp.com"
                                className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-600! h-11!"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-slate-300 font-medium">SMTP Password</span>}
                            name="smtpPassword"
                            className="mb-0"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-slate-500" />}
                                placeholder="••••••••••••"
                                className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-600! h-11!"
                            />
                        </Form.Item>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-700/50">
                        <Button
                            icon={<ApiOutlined />}
                            className="h-11! flex-1 bg-transparent! border-slate-600! text-slate-300! hover:text-white! hover:border-slate-400!"
                        >
                            Test Configuration
                        </Button>
                        <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            htmlType="submit"
                            className="h-11! flex-1 bg-blue-600! border-none! text-white! font-semibold hover:bg-blue-500! shadow-lg shadow-blue-900/20"
                        >
                            Save Settings
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default ConfigurationsPage;

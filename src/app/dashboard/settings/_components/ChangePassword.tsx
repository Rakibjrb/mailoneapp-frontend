"use client";

import React from "react";
import { Button, Form, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const ChangePassword = () => {
    return (
        <div className="py-2 space-y-6">
            <Form layout="vertical" className="w-full!">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item label={<span className="text-slate-300">Current Password</span>}>
                        <Input defaultValue="rakib@mailone.com" className="bg-slate-900/50! border-slate-700! text-white! p-2!" type="password" />
                    </Form.Item>
                    <Form.Item label={<span className="text-slate-300">New Password</span>}>
                        <Input defaultValue="rakib@mailone.com" className="bg-slate-900/50! border-slate-700! text-white! p-2!" type="password" />
                    </Form.Item>
                </div>
                <Form.Item label={<span className="text-slate-300">Confirm Password</span>}>
                    <Input defaultValue="rakib@mailone.com" className="bg-slate-900/50! border-slate-700! text-white! p-2!" type="password" />
                </Form.Item>

                <div className="flex justify-end pt-6 mt-6 border-t border-slate-700/50">
                    <Button type="primary" icon={<SaveOutlined />} className="bg-blue-600 border-none px-4!">
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ChangePassword;

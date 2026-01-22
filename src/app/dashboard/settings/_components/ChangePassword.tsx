"use client";

import React from "react";
import { Card, Button, Tabs, Form, Input, Switch, Avatar, Divider } from "antd";
import { UserOutlined, BellOutlined, LockOutlined, GlobalOutlined, SaveOutlined } from "@ant-design/icons";

const ChangePassword = () => {
    return (
        <div className="py-2 space-y-6">
            <Form layout="vertical" className="w-full!">
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label={<span className="text-slate-300">Current Password</span>}>
                        <Input defaultValue="rakib@mailone.com" className="bg-slate-900/50! border-slate-700! text-white! p-2!" />
                    </Form.Item>
                    <Form.Item label={<span className="text-slate-300">New Password</span>}>
                        <Input defaultValue="rakib@mailone.com" className="bg-slate-900/50! border-slate-700! text-white! p-2!" />
                    </Form.Item>
                </div>
                <Form.Item label={<span className="text-slate-300">Confirm Password</span>}>
                    <Input defaultValue="rakib@mailone.com" className="bg-slate-900/50! border-slate-700! text-white! p-2!" />
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;

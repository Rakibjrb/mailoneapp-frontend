"use client";

import React from "react";
import { Card, Button, Tabs, Form, Input, Switch, Avatar, Divider } from "antd";
import { UserOutlined, BellOutlined, LockOutlined, GlobalOutlined, SaveOutlined } from "@ant-design/icons";

const ProfileSettings = () => {
    return (
        <div className="py-2 space-y-6">
            <div className="flex items-center gap-6">
                <Avatar size={80} icon={<UserOutlined />} className="bg-blue-600/20! text-blue-500! border! border-blue-500/30!" />
                <div>
                    <h3 className="text-white font-semibold">Profile Photo</h3>
                    <p className="text-slate-400 text-sm my-3">Update your avatar and personal details.</p>
                    <Button size="small" className="bg-slate-700! border-slate-600! text-white!">Change Avatar</Button>
                </div>
            </div>
            <Form layout="vertical" className="w-full!">
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label={<span className="text-slate-300">Full Name</span>}>
                        <Input defaultValue="Rakibul Hasan" className="bg-slate-900/50! border-slate-700! text-white! p-2!" />
                    </Form.Item>
                    <Form.Item label={<span className="text-slate-300">Email Address</span>}>
                        <Input defaultValue="rakib@mailone.com" className="bg-slate-900/50! border-slate-700! text-white! p-2!" disabled />
                    </Form.Item>
                </div>
                <Form.Item label={<span className="text-slate-300">Bio</span>}>
                    <Input.TextArea rows={4} placeholder="Software Engineer & Designer" className="bg-slate-900/50! border-slate-700! text-white!" />
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProfileSettings;

"use client";

import React from "react";
import { Button, Form, Input, Avatar, } from "antd";
import { SaveOutlined, UserOutlined } from "@ant-design/icons";

const ProfileSettings = () => {
    return (
        <div className="py-2 space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar size={80} icon={<UserOutlined />} className="bg-blue-600/20! text-blue-500! border! border-blue-500/30!" />
                <div>
                    <h3 className="text-white font-semibold">Profile Photo</h3>
                    <p className="text-slate-400 text-sm my-3">Update your avatar and personal details.</p>
                    <Button size="small" className="bg-slate-700! border-slate-600! text-white!">Change Avatar</Button>
                </div>
            </div>
            <Form layout="vertical" className="w-full!">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="flex justify-end pt-6 mt-6 border-t border-slate-700/50">
                    <Button type="primary" icon={<SaveOutlined />} className="bg-blue-600 border-none px-4!">
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ProfileSettings;

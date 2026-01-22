"use client";

import React from "react";
import { Card, Button, Tabs, Form, Input, Switch, Avatar, Divider } from "antd";
import { UserOutlined, BellOutlined, LockOutlined, GlobalOutlined, SaveOutlined } from "@ant-design/icons";

const SettingsPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-slate-400">Configure your account preferences and application settings.</p>
            </div>

            <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-md ant-tabs-premium" bordered={false}>
                <Tabs
                    defaultActiveKey="profile"
                    className="custom-tabs"
                    items={[
                        {
                            key: 'profile',
                            label: <span className="flex items-center gap-2"><UserOutlined />Profile</span>,
                            children: (
                                <div className="py-2 space-y-6">
                                    <div className="flex items-center gap-6">
                                        <Avatar size={80} icon={<UserOutlined />} className="bg-blue-600/20 text-blue-500 border border-blue-500/30" />
                                        <div>
                                            <h3 className="text-white font-semibold">Profile Photo</h3>
                                            <p className="text-slate-400 text-sm mb-3">Update your avatar and personal details.</p>
                                            <Button size="small" className="bg-slate-700 border-slate-600 text-white">Change Avatar</Button>
                                        </div>
                                    </div>
                                    <Form layout="vertical" className="max-w-2xl">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Form.Item label={<span className="text-slate-300">Full Name</span>}>
                                                <Input defaultValue="Rakibul Hasan" className="bg-slate-900/50 border-slate-700 text-white" />
                                            </Form.Item>
                                            <Form.Item label={<span className="text-slate-300">Email Address</span>}>
                                                <Input defaultValue="rakib@mailone.com" className="bg-slate-900/50 border-slate-700 text-white" />
                                            </Form.Item>
                                        </div>
                                        <Form.Item label={<span className="text-slate-300">Bio</span>}>
                                            <Input.TextArea placeholder="Software Engineer & Designer" className="bg-slate-900/50 border-slate-700 text-white" />
                                        </Form.Item>
                                    </Form>
                                </div>
                            ),
                        },
                        {
                            key: 'notifications',
                            label: <span className="flex items-center gap-2"><BellOutlined />Notifications</span>,
                            children: (
                                <div className="py-2 space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-slate-900/30 rounded-lg">
                                        <div>
                                            <p className="text-white font-medium">Email Notifications</p>
                                            <p className="text-slate-400 text-sm">Receive digest emails about your activity.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-slate-900/30 rounded-lg">
                                        <div>
                                            <p className="text-white font-medium">Browser Push</p>
                                            <p className="text-slate-400 text-sm">Get real-time updates in your browser.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </div>
                            ),
                        }
                    ]}
                />
                <div className="flex justify-end pt-6 mt-6 border-t border-slate-700/50">
                    <Button type="primary" icon={<SaveOutlined />} className="bg-blue-600 border-none px-8">
                        Save Changes
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default SettingsPage;

"use client";

import React from "react";
import { Card, Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ProfileSettings from "./_components/ProfileSettings";
import ChangePassword from "./_components/ChangePassword";

const SettingsPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-slate-400">Configure your account preferences and application settings.</p>
            </div>

            <Card className="bg-slate-800/40! border-slate-700/50! backdrop-blur-md! ant-tabs-premium" variant="outlined">
                <Tabs
                    defaultActiveKey="profile"
                    className="custom-tabs"
                    items={[
                        {
                            key: 'profile',
                            label: <span className="flex items-center gap-2"><UserOutlined />Profile Settings</span>,
                            children: <ProfileSettings />,
                        },
                        {
                            key: 'password',
                            label: <span className="flex items-center gap-2"><LockOutlined />Change Password</span>,
                            children: <ChangePassword />,
                        },
                    ]}
                />
            </Card>
        </div>
    );
};

export default SettingsPage;

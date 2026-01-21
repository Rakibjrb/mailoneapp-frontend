"use client";

import React from "react";
import { Layout, Menu, } from "antd";
import {
    DashboardOutlined,
    InboxOutlined,
    SendOutlined,
    FileTextOutlined,
    DeleteOutlined,
    SettingOutlined,
    MailOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
    const pathname = usePathname();

    const menuItems = [
        {
            key: "/dashboard",
            icon: <DashboardOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>,
        },
        {
            key: "/dashboard/inbox",
            icon: <InboxOutlined />,
            label: <Link href="/dashboard/inbox">Inbox</Link>,
        },
        {
            key: "/dashboard/sent",
            icon: <SendOutlined />,
            label: <Link href="/dashboard/sent">Sent</Link>,
        },
        {
            key: "/dashboard/drafts",
            icon: <FileTextOutlined />,
            label: <Link href="/dashboard/drafts">Drafts</Link>,
        },
        {
            key: "/dashboard/trash",
            icon: <DeleteOutlined />,
            label: <Link href="/dashboard/trash">Trash</Link>,
        },
        {
            type: 'divider' as const,
        },
        {
            key: "/dashboard/settings",
            icon: <SettingOutlined />,
            label: <Link href="/dashboard/settings">Settings</Link>,
        },
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
            width={260}
            collapsedWidth={80}
            className="h-screen z-50 border-r border-slate-800/50 backdrop-blur-3xl!"
            style={{
                background: 'rgba(15, 23, 42, 0.4)'
            }}
        >
            <div className="flex flex-col h-full">
                {/* Logo Section */}
                <div onClick={() => setCollapsed(!collapsed)} className={`cursor-pointer flex items-center gap-3 transition-all duration-300 ${collapsed ? 'justify-center py-6' : 'justify-start p-6'}`}>
                    <div className=" w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 shrink-0">
                        <MailOutlined className="text-white text-xl" />
                    </div>
                    {!collapsed && (
                        <span className="text-white font-bold text-xl tracking-tight whitespace-nowrap overflow-hidden">
                            Mail<span className="text-blue-500">ONE</span>
                        </span>
                    )}
                </div>

                {/* Menu Section */}
                <div className="flex-1 overflow-y-auto mt-4 px-2">
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[pathname]}
                        items={menuItems}
                        className="bg-transparent! border-none!"
                        style={{
                            background: 'transparent',
                        }}
                    />
                </div>
            </div>
        </Sider>
    );
};

export default Sidebar;
"use client";

import React from "react";
import { Layout, Menu, } from "antd";
import {
    SettingOutlined,
    MailOutlined,
    AppstoreOutlined,
    FileTextOutlined,
    EditOutlined,
    ControlOutlined,
    DeleteOutlined,
    PlusOutlined,
    InboxOutlined,
    LogoutOutlined,
    HomeOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout as authLogout } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useToast } from "@/context/ToastContext";

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const { toast } = useToast();

    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        const refreshToken = Cookies.get("refreshToken");
        try {
            await logout({ refreshToken }).unwrap();
        } catch (error) {
            toast("Server Logout failed", "error");
        } finally {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            dispatch(authLogout());
            router.push("/login");
            toast("Logout successfully", "success");
        }
    };

    const menuItems = [
        {
            key: "/dashboard",
            icon: <AppstoreOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>,
        },
        {
            key: "/dashboard/mail-management",
            icon: <MailOutlined />,
            label: <div>Mail Management</div>,
            children: [
                {
                    key: "/dashboard/mail-management/all-mail",
                    icon: <InboxOutlined />,
                    label: <Link href="/dashboard/mail-management/all-mail">All Mail</Link>,
                },
                {
                    key: "/dashboard/mail-management/add-mail",
                    icon: <PlusOutlined />,
                    label: <Link href="/dashboard/mail-management/add-mail">Add Mail</Link>,
                },
            ]
        },
        {
            key: "/dashboard/templates",
            icon: <FileTextOutlined />,
            label: <Link href="/dashboard/templates">Templates</Link>,
        },
        {
            key: "/dashboard/customize-template",
            icon: <EditOutlined />,
            label: <Link href="/dashboard/customize-template">Customize Template</Link>,
        },
        {
            key: "/dashboard/configurations",
            icon: <ControlOutlined />,
            label: <Link href="/dashboard/configurations">Configurations</Link>,
        },
        {
            key: "/dashboard/trash",
            icon: <DeleteOutlined />,
            label: <Link href="/dashboard/trash">Trash</Link>,
        },
    ];

    const settingsItem = [
        {
            key: "/dashboard/settings",
            icon: <SettingOutlined />,
            label: <Link href="/dashboard/settings">Settings</Link>,
        },
        {
            key: "/home",
            icon: <HomeOutlined />,
            label: <Link href="/">Go to Home</Link>,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <button className="w-full text-left cursor-pointer" onClick={handleLogout}>Logout</button>,
        }
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
            width={260}
            collapsedWidth={60}
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

                {/* Settings Section - Bottom */}
                <div className="px-2 pb-4 border-t border-slate-800/50 pt-2">
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[pathname]}
                        items={settingsItem}
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
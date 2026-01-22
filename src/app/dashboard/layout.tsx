"use client";


import React, { useState, useEffect } from "react";
import { Typography, ConfigProvider, theme, Badge, Avatar } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import Sidebar from "@/components/shared/Dashboard/Sidebar";

const { Text } = Typography;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        // Set initial state
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: "#3b82f6",
                    borderRadius: 12,
                },
                components: {
                    Layout: {
                        bodyBg: "#020617",
                        headerBg: "rgba(15, 23, 42, 0.4)",
                        headerPadding: "0 24px",
                    },
                    Menu: {
                        itemBg: "transparent",
                        itemSelectedBg: "rgba(59, 130, 246, 0.1)",
                        itemSelectedColor: "#3b82f6",
                        itemHoverBg: "rgba(51, 65, 85, 0.4)",
                    }
                },
            }}
        >
            <div className="flex w-full h-screen relative overflow-hidden! ">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

                <div className="flex flex-col w-full h-full overflow-y-auto">
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.4)'
                    }} className="p-4 w-full flex items-center justify-end md:justify-between border-b border-slate-800 backdrop-blur-3xl shrink-0 z-40 sticky top-0">
                        <div className="hidden md:block md:text-xl mb-0! text-white! font-bold tracking-tight">
                            Welcome to Dashboard
                        </div>

                        <div className="flex items-center gap-6">
                            <Badge count={3} size="small" offset={[-2, 2]} color="#3b82f6">
                                <Button
                                    icon={<BellOutlined className="text-xl text-slate-400 hover:text-white transition-colors" />}
                                    className="flex items-center justify-center p-0 h-8 w-8 hover:bg-slate-800/50"
                                    onClick={() => { console.log("Notification clicked") }}
                                />
                            </Badge>

                            <div className="flex items-center gap-3 pl-2 border-l border-slate-800/60">
                                <Text className="text-white text-sm font-bold leading-tight">Rakibul Hasan</Text>

                                <Avatar
                                    icon={<UserOutlined />}
                                    className="bg-blue-600/20 text-blue-500 border border-blue-500/30 cursor-pointer hover:scale-105 transition-transform"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4">{children}</div>
                </div>
            </div>
        </ConfigProvider>
    );
}

// Minimal Button implementation since we don't want to import everything
function Button({ icon, className, onClick }: { icon: React.ReactElement, className: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`cursor-pointer transition-all ${className}`}
        >
            {icon}
        </button>
    );
}

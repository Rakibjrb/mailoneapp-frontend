"use client";

import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
    MailOutlined,
    FileTextOutlined,
    DeleteOutlined,
    InboxOutlined,
} from "@ant-design/icons";

const DashboardPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-slate-400">Welcome back! Here's what's happening with your mail system.</p>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card
                        className="bg-gradient-to-br! from-blue-600/20! to-blue-900/20! border-blue-500/20! backdrop-blur-md! hover:from-blue-600/30! hover:to-blue-900/30! transition-all! duration-300!"
                        bordered={false}
                    >
                        <Statistic
                            title={<span className="text-blue-100/70!">Total Mails</span>}
                            value={1234}
                            prefix={<MailOutlined className="text-blue-400!" />}
                            valueStyle={{ color: "#fff", fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card
                        className="bg-gradient-to-br! from-emerald-600/20! to-emerald-900/20! border-emerald-500/20! backdrop-blur-md! hover:from-emerald-600/30! hover:to-emerald-900/30! transition-all! duration-300!"
                        bordered={false}
                    >
                        <Statistic
                            title={<span className="text-emerald-100/70!">Inbox</span>}
                            value={567}
                            prefix={<InboxOutlined className="text-emerald-400!" />}
                            valueStyle={{ color: "#fff", fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card
                        className="bg-gradient-to-br! from-purple-600/20! to-purple-900/20! border-purple-500/20! backdrop-blur-md! hover:from-purple-600/30! hover:to-purple-900/30! transition-all! duration-300!"
                        bordered={false}
                    >
                        <Statistic
                            title={<span className="text-purple-100/70!">Templates</span>}
                            value={23}
                            prefix={<FileTextOutlined className="text-purple-400!" />}
                            valueStyle={{ color: "#fff", fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card
                        className="bg-gradient-to-br! from-rose-600/20! to-rose-900/20! border-rose-500/20! backdrop-blur-md! hover:from-rose-600/30! hover:to-rose-900/30! transition-all! duration-300!"
                        bordered={false}
                    >
                        <Statistic
                            title={<span className="text-rose-100/70!">Trash</span>}
                            value={89}
                            prefix={<DeleteOutlined className="text-rose-400!" />}
                            valueStyle={{ color: "#fff", fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <Card
                        title={<span className="text-white font-semibold!">Recent Activity</span>}
                        className="bg-gradient-to-b! from-slate-800/40! to-slate-900/60! border-slate-700/50! backdrop-blur-md!"
                        bordered={false}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                                <div>
                                    <p className="text-white font-medium">New mail received</p>
                                    <p className="text-slate-400 text-sm">2 minutes ago</p>
                                </div>
                                <MailOutlined className="text-blue-500 text-xl" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                                <div>
                                    <p className="text-white font-medium">Template created</p>
                                    <p className="text-slate-400 text-sm">1 hour ago</p>
                                </div>
                                <FileTextOutlined className="text-purple-500 text-xl" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                                <div>
                                    <p className="text-white font-medium">Mail moved to trash</p>
                                    <p className="text-slate-400 text-sm">3 hours ago</p>
                                </div>
                                <DeleteOutlined className="text-red-500 text-xl" />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardPage;
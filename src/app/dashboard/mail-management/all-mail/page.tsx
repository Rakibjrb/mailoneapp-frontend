"use client";

import React from "react";
import { Card, Table, Tag, Space, Button, Input } from "antd";
import { SearchOutlined, ReloadOutlined, FilterOutlined } from "@ant-design/icons";

const AllMailPage = () => {
    const columns = [
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: (text: string) => <span className="text-white font-medium">{text}</span>,
        },
        {
            title: 'Recipient',
            dataIndex: 'recipient',
            key: 'recipient',
            render: (text: string) => <span className="text-slate-300">{text}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'Sent' ? 'blue' : 'orange'} className="rounded-full px-3">
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => <span className="text-slate-400 text-sm">{text}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button type="link" className="text-blue-400 p-0">View</Button>
                    <Button type="link" className="text-rose-400 p-0">Delete</Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            subject: 'Welcome to MailONE',
            recipient: 'user@example.com',
            status: 'Sent',
            date: '2024-03-20 10:30',
        },
        {
            key: '2',
            subject: 'Monthly Newsletter',
            recipient: 'subscribers@list.com',
            status: 'Pending',
            date: '2024-03-21 14:15',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">All Mails</h1>
                    <p className="text-slate-400">View and manage all your sent and received emails.</p>
                </div>
                <div className="flex gap-2">
                    <Button icon={<ReloadOutlined />} className="bg-slate-800 border-slate-700 text-slate-300" />
                    <Button icon={<FilterOutlined />} className="bg-slate-800 border-slate-700 text-slate-300">Filter</Button>
                </div>
            </div>

            <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-md" bordered={false}>
                <div className="mb-4">
                    <Input
                        prefix={<SearchOutlined className="text-slate-400" />}
                        placeholder="Search mails..."
                        className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 max-w-md"
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="ant-table-premium"
                    rowClassName="bg-transparent hover:bg-slate-700/20 transition-colors cursor-pointer"
                />
            </Card>
        </div>
    );
};

export default AllMailPage;

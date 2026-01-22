"use client";

import React from "react";
import { Card, Table, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, ReloadOutlined, FilterOutlined, DeleteOutlined } from "@ant-design/icons";

interface DataType {
    key: string;
    name: string;
    email: string;
    date: string;
    selected: boolean;
}

const AllMailPage = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <span className="text-slate-300">{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: string) => <span className="text-slate-300">{text}</span>,
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
            align: "right",
            render: (record: DataType) => <div className="flex gap-3 items-center justify-end">
                <Button className="text-blue-400! px-4! py-1! hover:text-blue-500!">{record.selected ? "Unselect" : "Select"}</Button>
                <Button className="text-rose-400! px-4! py-1! hover:text-rose-500! border-rose-400! hover:border-rose-500!">
                    <DeleteOutlined />
                </Button>
            </div>
        },
    ];

    const data = [
        {
            key: "1",
            name: "Rakibul Hasan",
            email: 'user@example.com',
            date: '2024-03-20 10:30',
            selected: true,
        },
        {
            key: "2",
            name: "Refayet Hasan",
            email: 'subscribers@list.com',
            date: '2024-03-21 14:15',
            selected: false,
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
                    <Button icon={<ReloadOutlined />} className="bg-slate-800! border-slate-700! text-slate-300! hover:bg-slate-700! hover:border-slate-600! hover:text-slate-200!" />
                    <Button icon={<FilterOutlined />} className="bg-slate-800! border-slate-700! text-slate-300! hover:bg-slate-700! hover:border-slate-600! hover:text-slate-200!">Filter</Button>
                </div>
            </div>

            <Card className="bg-slate-800/40! border-slate-700/50! backdrop-blur-md! overflow-x-auto!">
                <div className="mb-4">
                    <Input
                        prefix={<SearchOutlined className="text-slate-400!" />}
                        placeholder="Search ..."
                        className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-500! max-w-md!"
                    />
                </div>
                <div className="h-full w-full min-w-[700px]">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        className="ant-table-premium"
                        rowClassName="bg-transparent! hover:bg-slate-700/20! transition-colors! cursor-pointer!"
                    />
                </div>
            </Card>
        </div>
    );
};

export default AllMailPage;

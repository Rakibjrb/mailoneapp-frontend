"use client";

import React from "react";
import { Card, Button, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const TrashPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Trash</h1>
                    <p className="text-slate-400">Items in trash will be automatically deleted after 30 days.</p>
                </div>
                <Button danger icon={<DeleteOutlined />} className="hover:bg-rose-500/10!">
                    Empty Trash
                </Button>
            </div>

            <Card className="bg-slate-800/40! border-slate-700/50! backdrop-blur-md!" variant="outlined">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<span className="text-slate-500">Trash is empty</span>}
                    className="py-12"
                />
            </Card>
        </div>
    );
};

export default TrashPage;

"use client";

import React from "react";
import { Card, Row, Col, Button, Tag } from "antd";
import { PlusOutlined, EditOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";

const TemplatesPage = () => {


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Mail Templates</h1>
                    <p className="text-slate-400">Manage and reuse your beautifully designed email templates.</p>
                </div>
                <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 border-none px-6">
                    Create New
                </Button>
            </div>
        </div>
    );
};

export default TemplatesPage;

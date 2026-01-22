"use client";

import React from "react";
import { Card, Row, Col, Button, Tag } from "antd";
import { PlusOutlined, EditOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";

const TemplatesPage = () => {
    const templates = [
        { id: 1, name: 'Welcome Email', category: 'Onboarding', usage: 124 },
        { id: 2, name: 'Monthly Newsletter', category: 'Marketing', usage: 89 },
        { id: 3, name: 'Password Reset', category: 'System', usage: 245 },
        { id: 4, name: 'Product Update', category: 'Marketing', usage: 56 },
    ];

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

            <Row gutter={[20, 20]}>
                {templates.map(template => (
                    <Col xs={24} sm={12} lg={8} key={template.id}>
                        <Card
                            className="bg-slate-800/40 border-slate-700/50 backdrop-blur-md group hover:border-blue-500/30 transition-all duration-300"
                            bordered={false}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-white font-semibold text-lg">{template.name}</h3>
                                <Tag className="bg-blue-500/10 border-blue-500/20 text-blue-400 m-0">
                                    {template.category}
                                </Tag>
                            </div>
                            <div className="text-slate-400 text-sm mb-6">
                                Used {template.usage} times in the last 30 days.
                            </div>
                            <div className="flex gap-2 pt-4 border-t border-slate-700/50">
                                <Button size="small" icon={<EditOutlined />} className="bg-slate-900 border-slate-700 text-slate-400 flex-1">Edit</Button>
                                <Button size="small" icon={<CopyOutlined />} className="bg-slate-900 border-slate-700 text-slate-400 flex-1">Duplicate</Button>
                                <Button size="small" icon={<DeleteOutlined />} className="border-rose-500/20 text-rose-400 hover:bg-rose-500/10 min-w-[40px]" />
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default TemplatesPage;

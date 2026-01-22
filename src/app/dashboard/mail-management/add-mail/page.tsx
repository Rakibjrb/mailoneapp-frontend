"use client";

import React from "react";
import { Card, Form, Input, Button, Select, Space, Upload } from "antd";
import { SendOutlined, SaveOutlined, PaperClipOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddMailPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Compose Mail</h1>
                <p className="text-slate-400">Create and send a new email to your recipients.</p>
            </div>

            <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-md max-w-4xl" bordered={false}>
                <Form layout="vertical">
                    <Form.Item label={<span className="text-slate-300">Recipient Email</span>}>
                        <Input placeholder="example@mail.com" className="bg-slate-900/50 border-slate-700 text-white" />
                    </Form.Item>

                    <Form.Item label={<span className="text-slate-300">Subject</span>}>
                        <Input placeholder="Enter mail subject" className="bg-slate-900/50 border-slate-700 text-white" />
                    </Form.Item>

                    <Form.Item label={<span className="text-slate-300">Template</span>}>
                        <Select placeholder="Select a template (optional)" className="bg-slate-900/50 border-slate-700 text-white">
                            <Option value="welcome">Welcome Email</Option>
                            <Option value="newsletter">Monthly Newsletter</Option>
                            <Option value="promo">Promotional Offer</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={<span className="text-slate-300">Message</span>}>
                        <Input.TextArea rows={8} placeholder="Type your message here..." className="bg-slate-900/50 border-slate-700 text-white" />
                    </Form.Item>

                    <Form.Item>
                        <Upload>
                            <Button icon={<PaperClipOutlined />} className="bg-slate-800 border-slate-700 text-slate-300">
                                Attach Files
                            </Button>
                        </Upload>
                    </Form.Item>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
                        <Button icon={<SaveOutlined />} className="bg-slate-800 border-slate-700 text-slate-300">
                            Save as Draft
                        </Button>
                        <Button type="primary" icon={<SendOutlined />} className="bg-blue-600 border-none px-8">
                            Send Mail
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default AddMailPage;

"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import { useToast } from "@/context/ToastContext";
import { TemplateData } from "@/types/template.types";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";

type TemplateForm = {
    submit: {
        onSubmit: (data: TemplateData) => void;
        isLoading: boolean;
    };
    isUpdate: boolean;
}

const TemplateForm = ({ submit, isUpdate }: TemplateForm) => {
    const { toast } = useToast();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        const { name, subject, html, plainText } = values;
        const templateData: TemplateData = {
            name,
            subject,
            html,
            plainText,
            variables: [],
        }

        const hasVariables = ["{{name}}", "{{date}}"].filter((v: string) => html.includes(v));
        if (!hasVariables.length) {
            toast("No variables detected on this template code");
        }

        if (hasVariables.length > 0) {
            templateData.variables = hasVariables;
        }
        submit.onSubmit(templateData);
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical" className="space-y-2">
            <div className="flex flex-col lg:flex-row gap-4">
                <Form.Item
                    className="w-full"
                    label={<span className="text-slate-300 font-medium">Template Name</span>}
                    name="name"
                    rules={[{ required: !isUpdate, message: 'Please enter a template name' }]}
                >
                    <Input
                        placeholder="e.g. My Template"
                        className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-500! h-11"
                    />
                </Form.Item>

                <Form.Item
                    className="w-full"
                    label={<span className="text-slate-300 font-medium">Template Subject</span>}
                    name="subject"
                    rules={[
                        { required: !isUpdate, message: 'Please enter a subject' },
                    ]}
                >
                    <Input
                        placeholder="e.g. Template Subject"
                        className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-500! h-11"
                    />
                </Form.Item>
            </div>

            <div>
                <span className="text-slate-500 mb-2 block text-sm">
                    Personalize your template by using <code className="text-indigo-400 font-mono">{"{{ name }}"}</code> or <code className="text-indigo-400 font-mono">{"{{ date }}"}</code>. They'll be replaced automatically.
                </span>
                <Form.Item
                    rules={[{ required: !isUpdate, message: "Template must have in html code" }]}
                    name={"html"} label={<span className="text-slate-300">Template HTML code</span>}>
                    <Input.TextArea rows={20} placeholder="html" className="bg-slate-900/50! border-slate-700! text-white!" />
                </Form.Item>
            </div>

            <Form.Item
                rules={[{ required: !isUpdate, message: "Template must have in plain text also not html code!" }]}
                name={"plainText"} label={<span className="text-slate-300">Template PlainText</span>}>
                <Input.TextArea rows={8} placeholder="write in plain text" className="bg-slate-900/50! border-slate-700! text-white!" />
            </Form.Item>

            <div className="pt-1">
                <Button
                    type="primary"
                    icon={!isUpdate ? <PlusOutlined /> : <SaveOutlined />}
                    className="w-full h-11! bg-blue-600! border-none! text-white font-bold hover:bg-blue-500! transition-all shadow-lg shadow-blue-900/20 uppercase"
                    htmlType="submit"
                >
                    {!isUpdate ? "Create Now" : "Save Now"}
                </Button>
            </div>
        </Form>
    )
}

export default TemplateForm;
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Modal, Form, Select, Button, Radio } from "antd";

interface FilterModalProps {
    open: boolean;
    onClose: () => void;
    onApply: (values: any) => void;
}

const FilterModal = ({ open, onClose, onApply }: FilterModalProps) => {
    const [form] = Form.useForm();

    const handleApply = () => {
        form.validateFields().then((values) => {
            onApply(values);
            onClose();
        });
    };

    return (
        <Modal
            title={<span className="text-white">Filter Options</span>}
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose} className="border-slate-600! text-slate-300! hover:text-white! hover:border-slate-500!">
                    Cancel
                </Button>,
                <Button key="apply" type="primary" onClick={handleApply} className="bg-blue-600! hover:bg-blue-500!">
                    Apply Filter
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" initialValues={{ sortBy: 'date', sortOrder: 'desc', isSelected: 'all' }}>
                <Form.Item name="sortBy" label={<span className="text-slate-300">Sort By</span>}>
                    <Select
                        className="bg-slate-900/50! text-white!"
                        classNames={{ popup: { root: "bg-slate-900! border! border-slate-700!" } }}
                        options={[
                            { label: 'Date', value: 'date' },
                            { label: 'Name', value: 'name' },
                            { label: 'Email', value: 'email' },
                        ]}
                    />
                </Form.Item>

                <Form.Item name="sortOrder" label={<span className="text-slate-300!">Sort Order</span>}>
                    <Radio.Group className="flex! gap-4!">
                        <Radio value="asc" className="text-slate-300!">Ascending</Radio>
                        <Radio value="desc" className="text-slate-300!">Descending</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="isSelected" label={<span className="text-slate-300!">Selection Status</span>}>
                    <Select
                        className="bg-slate-900/50! text-white!"
                        classNames={{ popup: { root: "bg-slate-900! border! border-slate-700!" } }}
                        options={[
                            { label: 'All', value: 'all' },
                            { label: 'Selected Only', value: 'true' },
                            { label: 'Unselected Only', value: 'false' },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default FilterModal;

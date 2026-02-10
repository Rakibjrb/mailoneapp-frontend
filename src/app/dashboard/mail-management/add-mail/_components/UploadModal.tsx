"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React, { useState } from "react";
import { Modal, Upload, Button } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { useToast } from "@/context/ToastContext";

const { Dragger } = Upload;

interface UploadModalProps {
    open: boolean;
    onClose: () => void;
    handleUpload: (files: any) => Promise<void>;
    isLoading: boolean;
}

const UploadModal: React.FC<UploadModalProps> = ({ open, onClose, handleUpload, isLoading }) => {
    const [files, setFiles] = useState<any>([]);
    const { toast } = useToast();

    const handleChange: UploadProps['onChange'] = (info) => {
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-1);
        setFiles(newFileList);
    };

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        fileList: files,
        onChange: handleChange,
        beforeUpload: (uploadFile) => {
            const isAllowed =
                uploadFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                uploadFile.type === 'application/vnd.ms-excel' ||
                uploadFile.type === 'text/csv' ||
                uploadFile.name.endsWith('.csv') ||
                uploadFile.name.endsWith('.xls') ||
                uploadFile.name.endsWith('.xlsx');

            if (!isAllowed) {
                toast(`${uploadFile.name} is not a valid file (xlsx, xls, csv)`, "error");
                return Upload.LIST_IGNORE;
            }
            return false;
        },
        maxCount: 1,
        accept: ".xlsx,.xls,.csv"
    };

    return (
        <Modal
            title={<span className="text-white">Upload Mail Data</span>}
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose} className="border-slate-600! text-slate-300! hover:text-white! hover:border-slate-500!">
                    Cancel
                </Button>,
                <Button
                    key="upload"
                    type="primary"
                    loading={isLoading}
                    onClick={() => handleUpload(files)}
                    icon={<UploadOutlined />}
                    className="bg-blue-600! hover:bg-blue-500!"
                >
                    {isLoading ? 'Uploading...' : 'Upload'}
                </Button>,
            ]}
        >
            <div className="py-6">
                <Dragger {...props} className="bg-slate-800/20! border-slate-600! hover:border-blue-500/50! group">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined className="text-blue-500/70 group-hover:text-blue-500 transition-colors" />
                    </p>
                    <p className="ant-upload-text text-slate-300">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint text-slate-400">
                        Support for .xlsx, .xls, and .csv files.
                    </p>
                </Dragger>
            </div>
        </Modal>
    );
};

export default UploadModal;

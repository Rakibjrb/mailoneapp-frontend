"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React, { useState } from "react";
import { Modal, Upload, Button } from "antd";
import { PictureOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useToast } from "@/context/ToastContext";

const { Dragger } = Upload;

interface UploadModalProps {
    open: boolean;
    onClose: () => void;
    handleUpload: (files: any) => void;
}

const UploadImageModal: React.FC<UploadModalProps> = ({ open, onClose, handleUpload }) => {
    const [files, setFiles] = useState<any>([]);
    const { toast } = useToast();

    const handleChange: UploadProps['onChange'] = (info) => {
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-1);
        setFiles(newFileList);
    };

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        fileList: files,
        onChange: handleChange,
        beforeUpload: (uploadFile) => {
            const isImage = uploadFile.type.startsWith('image/');
            const isLt2M = uploadFile.size / 1024 / 1024 < 5;

            if (!isImage) {
                toast(`${uploadFile.name} is not a valid image file`, "error");
                return Upload.LIST_IGNORE;
            }
            if (!isLt2M) {
                toast("Image must be smaller than 5MB!", "error");
                return Upload.LIST_IGNORE;
            }
            return false;
        },
        maxCount: 1,
        accept: "image/*"
    };

    return (
        <Modal
            title={<span className="text-white">Upload Profile Image</span>}
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose} className="border-slate-600! text-slate-300! hover:text-white! hover:border-slate-500!">
                    Cancel
                </Button>,
                <Button
                    key="upload"
                    type="primary"
                    disabled={files.length === 0}
                    onClick={() => handleUpload(files)}
                    icon={<UploadOutlined />}
                    className="bg-blue-600! hover:bg-blue-500!"
                >
                    Preview
                </Button>,
            ]}
        >
            <div className="py-6">
                <Dragger {...props} className="bg-slate-800/20! border-slate-600! hover:border-blue-500/50! group">
                    <p className="ant-upload-drag-icon">
                        <PictureOutlined className="text-blue-500/70 group-hover:text-blue-500 transition-colors" />
                    </p>
                    <p className="ant-upload-text text-slate-300">Click or drag image to this area</p>
                    <p className="ant-upload-hint text-slate-400">
                        Support for JPG, PNG, WEBP. Max size 5MB.
                    </p>
                </Dragger>
            </div>
        </Modal>
    );
};

export default UploadImageModal;
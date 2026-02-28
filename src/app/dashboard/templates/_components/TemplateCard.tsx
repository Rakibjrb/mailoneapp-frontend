"use client"

import ConfirmModal from "@/components/shared/ui/ConfirmModal";
import { useToast } from "@/context/ToastContext";
import { useDeleteTemplateMutation } from "@/redux/features/dashboard/templates/templatesApi";
import { TemplateData } from "@/types/template.types";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TemplateCard = ({ template }: { template: TemplateData }) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const [deleteTemplate, { isLoading: isDeleteTemplateLoading }] = useDeleteTemplateMutation();

    const makeDefaultHandler = async () => {
        console.log(template._id);
    }

    const handleTemplateDelete = async () => {
        setIsConfirmModalOpen(false);
        try {
            await deleteTemplate(template._id).unwrap();
            toast("Template deleted sucessfully", "success");
        } catch (error: any) {
            toast(error?.data?.mssage || "Something went wrong!", "error");
        }
    }

    return (
        <>
            <Card className="w-full bg-slate-800/40! border-slate-700/50! backdrop-blur-md! shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-start gap-6">
                    <h3 className="text-xl md:text-2xl">{template.name}</h3>
                    <Button loading={isDeleteTemplateLoading} onClick={() => setIsConfirmModalOpen(true)} className="text-rose-400! px-3! py-1! hover:text-rose-500! border-rose-400! hover:border-rose-500!">
                        <DeleteOutlined />
                    </Button>
                </div>

                <div className="space-y-4 my-6">
                    <div>Subject: {template.subject}</div>
                    <div>Create Date: {template.createdAt}</div>
                    <div className="flex justify-between items-center">Default: {template.isDefault ? <div className="w-4 h-4 rounded-full bg-green-500" /> : <div className="w-4 h-4 rounded-full bg-red-500" />}</div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <Button
                        onClick={() => router.push(`/dashboard/templates/customize-template/${template._id}`)}
                        type="primary"
                        className="w-full! py-2! md:py-5! flex-1 bg-blue-600! border-none! text-white! font-semibold hover:bg-blue-500! shadow-lg shadow-blue-900/20"
                    >
                        Customize Template
                    </Button>
                    <Button
                        onClick={makeDefaultHandler}
                        type="primary"
                        className="w-full! py-2! md:py-5! flex-1 bg-blue-600! border-none! text-white! font-semibold hover:bg-blue-500! shadow-lg shadow-blue-900/20"
                    >
                        Make this Default
                    </Button>
                </div>
            </Card>

            <ConfirmModal open={isConfirmModalOpen} handleConfirm={handleTemplateDelete} onClose={() => setIsConfirmModalOpen(false)} />
        </>
    )
}

export default TemplateCard;

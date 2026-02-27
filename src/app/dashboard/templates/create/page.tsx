"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React from "react";
import TemplateForm from "../_components/TemplateForm";
import { Card } from "antd";
import { useToast } from "@/context/ToastContext";
import { useCreateTemplateMutation } from "@/redux/features/dashboard/templates/templatesApi";
import { useRouter } from "next/navigation";

const CreateTemplatePage = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [createTemplate, { isLoading }] = useCreateTemplateMutation();

    const handleSubmit = async (data: any) => {
        try {
            await createTemplate(data).unwrap();
            toast("Template sucessfull created", "success");
            router.push("/dashboard/templates");
        } catch (error: any) {
            toast(error.data?.message || "Something went wrong!", "error");
        }
    }

    return (
        <Card className="max-w-6xl! mx-auto!  bg-blue-600/10!">
            <TemplateForm submit={{ onSubmit: handleSubmit, isLoading }} isUpdate={false} />
        </Card>
    )
}

export default CreateTemplatePage;
"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React from "react";
import TemplateForm from "../../_components/TemplateForm";
import { useParams } from "next/navigation";
import { useGetTemplateByIdQuery } from "@/redux/features/dashboard/templates/templatesApi";
import Loading from "@/components/shared/ui/loading";
import ErrorDataLoading from "@/components/shared/ui/errordataloading";

const CustomizeTemplatePage = () => {
    const templateId = useParams().id;
    const { data: templateData, isLoading: isTemplateLoading, isError: isTemplateLoadingError, refetch: refetchTemplate } = useGetTemplateByIdQuery(templateId);
    const template = templateData?.data || {};

    const handleSubmit = async (data: any) => {
        console.log(data);
    }

    if (isTemplateLoading) return <Loading tip="loading template data ..." size="default" />;
    if (isTemplateLoadingError) return <ErrorDataLoading onRetry={() => refetchTemplate()} />

    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* customization form */}
            <div className="xl:col-span-2">
                <TemplateForm initialValues={{
                    name: template?.name || "",
                    subject: template?.subject || "",
                    html: template?.html || "",
                    plainText: template?.plainText,
                }} submit={{ onSubmit: handleSubmit, isLoading: false }} isUpdate={true} />
            </div>
            {/* customization preview */}
            <div className="xl:col-span-2">
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <iframe
                        className="w-full h-full"
                        srcDoc={template?.html || "<html><body>No Preview Available</body></html>"}
                        title="Email Preview"
                        style={{ border: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomizeTemplatePage;

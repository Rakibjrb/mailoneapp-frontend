"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React from "react";
import TemplateForm from "../../_components/TemplateForm";

const CustomizeTemplatePage = () => {

    const handleSubmit = async (data: any) => {
        console.log(data);
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* customization form */}
            <div className="xl:col-span-2">
                <TemplateForm submit={{ onSubmit: handleSubmit, isLoading: false }} isUpdate={true} />
            </div>
            {/* customization preview */}
            <div className="xl:col-span-2">
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <div className="">
                        <h5 className="">Template Preview</h5>
                        <p className="">Preview your template here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizeTemplatePage;

"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React from "react";
import TemplateForm from "../_components/TemplateForm";
import { Card } from "antd";

const CreateTemplatePage = () => {
    const handleSubmit = async (data: any) => {
        console.log(data);
    }

    return (
        <Card className="max-w-6xl! mx-auto!  bg-blue-600/10!">
            <TemplateForm submit={{ onSubmit: handleSubmit, isLoading: false }} isUpdate={false} />
        </Card>
    )
}

export default CreateTemplatePage;
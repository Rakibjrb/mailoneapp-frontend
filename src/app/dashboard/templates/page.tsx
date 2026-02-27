"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined, } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useGetTemplatesQuery } from "@/redux/features/dashboard/templates/templatesApi";
import Loading from "@/components/shared/ui/loading";
import ErrorDataLoading from "@/components/shared/ui/errordataloading";

const TemplatesPage = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10
    });
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const { data, isLoading, isError, refetch } = useGetTemplatesQuery({ page: pagination.page, limit: pagination.limit, search });
    const templates = data?.data || [];

    console.log(templates);

    if (isLoading) return <Loading size="default" tip="Loading templates ..." />
    if (isError) return <ErrorDataLoading onRetry={() => refetch()} title="Templates loading error" />

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Mail Templates</h1>
                    <p className="text-slate-400">Manage and reuse your beautifully designed email templates.</p>
                </div>
                <Button onClick={() => router.push("/dashboard/templates/create")} type="primary" icon={<PlusOutlined />} className="bg-blue-600 border-none px-4!">
                    Create New
                </Button>
            </div>
        </div>
    );
};

export default TemplatesPage;

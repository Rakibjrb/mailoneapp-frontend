"use client";

import React, { useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined, SearchOutlined, } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useGetTemplatesQuery } from "@/redux/features/dashboard/templates/templatesApi";
import Loading from "@/components/shared/ui/loading";
import ErrorDataLoading from "@/components/shared/ui/errordataloading";
import TemplateCard from "./_components/TemplateCard";
import { TemplateData } from "@/types/template.types";

const TemplatesPage = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10
    });
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const { data, isLoading, isError, refetch } = useGetTemplatesQuery({ page: pagination.page, limit: pagination.limit, search });
    const templates = data?.data || [];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    }

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
            {
                isLoading ? (
                    <Loading size="default" tip="Loading templates ..." />
                ) : (
                    <div className="space-y-8">
                        <div>
                            <Input
                                onChange={handleSearch}
                                prefix={<SearchOutlined className="text-slate-400!" />}
                                placeholder="Search ..."
                                className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-400! max-w-md!"
                            />
                        </div>

                        {
                            templates.length ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        templates.map((template: TemplateData) => <TemplateCard key={template?._id} template={template} />)
                                    }
                                </div>
                            ) : (
                                <div className="w-full h-[200px] flex justify-center items-center">
                                    <h3>No templates found</h3>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default TemplatesPage;
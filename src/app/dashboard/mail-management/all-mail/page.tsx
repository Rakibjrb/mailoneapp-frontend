"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React, { useState } from "react";
import { Card, Table, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, ReloadOutlined, FilterOutlined, DeleteOutlined } from "@ant-design/icons";
import FilterModal from "./_components/FilterModal";
import { useGetAllMailQuery, useUpdateMailSelectionMutation, useDeleteMailMutation } from "@/redux/features/dashboard/mail-management/mailApi";
import Loading from "@/components/shared/ui/loading";
import ErrorDataLoading from "@/components/shared/ui/errordataloading";
import { useToast } from "@/context/ToastContext";

interface DataType {
    _id: string;
    key: string;
    name: string;
    email: string;
    date: string;
    isSelected: string;
}

const AllMailPage = () => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
    const [pagination, setPagination] = useState<{
        page: number;
        limit: number;
    }>({
        page: 1,
        limit: 10,
    });
    const [searchText, setSearchText] = useState<string>("");
    const [filterValues, setFilterValues] = useState<{
        sortBy: string;
        sortOrder: string;
        isSelected: string;
    }>({
        sortBy: "",
        sortOrder: "",
        isSelected: "",
    });

    const { toast } = useToast();

    const { data: response, isLoading: allMailLoading, refetch: refetchAllMail, error: allMailError } = useGetAllMailQuery({
        ...filterValues,
        search: searchText,
        ...pagination
    });
    const mails = response?.data || [];
    const meta = response?.meta || {};

    const [updateMailSelection] = useUpdateMailSelectionMutation();

    const [deleteMail] = useDeleteMailMutation();

    const handleUpdateMailSelection = async (id: string, isSelected: string) => {
        try {
            await updateMailSelection({ id, isSelected }).unwrap();
            refetchAllMail();
            toast("Mail selection updated successfully", "success");
        } catch (error: any) {
            toast(error?.message || "Failed to update mail selection", "error");
        }
    };

    const handleDeleteMail = async (id: string) => {
        try {
            await deleteMail(id).unwrap();
            refetchAllMail();
            toast("Mail moved to trash", "warning");
        } catch (error: any) {
            toast(error?.message || "Failed to trash mail", "error");
        }
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <span className="text-slate-300">{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: string) => <span className="text-slate-300">{text}</span>,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => <span className="text-slate-400 text-sm">{text}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (record: DataType) => <div className="flex gap-3 items-center justify-end">
                <Button onClick={() => handleUpdateMailSelection(record._id, record.isSelected ? "false" : "true")} className="text-blue-400! px-4! py-1! hover:text-blue-500!">{record.isSelected ? "Unselect" : "Select"}</Button>
                <Button onClick={() => handleDeleteMail(record._id)} className="text-rose-400! px-4! py-1! hover:text-rose-500! border-rose-400! hover:border-rose-500!">
                    <DeleteOutlined />
                </Button>
            </div>
        },
    ];

    const handleApplyFilter = (values: { sortBy: string, sortOrder: string, isSelected: string }) => {
        setFilterValues(values);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    }

    if (allMailLoading) return <Loading tip="Loading All Mail" size="default" />
    if (allMailError) return <ErrorDataLoading message="Failed to load mail data. Please check your connection and try again." onRetry={() => refetchAllMail()} />

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end gap-2">

                <Input
                    onChange={handleSearch}
                    prefix={<SearchOutlined className="text-slate-400!" />}
                    placeholder="Search ..."
                    className="bg-slate-900/50! border-slate-700! text-white! placeholder:text-slate-400! max-w-md!"
                />

                <div className="flex gap-2">
                    <Button onClick={() => refetchAllMail()} icon={<ReloadOutlined />} className="bg-slate-800! border-slate-700! text-slate-300! hover:bg-slate-700! hover:border-slate-600! hover:text-slate-200!" />
                    <Button
                        icon={<FilterOutlined />}
                        className="bg-slate-800! border-slate-700! text-slate-300! hover:bg-slate-700! hover:border-slate-600! hover:text-slate-200!"
                        onClick={() => setIsFilterModalOpen(true)}
                    >
                        Filter
                    </Button>
                </div>
            </div>

            <Card className="bg-slate-800/40! border-slate-700/50! backdrop-blur-md! overflow-x-auto!" variant="outlined">
                <div className="h-full w-full min-w-[640px]">
                    <Table
                        rowClassName="bg-transparent! hover:bg-slate-700/20! transition-colors!"
                        className="ant-table-premium"
                        columns={columns}
                        dataSource={mails.map((mail: any) => ({
                            ...mail,
                            key: mail._id,
                        }))}
                        pagination={{
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} mails`,
                            total: meta.total,
                            current: meta.page,
                            pageSize: meta.limit,
                            onChange: (page, pageSize) => {
                                setPagination({
                                    page,
                                    limit: pageSize,
                                });
                            },
                        }}
                    />
                </div>
            </Card>

            <FilterModal
                open={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleApplyFilter}
            />
        </div>
    );
};

export default AllMailPage;

"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React, { useState } from "react";
import { Card, Table, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, ReloadOutlined, FilterOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import FilterModal from "./_components/FilterModal";
import { useGetAllMailQuery, useUpdateMailSelectionMutation, useDeleteMailMutation } from "@/redux/features/dashboard/mail-management/mailApi";
import Loading from "@/components/shared/ui/loading";
import ErrorDataLoading from "@/components/shared/ui/errordataloading";
import { useToast } from "@/context/ToastContext";
import { DataType } from "@/types/data.types";
import { useRouter } from "next/navigation";

const AllMailPage = () => {
    const [updateMailSelectionId, setUpdateMailSelectionId] = useState<string | null>(null);
    const [deleteMailId, setDeleteMailId] = useState<string | null>(null);
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

    const router = useRouter();
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
            setUpdateMailSelectionId(id);
            await updateMailSelection({ id, isSelected }).unwrap();
            await refetchAllMail();
            toast("Mail selection updated successfully", "success");
        } catch (error: any) {
            toast(error?.message || "Failed to update mail selection", "error");
        } finally {
            setUpdateMailSelectionId(null);
        }
    };

    const handleDeleteMail = async (id: string) => {
        try {
            setDeleteMailId(id);
            await deleteMail(id).unwrap();
            await refetchAllMail();
            toast("Mail successfully moved to trash", "warning");
        } catch (error: any) {
            toast(error?.message || "Failed to trash mail", "error");
        } finally {
            setDeleteMailId(null);
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
                <SelectButton record={record} isLoading={record._id === updateMailSelectionId} onClick={() => handleUpdateMailSelection(record._id, record.isSelected ? "false" : "true")} />
                <TrashButton isLoading={record._id === deleteMailId} onClick={() => handleDeleteMail(record._id)} />
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
                    <Button
                        onClick={() => router.push("/dashboard/mail-management/add-mail")}
                        icon={<PlusOutlined />}
                        className="bg-blue-500! border-blue-500! text-white! hover:bg-blue-600! hover:border-blue-600! hover:text-white!"
                    >
                        Add Mail
                    </Button>
                </div>
            </div>

            {allMailLoading && <Loading tip="Loading All Mail" size="default" />}

            {!allMailLoading && <Card className="bg-slate-800/40! border-slate-700/50! backdrop-blur-md! overflow-x-auto!" variant="outlined">
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
            </Card>}

            <FilterModal
                open={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleApplyFilter}
            />
        </div>
    );
};

export default AllMailPage;

function SelectButton({ record, isLoading, onClick }: { record: DataType, isLoading: boolean, onClick: () => void }) {
    return (
        <Button onClick={onClick} disabled={isLoading} loading={isLoading} className={`px-4! py-1! ${record.isSelected ? "border-green-400! hover:border-green-500! text-green-400! hover:text-green-500!" : "border-blue-400! hover:border-blue-500! text-blue-400! hover:text-blue-500!"}`}>
            {isLoading ? "Updating" : record.isSelected ? "Selected" : "Select"}
        </Button>
    );
}

function TrashButton({ isLoading, onClick }: { isLoading: boolean, onClick: () => void }) {
    return (
        <Button disabled={isLoading} loading={isLoading} onClick={onClick} className="text-rose-400! px-4! py-1! hover:text-rose-500! border-rose-400! hover:border-rose-500!">
            <DeleteOutlined />
        </Button>
    );
}

"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React, { useState } from "react";
import { Card, Button, Empty, Table } from "antd";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useGetTrashedMailQuery, useRestoreMailMutation, useEmptyTrashMutation } from "@/redux/features/dashboard/mail-management/trash-management/trashApi";
import Loading from "@/components/shared/ui/loading";
import ErrorDataLoading from "@/components/shared/ui/errordataloading";
import { useToast } from "@/context/ToastContext";
import { DataType } from "@/types/data.types";
import type { ColumnsType } from "antd/es/table";

const TrashPage = () => {
    const [restoreMailId, setRestoreMailId] = useState<string | null>(null);
    const [pagination, setPagination] = useState<{
        page: number;
        limit: number;
    }>({
        page: 1,
        limit: 10,
    });
    const { toast } = useToast();

    const { data: response, isLoading: isLoadingTrashedMail, error: errorTrashedMail, refetch: refetchTrashedMail } = useGetTrashedMailQuery(pagination);
    const trashedMails = response?.data || [];
    const meta = response?.meta || {};

    const [restoreMail, { isLoading: isLoadingRestoreMail }] = useRestoreMailMutation();
    const [emptyTrash, { isLoading: isLoadingEmptyTrash }] = useEmptyTrashMutation();

    const handleRestoreMail = async (id: string) => {
        try {
            setRestoreMailId(id);
            await restoreMail({ id }).unwrap();
            toast("Mail restored successfully", "success");
            refetchTrashedMail();
        } catch (error: any) {
            toast(error?.message || "Failed to restore mail", "error");
        } finally {
            setRestoreMailId(null);
        }
    };

    const handleEmptyTrash = async () => {
        try {
            await emptyTrash({}).unwrap();
            toast("Trash emptied successfully", "success");
            refetchTrashedMail();
        } catch (error: any) {
            toast(error?.message || "Failed to empty trash", "error");
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
                <RestoreButton record={record} isLoadingRestoreMail={restoreMailId === record._id} handleRestoreMail={handleRestoreMail} />
            </div>
        },
    ];

    if (isLoadingTrashedMail) return <Loading tip="Loading Trashed Mail" size="default" />
    if (errorTrashedMail) return <ErrorDataLoading message="Failed to load trashed mail data. Please check your connection and try again." onRetry={() => refetchTrashedMail()} />

    if (trashedMails?.length !== 0) return (<div className="space-y-6">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Trash</h1>
                <p className="text-slate-400">Items in trash will be automatically deleted after 30 days.</p>
            </div>
            <Button loading={isLoadingEmptyTrash} onClick={handleEmptyTrash} disabled={trashedMails?.length === 0} danger icon={<DeleteOutlined />} className="hover:bg-rose-500/10!">
                Empty Trash
            </Button>
        </div>
        <Card className="bg-slate-800/40! border-slate-700/50! backdrop-blur-md! overflow-x-auto!" variant="outlined">
            <div className="h-full w-full min-w-[640px]">
                <Table
                    rowClassName="bg-transparent! hover:bg-slate-700/20! transition-colors!"
                    className="ant-table-premium"
                    columns={columns}
                    dataSource={trashedMails.map((mail: any) => ({
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
    </div>)


    return (
        <Card className="bg-slate-800/40! border-slate-700/50! backdrop-blur-md!" variant="outlined">
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span className="text-slate-500">Trash is empty</span>}
                className="py-12"
            />
        </Card>
    );
};

export default TrashPage;

function RestoreButton({ record, isLoadingRestoreMail, handleRestoreMail }: { record: DataType, isLoadingRestoreMail: boolean, handleRestoreMail: (id: string) => void }) {
    return <Button loading={isLoadingRestoreMail} onClick={() => handleRestoreMail(record._id)} className="text-green-400! px-4! py-1! hover:text-green-500! border-green-400! hover:border-green-500!">
        <ReloadOutlined />
    </Button>
}
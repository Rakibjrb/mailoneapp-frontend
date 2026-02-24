"use client"

{/* eslint-disable @typescript-eslint/no-explicit-any */ }
import { Button, Modal, Select } from "antd";
import { useUpdateMultipleMailStatusMutation } from "@/redux/features/dashboard/mail-management/mailApi";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

const StatusModal = ({ open, onClose, mailIds, refetch }: { open: boolean, onClose: () => void, mailIds: string[], refetch: () => void }) => {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const { toast } = useToast();

    const [updateMultipleMailStatus, { isLoading: isStatusApplying }] = useUpdateMultipleMailStatusMutation();

    const handleMultipleMailStatus = async () => {
        try {
            await updateMultipleMailStatus({
                mailIds: mailIds,
                isSelected: selectedStatus
            }).unwrap();
            toast("Status updated successfully", "success");
            refetch();
            onClose();
        } catch (error: any) {
            toast(error?.data?.message || "Failed to update status", "error");
        }
    }

    if (!open) return null;

    return (
        <Modal
            title={<span className="text-white">Filter Options</span>}
            open={open}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose} className="border-slate-600! text-slate-300! hover:text-white! hover:border-slate-500!">
                    Cancel
                </Button>,
                <Button loading={isStatusApplying} disabled={!mailIds.length} onClick={handleMultipleMailStatus} key="apply" type="primary" className="bg-blue-600! hover:bg-blue-500!">
                    Apply Status
                </Button>,
            ]}
        >
            <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="status" className="text-white mb-2">Change Status</label>
                    <Select
                        id="status"
                        placeholder="Select Status"
                        options={[
                            { value: "true", label: "Select" },
                            { value: "false", label: "Unselect" },
                        ]}
                        onChange={(value) => setSelectedStatus(value)}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default StatusModal;
import { Button, Modal } from "antd"

interface Props {
    message?: string;
    open: boolean;
    handleConfirm: () => void;
    onClose: () => void;
}

const ConfirmModal = ({ message = "Are you sure?", open, handleConfirm, onClose }: Props) => {
    return <Modal
        title={<span className="text-white">{message}</span>}
        open={open}
        onCancel={onClose}
        footer={[
            <Button key={"confirmmodalcancelbtn"} onClick={onClose} className="border-slate-600! text-slate-300! hover:text-white! hover:border-slate-500!">
                Cancel
            </Button>,
            <Button
                key={"confirmmodalconfirmbtn"}
                type="primary"
                onClick={handleConfirm}
                className="bg-blue-600! hover:bg-blue-500!"
            >
                Confirm
            </Button>
        ]}
    >
    </Modal>
}

export default ConfirmModal;
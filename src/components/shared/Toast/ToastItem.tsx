"use client";

import React, { useEffect, useState } from "react";
import {
    CheckCircleOutlined,
    CloseOutlined,
    InfoCircleOutlined,
    ExclamationCircleOutlined,
    WarningOutlined
} from "@ant-design/icons";
import { Toast, ToastType } from "../../../context/ToastContext";

interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

const getIcon = (type: ToastType) => {
    switch (type) {
        case "success":
            return <CheckCircleOutlined className="text-emerald-400!" />;
        case "error":
            return <ExclamationCircleOutlined className="text-rose-400!" />;
        case "warning":
            return <WarningOutlined className="text-amber-400!" />;
        case "info":
        default:
            return <InfoCircleOutlined className="text-blue-400!" />;
    }
};

const getBorderColor = (type: ToastType) => {
    switch (type) {
        case "success":
            return "border-emerald-500/30";
        case "error":
            return "border-rose-500/30";
        case "warning":
            return "border-amber-500/30";
        case "info":
        default:
            return "border-blue-500/30";
    }
};

const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleRemove = () => {
        setIsVisible(false);
        setTimeout(() => onRemove(toast.id), 300);
    };

    return (
        <div
            className={`
                flex items-center gap-3 p-4 mb-3 min-w-[300px] max-w-md
                bg-slate-900/80 backdrop-blur-xl border ${getBorderColor(toast.type)}
                rounded-xl shadow-2xl shadow-black/40
                transition-all duration-300 transform
                ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
            `}
            role="alert"
        >
            <div className="text-xl shrink-0 flex items-center justify-center">
                {getIcon(toast.type)}
            </div>

            <div className="flex-1 text-slate-200 text-sm font-medium">
                {toast.message}
            </div>

            <button
                onClick={handleRemove}
                className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800/50 cursor-pointer"
                aria-label="Close toast"
            >
                <CloseOutlined className="text-xs" />
            </button>

            {/* Progress bar (Optional) */}
            {toast.duration !== Infinity && (
                <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full overflow-hidden rounded-b-xl">
                    <div
                        className={`h-full bg-current opacity-40 transition-all linear`}
                        style={{
                            width: isVisible ? "0%" : "100%",
                            transitionDuration: `${toast.duration}ms`,
                            backgroundColor: toast.type === 'success' ? '#10b981' :
                                toast.type === 'error' ? '#f43f5e' :
                                    toast.type === 'warning' ? '#f59e0b' : '#3b82f6'
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ToastItem;

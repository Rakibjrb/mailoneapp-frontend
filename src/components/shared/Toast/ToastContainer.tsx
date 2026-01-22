"use client";

import React from "react";
import { useToast } from "../../../context/ToastContext";
import ToastItem from "./ToastItem";

const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div
            className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none"
            aria-live="polite"
        >
            <div className="pointer-events-auto">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onRemove={removeToast}
                    />
                ))}
            </div>
        </div>
    );
};

export default ToastContainer;

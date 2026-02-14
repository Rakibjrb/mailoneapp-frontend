import React from 'react';
import { Button } from 'antd';
import { ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

interface ErrorDataLoadingProps {
    /**
     * Error message to display
     */
    message?: string;
    /**
     * Optional title for the error
     */
    title?: string;
    /**
     * Function to call when retry button is clicked
     */
    onRetry?: () => void;
    /**
     * If true, covers the entire screen with a backdrop
     */
    fullScreen?: boolean;
    /**
     * Custom class name for the container
     */
    className?: string;
}

const ErrorDataLoading: React.FC<ErrorDataLoadingProps> = ({
    message = "We encountered an issue while loading the data.",
    title = "Data Loading Error",
    onRetry,
    fullScreen = false,
    className = ''
}) => {
    const content = (
        <div className="flex flex-col items-center justify-center text-center p-20 max-w-md mx-auto">
            <div className="mb-6 relative">
                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse"></div>
                <ExclamationCircleOutlined className="text-6xl text-red-500 relative z-10" />
            </div>

            <h3 className="text-xl font-semibold text-white mb-2 tracking-wide">
                {title}
            </h3>

            <p className="text-slate-400 mb-8 leading-relaxed">
                {message}
            </p>

            {onRetry && (
                <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={onRetry}
                    size="large"
                    className="bg-red-600! hover:bg-red-500! border-none shadow-lg shadow-red-900/20"
                >
                    Try Again
                </Button>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm transition-all duration-300 ${className}`}>
                {content}
            </div>
        );
    }

    return (
        <div className={`w-full min-h-[300px] flex items-center justify-center bg-slate-900/30 rounded-xl border border-dashed border-slate-700/50 ${className}`}>
            {content}
        </div>
    );
};

export default ErrorDataLoading;

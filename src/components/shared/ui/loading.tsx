import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
    /**
     * If true, covers the entire screen with a backdrop
     */
    fullScreen?: boolean;
    /**
     * Optional text to display below the spinner
     */
    tip?: string;
    /**
     * Size of the spinner
     */
    size?: 'small' | 'default' | 'large';
    /**
     * Custom class name for the container
     */
    className?: string;
}

const Loading: React.FC<LoadingProps> = ({
    fullScreen = false,
    tip,
    size = 'default',
    className = ''
}) => {
    // Custom premium spinner icon
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: size === 'large' ? 48 : size === 'small' ? 20 : 32,
            }}
            className="text-blue-500"
            spin
        />
    );

    const content = (
        <div className="flex flex-col items-center justify-center gap-4">
            <Spin indicator={antIcon} />
            {tip && (
                <span className="text-slate-400 text-sm font-medium tracking-wide animate-pulse">
                    {tip}
                </span>
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
        <div className={`flex items-center justify-center w-full min-h-[200px] p-8 ${className}`}>
            {content}
        </div>
    );
};

export default Loading;

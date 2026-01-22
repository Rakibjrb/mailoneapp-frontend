"use client";

import React from "react";
import { Card, Result } from "antd";
import { ControlOutlined } from "@ant-design/icons";

const ConfigurationsPage = () => {
    return (
        <div className="h-[70vh] flex items-center justify-center">
            <Result
                icon={<ControlOutlined className="text-purple-500 text-6xl" />}
                title={<span className="text-white">System Configurations</span>}
                subTitle={<span className="text-slate-400">Advanced system settings and API configurations will be available here.</span>}
            />
        </div>
    );
};

export default ConfigurationsPage;

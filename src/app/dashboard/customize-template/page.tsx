"use client";

import React from "react";
import { Result } from "antd";
import { EditOutlined } from "@ant-design/icons";

const CustomizeTemplatePage = () => {
    return (
        <div className="h-[70vh] flex items-center justify-center">
            <Result
                icon={<EditOutlined className="text-blue-500 text-6xl" />}
                title={<span className="text-white">Template Visual Editor</span>}
                subTitle={<span className="text-slate-400">The drag-and-drop template editor is coming soon. Stay tuned!</span>}
            />
        </div>
    );
};

export default CustomizeTemplatePage;

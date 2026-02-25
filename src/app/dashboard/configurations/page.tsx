"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React from "react";
import { Card } from "antd";
import { useCreateConfigMutation, useGetConfigsQuery, useTestConfigMutation, useUpdateConfigMutation } from "@/redux/features/dashboard/configurations/configApi";
import Loading from "@/components/shared/ui/loading";
import ConfigForm from "./_components/ConfigForm";
import { useToast } from "@/context/ToastContext";

const ConfigurationsPage = () => {
    const { toast } = useToast();

    const { data, isLoading: isConfigsLoading, refetch: refetchConfigs } = useGetConfigsQuery({});
    const configs = data?.data || [];
    const [createConfig, { isLoading: isConfigCreateLoading }] = useCreateConfigMutation();
    const [updateConfig, { isLoading: isConfigUpdateLoading }] = useUpdateConfigMutation();
    const [testConfig, { isLoading: isConfigTestLoading }] = useTestConfigMutation();

    const handleCreateConfig = async (data: any) => {
        const config = {
            appName: data.appName,
            host: data.host,
            port: Number(data.port),
            secure: data.secure,
            auth: {
                user: data.user,
                pass: data.pass
            }
        }
        try {
            await createConfig(config).unwrap();
            toast("config created successfully", "success");
        } catch (error: any) {
            toast(error?.data?.message || "config creation failed, something went wrong!", "error");
        } finally {
            refetchConfigs();
        }
    }

    const handleUpdateConfig = async (data: any) => {
        const config: any = {};

        if (data.appName) config.appName = data.appName;
        if (data.host) config.host = data.host;
        if (data.port) config.port = Number(data.port);
        if (data.secure) config.secure = data.secure;
        if (data.user) config.auth = { user: data.user };
        if (data.pass) config.auth = { pass: data.pass };
        if (data.user && data.pass) config.auth = { user: data.user, pass: data.pass };
        config.isActive = data.isActive || false;
        config.configId = configs[0]?._id;

        try {
            await updateConfig(config).unwrap();
            toast("config updated successfully", "success");
        } catch (error: any) {
            toast(error?.data?.message || "config update failed, something went wrong!", "error");
        } finally {
            refetchConfigs();
        }
    };

    const handleTest = async () => {
        try {
            await testConfig({}).unwrap();
            toast("config test successful", "success");
        } catch (error: any) {
            toast(error?.data?.message || "config test failed, something went wrong!", "error");
        } finally {
            refetchConfigs();
        }
    }

    if (isConfigsLoading) return <Loading size="default" tip="Loading configurations..." />

    if (configs.length === 0) return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl mx-auto">
            <Card
                className="w-full bg-slate-800/40! border-slate-700/50! backdrop-blur-md! shadow-2xl relative overflow-hidden"
                variant="outlined"
            >
                <h4 className="text-xl font-semibold mb-6 text-slate-400">Create your SMTP mail server configuration</h4>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <ConfigForm submit={{ onSubmit: handleCreateConfig, isLoading: isConfigCreateLoading }} isRequired={true} />
            </Card>
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl mx-auto">
            <Card
                className="w-full bg-slate-800/40! border-slate-700/50! backdrop-blur-md! shadow-2xl relative overflow-hidden"
                variant="outlined"
            >
                <h4 className="text-xl font-semibold mb-6 text-slate-400">Manage your SMTP mail server Configurations</h4>
                {/* Decorative background blur element */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <ConfigForm submit={{ onSubmit: handleUpdateConfig, isLoading: isConfigUpdateLoading }} test={{ handleTest, isConfigTestLoading }} isRequired={false} />
            </Card>
        </div>
    );
};

export default ConfigurationsPage;

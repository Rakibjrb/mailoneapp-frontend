"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React from "react";
import { Button, Form, Input, Avatar, } from "antd";
import { SaveOutlined, UserOutlined } from "@ant-design/icons";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/features/dashboard/settings/profile-settings/profileApi";
import ErrorDataLoading from "@/components/shared/ui/errordataloading";
import Loading from "@/components/shared/ui/loading";
import { useToast } from "@/context/ToastContext";

const ProfileSettings = () => {
    const [form] = Form.useForm();
    const { toast } = useToast();

    const { data, isLoading: isProfileLoading, error: profileError, refetch: refetchProfile } = useGetProfileQuery({});
    const userData = data?.data || {};

    const [updateProfile, { isLoading: isUpdateLoading }] = useUpdateProfileMutation();

    const handleUpdateProfile = async (values: any) => {
        const data: { name?: string, bio?: string, image?: string } = {};
        if (values.name) data.name = values.name;
        if (values.bio) data.bio = values.bio;
        try {
            await updateProfile(data).unwrap();
            await refetchProfile();
            toast("Profile updated successfully", "success");
        } catch (error: any) {
            toast(error?.data?.message || "Failed to update profile", "error");
        }
    }

    if (isProfileLoading) return <Loading tip="Loading Profile Data ..." size="default" />
    if (profileError) return <ErrorDataLoading message="Failed to load profile data. Please check your connection and try again." onRetry={() => refetchProfile()} />

    return (
        <div className="py-2 space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar size={80} src={userData?.image?.url || "/"} icon={<UserOutlined />} className="bg-blue-600/20! text-blue-500! border! border-blue-500/30!" />
                <div>
                    <h3 className="text-white font-semibold">Profile Photo</h3>
                    <p className="text-slate-400 text-sm my-3">Update your avatar and personal details.</p>
                    <Button size="small" className="bg-slate-700! border-slate-600! text-white!">Change Avatar</Button>
                </div>
            </div>

            <Form initialValues={{
                name: userData?.name || "",
                email: userData?.email || "",
                bio: userData?.bio || "",
            }} form={form} onFinish={handleUpdateProfile} layout="vertical" className="w-full!">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item name={"name"} label={<span className="text-slate-300">Full Name</span>}>
                        <Input className="bg-slate-900/50! border-slate-700! text-white! p-2!" />
                    </Form.Item>
                    <Form.Item name={"email"} label={<span className="text-slate-300">Email Address</span>}>
                        <Input className="bg-slate-900/50! border-slate-700! text-white! p-2!" disabled />
                    </Form.Item>
                </div>
                <Form.Item name={"bio"} label={<span className="text-slate-300">Bio</span>}>
                    <Input.TextArea rows={4} placeholder="Software Engineer & Designer" className="bg-slate-900/50! border-slate-700! text-white!" />
                </Form.Item>

                <div className="flex justify-end pt-6 mt-6 border-t border-slate-700/50">
                    <Button loading={isUpdateLoading} type="primary" htmlType="submit" icon={<SaveOutlined />} className="bg-blue-600 border-none px-4!">
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ProfileSettings;

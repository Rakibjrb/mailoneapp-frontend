"use client";

{/* eslint-disable @typescript-eslint/no-explicit-any */ }

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Avatar, } from "antd";
import { SaveOutlined, UserOutlined } from "@ant-design/icons";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/features/dashboard/settings/profile-settings/profileApi";
import ErrorDataLoading from "@/components/shared/ui/errordataloading";
import Loading from "@/components/shared/ui/loading";
import { useToast } from "@/context/ToastContext";
import UploadImageModal from "@/components/shared/ui/imageUploadModal";
import { useUploadImageMutation } from "@/redux/features/shared/uploadimage";

const ProfileSettings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState<{ url?: string, blobUrl?: string, file?: File | null }>({});

    const [form] = Form.useForm();
    const { toast } = useToast();

    const { data, isLoading: isProfileLoading, error: profileError, refetch: refetchProfile } = useGetProfileQuery({});
    const userData = data?.data || {};

    const [uploadImage] = useUploadImageMutation();
    const [updateProfile] = useUpdateProfileMutation();

    const handleUpdateProfile = async (values: any) => {
        setIsLoading(true);
        const data: { name?: string, bio?: string, image?: { url: string, publicId: string } } = {};
        if (values.name) data.name = values.name;
        if (values.bio) data.bio = values.bio;
        try {
            if (image.file) {
                const formData = new FormData();
                formData.append("file", image.file);
                const res = await uploadImage(formData).unwrap();
                data.image = {
                    url: res.data.url,
                    publicId: res.data.public_id
                };
            }
            console.log("data", data)
            await updateProfile(data).unwrap();
            await refetchProfile();
            toast("Profile updated successfully", "success");
        } catch (error: any) {
            toast(error?.data?.message || "Failed to update profile", "error");
        } finally {
            setIsLoading(false);
            if (image.blobUrl) URL.revokeObjectURL(image.blobUrl);
            setImage({ url: userData?.image?.url || "/", blobUrl: userData?.image?.url || "/", file: null });
        }
    }

    // handleImage Files for upload and show preview before server upload
    const handleImage = (files: any) => {
        const imageFile = URL.createObjectURL(files[0].originFileObj);
        setImage({ url: "/", blobUrl: imageFile, file: files[0].originFileObj });
        setIsModalOpen(false);
    }

    const handleImageClose = () => {
        if (image.blobUrl) URL.revokeObjectURL(image.blobUrl);
        setImage({ url: userData?.image?.url || "/", blobUrl: userData?.image?.url || "/", file: null });
        setIsModalOpen(false);
    }

    useEffect(() => {
        if (userData?.image?.url) {
            setImage({ url: userData.image.url, blobUrl: userData.image.url, file: null });
        }
    }, [userData]);

    if (isProfileLoading) return <Loading tip="Loading Profile Data ..." size="default" />
    if (profileError) return <ErrorDataLoading message="Failed to load profile data. Please check your connection and try again." onRetry={() => refetchProfile()} />


    return (
        <div className="py-2 space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar size={80} src={image.blobUrl || userData?.image?.url || "/"} icon={<UserOutlined />} className="bg-blue-600/20! text-blue-500! border! border-blue-500/30!" />
                <div>
                    {/* <h3 className="text-white font-semibold">Profile Photo</h3> */}
                    <p className="text-slate-400 text-sm mb-3">Update your avatar and personal details.</p>
                    <Button size="small" className="bg-slate-700! border-slate-600! text-white!" onClick={() => setIsModalOpen(true)}>Change Avatar</Button>
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
                    <Button loading={isLoading} type="primary" htmlType="submit" icon={<SaveOutlined />} className="bg-blue-600 border-none px-4!">
                        Save Changes
                    </Button>
                </div>
            </Form>

            <UploadImageModal open={isModalOpen} onClose={handleImageClose} handleUpload={handleImage} />
        </div>
    );
};

export default ProfileSettings;

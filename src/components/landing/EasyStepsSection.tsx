"use client";

import {
    UserAddOutlined,
    LoginOutlined,
    FileTextOutlined,
    SendOutlined,
} from "@ant-design/icons";

const EasyStepsSection = () => {
    const steps = [
        {
            title: "Create Account",
            description: "Sign up for a free account in less than 30 seconds. No credit card required for the free tier.",
            icon: <UserAddOutlined />,
            color: "blue"
        },
        {
            title: "Login & Setup",
            description: "Login to your account and setup your app.",
            icon: <LoginOutlined />,
            color: "pink"
        },
        {
            title: "Start with Default Template",
            description: "Use our pre-built templates to send emails instantly without any coding required.",
            icon: <FileTextOutlined />,
            color: "purple"
        },

        {
            title: "Send Email",
            description: "Send your first email in less than 5 minutes.",
            icon: <SendOutlined />,
            color: "emerald"
        },

    ];

    return (
        <div className="py-24 relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 xl:px-0 relative z-10">

                {/* Header */}
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Get started in minutes
                    </h2>
                    <p className="text-slate-400 text-lg">
                        We&apos;ve optimized the process to be as simple as possible.
                        Go from signup to sending your first email in under 5 minutes.
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Center Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 -translate-x-1/2 hidden md:block" />

                    {/* Steps */}
                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={index} className="relative flex flex-col md:flex-row items-center justify-between group">

                                    {/* Center Dot (Desktop) */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-900 shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                                    </div>

                                    {/* Content Card - Left */}
                                    <div className={`w-full md:w-[45%] ${isEven ? 'md:order-1' : 'md:order-2'} relative`}>
                                        <div className={`
                                            p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm
                                            hover:border-blue-500/30 hover:bg-slate-900/80 transition-all duration-300
                                            group-hover:translate-x-0
                                            flex flex-col gap-4
                                            ${isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}
                                        `}>
                                            <div className="text-3xl text-blue-400 mb-2 p-3 rounded-xl inline-block w-fit">
                                                {step.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                                <p className="text-slate-400 leading-relaxed">{step.description}</p>
                                            </div>

                                            {/* Number Watermark */}
                                            <div className={`absolute -top-6 -right-4 text-9xl font-bold text-slate-800/20 select-none pointer-events-none -z-10 ${isEven ? 'md:right-auto md:-left-4' : ''}`}>
                                                {index + 1}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empty Space for alignment - Right */}
                                    <div className={`hidden md:block w-[45%] ${isEven ? 'md:order-2' : 'md:order-1'}`} />

                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EasyStepsSection;

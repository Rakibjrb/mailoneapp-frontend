"use client";

import {
    RocketOutlined,
    SafetyCertificateOutlined,
    BarChartOutlined,
    LayoutOutlined
} from "@ant-design/icons";

const ServicesSection = () => {
    const services = [
        {
            title: "Customized Templates",
            description: "Create and customize email templates to match your brand and messaging.",
            icon: <LayoutOutlined className="text-4xl text-orange-400!" />,
            gradient: "from-orange-500/20 to-red-500/20"
        },
        {
            title: "Send emails",
            description: "Send emails with ease with our user-friendly interface and industry-leading reliability, compliance, and speed.",
            icon: <RocketOutlined className="text-4xl text-blue-400!" />,
            gradient: "from-blue-500/20 to-cyan-500/20"
        },
        {
            title: "Secure Sending",
            description: "Enterprise-grade encryption and security protocols to keep your data and your customers safe.",
            icon: <SafetyCertificateOutlined className="text-4xl text-purple-400!" />,
            gradient: "from-purple-500/20 to-pink-500/20"
        },
        {
            title: "Real-time Analytics",
            description: "Track opens, clicks, and bounces in real-time with our comprehensive dashboard and reporting.",
            icon: <BarChartOutlined className="text-4xl text-emerald-400!" />,
            gradient: "from-emerald-500/20 to-teal-500/20"
        },

    ];

    return (
        <section className="py-24 bg-slate-950/50 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-left mb-20 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-200 to-indigo-100">
                        Customize your email delivery and sending
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl">
                        Everything you need to build, test, and send transactional emails at scale.
                        Reliable, fast, and easy to integrate.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10"
                        >
                            {/* Image Area (Gradient + Icon) */}
                            <div className={`h-48 w-full bg-linear-to-br ${service.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                                <div className="bg-slate-950/50 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-xl">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
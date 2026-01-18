import React from "react";
import {
    TeamOutlined,
    ThunderboltOutlined,
    SafetyOutlined,
    GlobalOutlined,
    CheckCircleOutlined,
    RocketOutlined,
    LayoutOutlined,
    BarChartOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";
import Link from "next/link";

const AboutPage = () => {
    return (
        <main className="bg-slate-950 text-slate-200 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                        Powering the Future of <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">Email Delivery</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        MailOne is more than just an email service. We are a developer-first platform
                        dedicated to making transactional email delivery reliable, secure, and incredibly fast.
                    </p>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-24 px-4 border-y border-slate-900 bg-slate-950/50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wider uppercase">
                            Our Mission
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            We exist to solve the complexity of <span className="text-blue-500">email infrastructure</span> for you.
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Sending emails shouldn't be hard. Whether you're a startup sending your first welcome email
                            or an enterprise delivering millions of notifications, MailOne provides the tools and
                            scalability to ensure every message reaches its destination.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            {[
                                "99.9% Uptime SLA",
                                "Developer-First API",
                                "Global Infrastructure",
                                "World-class Support"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircleOutlined className="text-blue-500 text-xl" />
                                    <span className="font-medium text-slate-200">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl relative animate-float">
                            <img
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                                alt="Team Working"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-600/20 blur-[60px] rounded-full -z-10" />
                    </div>
                </div>
            </section>

            {/* Core Capabilities (Based on ServicesSection) */}
            <section className="py-24 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core Capabilities</h2>
                        <p className="text-slate-400 text-lg">The foundation of our reliable delivery engine.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Customized Templates",
                                description: "Empowering brands with flexible, reusable, and dynamic templates.",
                                icon: <LayoutOutlined className="text-orange-400" />,
                                bg: "bg-orange-500/10",
                                border: "border-orange-500/20"
                            },
                            {
                                title: "High-Speed Delivery",
                                description: "Engineered for low latency and high throughput across the globe.",
                                icon: <RocketOutlined className="text-blue-400" />,
                                bg: "bg-blue-500/10",
                                border: "border-blue-500/20"
                            },
                            {
                                title: "Enterprise Security",
                                description: "Bank-grade encryption and compliance at every step of the journey.",
                                icon: <SafetyCertificateOutlined className="text-purple-400" />,
                                bg: "bg-purple-500/10",
                                border: "border-purple-500/20"
                            },
                            {
                                title: "Deep Analytics",
                                description: "Granular insights into your deliverability and customer engagement.",
                                icon: <BarChartOutlined className="text-emerald-400" />,
                                bg: "bg-emerald-500/10",
                                border: "border-emerald-500/20"
                            }
                        ].map((card, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300">
                                <div className={`w-14 h-14 rounded-2xl ${card.bg} border ${card.border} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 px-4 bg-linear-to-b from-slate-950 to-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <TeamOutlined className="text-4xl text-blue-500" />
                            <h3 className="text-2xl font-bold text-white">Community Driven</h3>
                            <p className="text-slate-400">We grow with our developers, listening to feedback to build the features that matter most.</p>
                        </div>
                        <div className="space-y-4">
                            <ThunderboltOutlined className="text-4xl text-blue-500" />
                            <h3 className="text-2xl font-bold text-white">Performance First</h3>
                            <p className="text-slate-400">Latency is our enemy. We optimize every millisecond of the email sending pipeline.</p>
                        </div>
                        <div className="space-y-4">
                            <SafetyOutlined className="text-4xl text-blue-500" />
                            <h3 className="text-2xl font-bold text-white">Privacy by Default</h3>
                            <p className="text-slate-400">Your data is yours. We implement the strictest privacy standards to protect your users.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto bg-linear-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Join the Email Revolution
                        </h2>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Stop worrying about your email infrastructure and start growing your business with MailOne.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/signup"
                                className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all shadow-xl shadow-blue-950/20"
                            >
                                Start Sending for Free
                            </Link>
                            <Link
                                href="/docs"
                                className="px-10 py-4 bg-blue-700/50 text-white font-bold rounded-full border border-blue-400/30 hover:bg-blue-700/70 transition-all backdrop-blur-sm"
                            >
                                Read Documentation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}} />
        </main>
    );
};

export default AboutPage;
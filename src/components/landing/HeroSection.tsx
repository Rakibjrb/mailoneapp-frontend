import Link from "next/link";
import { ArrowRightOutlined, BookOutlined } from "@ant-design/icons";

const HeroSection = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-8">
            <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
                {/* Eyebrow */}
                <h3 className="text-sm md:text-base font-bold tracking-[0.2em] text-blue-400 uppercase animate-fade-in-up">
                    Deliver Emails
                </h3>

                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl xl:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-white/60 leading-[1.1] pb-2 drop-shadow-sm">
                    Transactional Email <br className="hidden md:block" />
                    Delivery Service
                </h1>

                {/* Description - Optional but good for design balance */}
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                    The most reliable and scalable platform for your email needs.
                    Simple integration, powerful analytics, and 99.9% uptime.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        href="/login"
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 hover:ring-offset-slate-900"
                    >
                        <span className="mr-2">Get Started</span>
                        <ArrowRightOutlined className="transition-transform group-hover:translate-x-1" />
                        <div className="absolute inset-0 -z-10 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </Link>

                    <Link
                        href="/docs"
                        className="group inline-flex h-14 items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-8 font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
                    >
                        <BookOutlined className="mr-2" />
                        <span>View Docs</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

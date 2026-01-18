import Link from "next/link";
import { ArrowRightOutlined, BookOutlined } from "@ant-design/icons";

const LetsGetStarted = () => {
    return (
        <section className="relative py-24 px-4 overflow-hidden bg-slate-900 border-y border-slate-800">
            {/* Background Image with Overlay - Full Width */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
                style={{ backgroundImage: "url('/assets/images/cta-bg.png')" }}
            />
            <div className="absolute inset-0 z-1 bg-linear-to-r from-slate-900 via-slate-900/40 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Content */}
                <div className="px-8 md:px-0 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Ready to transform your <br />
                        <span className="text-blue-500">email delivery?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                        Start your free trial today and experience the power of MailOne.
                        Join thousands of developers who trust us for their transactional emails.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
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

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
            </div>
        </section>
    );
};

export default LetsGetStarted;
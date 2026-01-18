import Link from "next/link";
import Image from "next/image";
import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";

export default function NotFound() {
    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Left Side: Content */}
                <div className="flex-1 text-center md:text-left space-y-8 animate-fade-in-up">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wider uppercase">
                        Error 404
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none mb-4">
                        Lost in <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">Transit</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-md mx-auto md:mx-0 leading-relaxed font-light">
                        Oops! It seems like this email was delivered to an address that doesn&apos;t exist. The page you&apos;re looking for might have been moved or doesn&apos;t exist anymore.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <Link
                            href="/"
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 font-medium text-white transition-all duration-300 hover:bg-blue-500 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 hover:ring-offset-slate-900"
                        >
                            <HomeOutlined className="mr-2" />
                            <span>Back to Home</span>
                            <div className="absolute inset-0 -z-10 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </Link>

                        <Link
                            href="/docs"
                            className="group inline-flex h-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-8 font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
                        >
                            <ArrowLeftOutlined className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span>Visit Docs</span>
                        </Link>
                    </div>
                </div>

                {/* Right Side: Visual */}
                <div className="flex-1 relative animate-float">
                    <div className="relative">
                        {/* Ambient Glow behind image */}
                        <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full scale-110" />

                        <Image
                            src="/assets/images/not-found.png"
                            alt="404 Illustration"
                            width={500}
                            height={500}
                            className="relative z-10 w-full max-w-[500px] h-auto rounded-[3rem] shadow-2xl border border-slate-700/50 object-cover"
                        />

                        {/* Dynamic Watermark */}
                        <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-slate-800/10 select-none pointer-events-none">
                            404
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}} />
        </main>
    );
}

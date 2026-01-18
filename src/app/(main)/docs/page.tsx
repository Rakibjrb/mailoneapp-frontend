import Link from "next/link";
import { HomeOutlined, MailOutlined, RocketOutlined } from "@ant-design/icons";

export default function DocsPage() {
    return (
        <main className="relative h-full flex items-center justify-center overflow-hidden px-4 py-24">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            <div className="relative z-10 max-w-3xl w-full text-center space-y-10 animate-fade-in">
                {/* Icon/Visual */}
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                    <div className="relative w-24 h-24 bg-slate-900 border border-slate-700 rounded-3xl flex items-center justify-center text-4xl text-blue-400 shadow-2xl animate-float">
                        <RocketOutlined />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase">
                        Coming Soon
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        Our Documentation is <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">Under Construction</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
                        We&apos;re busy crafting the most detailed and developer & user friendly documentation you&apos;ve ever seen.
                        Stay tuned for a revolutionary way to manage your transactional emails.
                    </p>
                </div>

                {/* Features Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
                    {[
                        { icon: <MailOutlined />, label: "API Reference" },
                        { icon: <RocketOutlined />, label: "Quick Start" },
                        { icon: <HomeOutlined />, label: "SDKs & Tools" }
                    ].map((item, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm grayscale opacity-50">
                            <div className="text-2xl text-blue-500 mb-2">{item.icon}</div>
                            <div className="text-sm font-medium text-slate-300">{item.label}</div>
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <Link
                        href="/"
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-10 font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 hover:ring-offset-slate-950 shadow-xl shadow-blue-900/20"
                    >
                        <HomeOutlined className="mr-2" />
                        <span>Back to Home</span>
                        <div className="absolute inset-0 -z-10 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </Link>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}} />
        </main>
    );
}

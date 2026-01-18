import Link from "next/link";
import {
    GithubOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    GlobalOutlined
} from "@ant-design/icons";

const Footer = () => {
    const footerSections = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "#" },
                { name: "Pricing", href: "#" },
                { name: "API Reference", href: "/docs" },
                { name: "Integrations", href: "#" },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Documentation", href: "/docs" },
                { name: "Guides", href: "#" },
                { name: "Support", href: "#" },
                { name: "Status", href: "#" },
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About", href: "/about" },
                { name: "Blog", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Contact", href: "#" },
            ]
        }
    ];

    const socialLinks = [
        { icon: <TwitterOutlined />, href: "#" },
        { icon: <GithubOutlined />, href: "#" },
        { icon: <LinkedinOutlined />, href: "#" },
        { icon: <GlobalOutlined />, href: "#" },
    ];

    return (
        <footer className="bg-slate-950 border-t border-slate-900 font-sans z-10 relative">
            <div className="max-w-6xl mx-auto px-4 xl:px-0 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="text-white font-bold text-2xl tracking-tight block">
                            Mail<span className="text-blue-500">ONE</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Reliable, scalable, and fast transactional email delivery service for modern applications.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-xl"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white font-semibold !mb-9">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-900 pt-8 flex flex-col items-center justify-center text-center">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} MailOne Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0 md:absolute md:right-0 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto">
                        {/* Hidden on mobile, or could be kept if desired. Kept separate for cleaner centered copyright */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dropdown, Avatar, theme } from "antd";
import { UserOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import React, { JSX, useMemo, useState, useEffect } from "react";

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const { token } = theme.useToken();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Documentation", href: "/docs" },
    { name: "About", href: "/about" },
  ];

  const profileItems = useMemo(
    () => [
      {
        key: "login",
        label: (
          <Link href="/login" className="flex items-center gap-2 px-1 py-1">
            <LoginOutlined />
            <span>Login</span>
          </Link>
        ),
      },
      {
        key: "signup",
        label: (
          <Link href="/signup" className="flex items-center gap-2 px-1 py-1">
            <UserAddOutlined />
            <span>Sign Up</span>
          </Link>
        ),
      },
    ],
    []
  );

  const popupRender = (menu: React.ReactNode) => (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl p-2 min-w-[180px]">
      <div className="bg-transparent text-slate-200">
        {React.cloneElement(menu as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0
          }
        })}
      </div>
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-slate-900/80 backdrop-blur-md shadow-lg py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-4 xl:px-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white font-bold text-xl tracking-tight">
            Mail<span className="text-blue-500">ONE</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 hover:text-blue-400
                        ${isActive ? "text-blue-400" : "text-slate-300"}
                    `}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out
                          ${isActive ? "w-full" : "w-0 hover:w-full"}
                      `} />
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          <Dropdown
            menu={{
              items: profileItems,
              className: "!bg-transparent [&>li]:!text-slate-300 [&>li:hover]:!bg-slate-800/50 [&>li:hover]:!text-blue-400"
            }}
            trigger={["click"]}
            placement="bottomRight"
            popupRender={popupRender}
          >
            <button
              className="text-white p-2 rounded-full bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center group"
              aria-label="Profile"
            >
              <Avatar size="small" icon={<UserOutlined />} className="bg-blue-600 group-hover:bg-blue-500 transition-colors" />
            </button>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

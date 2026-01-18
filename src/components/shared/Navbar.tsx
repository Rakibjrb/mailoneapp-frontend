"use client";

import Link from "next/link";
import { Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { JSX, useMemo } from "react";

export default function Navbar(): JSX.Element {
  const items = useMemo(
    () => [
      {
        key: "home",
        label: <Link href="/">Home</Link>,
      },
      {
        key: "documentation",
        label: <Link href="/">Documentation</Link>,
      },
      {
        key: "about",
        label: <Link href="/">About</Link>,
      },
    ],
    []
  );

  const profileItems = useMemo(
    () => [
      {
        key: "login",
        label: <Link href="/">Login</Link>,
      },
      {
        key: "signup",
        label: <Link href="/">Sign Up</Link>,
      },
    ],
    []
  );

  return (
    <div className="flex items-center justify-between max-w-6xl mx-auto w-full py-6 px-4 xl:px-0">
      <div className="flex items-center gap-3">
        <Link href="/" className="text-white font-semibold text-lg">
          MailOne
        </Link>
      </div>

      <div className="flex-none mx-auto">
        <nav className="flex gap-6 items-center">
          {items.map((item: { key: string; label: JSX.Element }) => (
            <div key={item.key}>{item.label}</div>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Dropdown
          menu={{ items: profileItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <button
            className="text-white p-2 rounded-full bg-white/6 hover:bg-white/10 flex items-center"
            aria-label="Profile"
          >
            <Avatar size="small" icon={<UserOutlined />} />
          </button>
        </Dropdown>
      </div>
    </div>
  );
}

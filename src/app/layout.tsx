import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/shared/Toast/ToastContainer";
import "./globals.css";
import StoreProvider from "@/lib/providers/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mail One App",
  description: "Mail one app, send & manage email",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <StyledComponentsRegistry>
            <ToastProvider>
              {children}
              <ToastContainer />
            </ToastProvider>
          </StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}

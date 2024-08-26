import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tasker: Your Daily Task Manager",
  description:
    "Tasker helps you efficiently organize, prioritize, and manage your daily tasks. Stay on top of your responsibilities and boost your productivity with an intuitive and user-friendly interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster
          toastOptions={{
            duration: 5000,
            style: {
              direction: "ltr",
            },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}

"use client"
import { ReactNode } from "react";
import Navbar from "@/app/components/navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-screen bg-gray-100">
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    );
}
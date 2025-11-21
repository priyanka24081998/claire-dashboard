"use client";

import DashMenu from "@/components/DashMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <DashMenu />
      <main className="flex-1 p-6 h-screen overflow-y-auto">{children}</main>
    </div>
  );
}

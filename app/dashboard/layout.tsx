import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Texura AI - Dashboard",
  description: "Create stunning images with AI",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

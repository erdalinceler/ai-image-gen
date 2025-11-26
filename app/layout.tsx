import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Texura AI - Transform your imagination",
  description: "Create stunning images with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={poppins.variable} suppressHydrationWarning>
          <NextTopLoader
            color="#6366f1"
            height={3}
            showSpinner={false}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

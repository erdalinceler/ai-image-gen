import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6366f1",
          borderRadius: "0.5rem",
          fontFamily: "var(--font-poppins), sans-serif",
        },
        elements: {
          formButtonPrimary: 
            "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full font-medium",
          formFieldInput: "rounded-lg",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={poppins.variable} suppressHydrationWarning>
          <Script id="disable-form-validation" strategy="afterInteractive">
            {`
              const observer = new MutationObserver(function() {
                document.querySelectorAll('form').forEach(function(form) {
                  form.setAttribute('novalidate', 'true');
                });
              });
              observer.observe(document.body, { childList: true, subtree: true });
            `}
          </Script>
          <NextTopLoader
            color="#6366f1"
            height={3}
            showSpinner={false}
          />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

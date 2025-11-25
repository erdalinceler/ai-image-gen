"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { AiOutlineStar, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoaded } = useUser();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ fontFamily: 'var(--font-poppins)' }}>
        <Container className="flex h-16 items-center justify-between px-4 md:px-8 border-b border-gray-200" style={{ fontFamily: 'var(--font-poppins)' }}>
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <AiOutlineStar className="size-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">AI Photo</span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {!isLoaded && (
              <>
                <div className="h-9 w-20 bg-gray-200 rounded animate-skeleton" />
                <div className="h-9 w-24 bg-gray-200 rounded-full animate-skeleton" />
              </>
            )}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 rounded-full">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              {pathname === "/dashboard" ? (
                <Link href="/">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    
                    Home
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Dashboard
                  </Button>
                </Link>
              )}
              <UserButton />
            </SignedIn>
          </nav>

          {/* Mobile Menu - Avatar + Hamburger */}
          <div className="md:hidden flex items-center gap-4">
            {!isLoaded && <div className="h-8 w-8 bg-gray-200 rounded-full animate-skeleton" />}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <button
              className="text-black hover:text-indigo-500 transition-colors z-[60]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[55] bg-white/98 backdrop-blur-lg"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <div className="flex flex-col min-h-screen">
            {/* Mobile Menu Header with Close Button */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                  <AiOutlineStar className="size-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">AI Photo</span>
              </Link>
              <button
                className="text-gray-900 hover:text-indigo-500 transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
              >
                <AiOutlineClose className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col items-center justify-center flex-grow gap-8 py-8">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    className="text-2xl text-gray-900 hover:text-indigo-500 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    className="px-8 py-3 text-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                {pathname === "/dashboard" ? (
                  <Link
                    href="/"
                    className="text-2xl text-gray-900 hover:text-indigo-500 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="text-2xl text-gray-900 hover:text-indigo-500 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

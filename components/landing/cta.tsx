"use client";

import Link from "next/link";
import Image from "next/image";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";

export default function CTA() {
  return (
    <section className="py-12 pt-20 md:py-20 bg-muted/40 border-b border-gray-200">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-black">
          <div className="absolute inset-0">
            <Image
              src="/images/A_futuristic_humanoid_robot_st.png"
              alt="AI Robot"
              fill
              className="object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col justify-center min-h-[280px] md:min-h-[320px] p-8 md:p-14 max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-10 md:mb-12 leading-tight">
              Explore Texura AI<br />image Generator Tools
            </h2>
            
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="w-fit bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 rounded-full px-6">
                  Get Started Now!
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="w-fit bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 rounded-full px-6">
                  Get Started Now!
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

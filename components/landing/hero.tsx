"use client"

import Link from "next/link"
import Image from "next/image"
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { AiOutlineStar } from "react-icons/ai"
import { Button } from "@/components/ui/button"
import Container from "@/components/shared/container"

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-muted/40 pb-16 border-b border-gray-200">
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="stars-layer-1 absolute inset-0" />
        <div className="stars-layer-2 absolute inset-0" />
        <div className="stars-layer-3 absolute inset-0" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 animate-pulse rounded-full bg-indigo-500/15 blur-3xl delay-1000" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-pulse rounded-full bg-purple-400/20 blur-3xl delay-500" />
      </div>

      <Container className="relative z-10 pt-20 pb-20 lg:pt-24">
        <div className="flex justify-center mb-8">
          <div className="group inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 backdrop-blur-sm transition-all hover:border-indigo-300 hover:bg-indigo-100">
            <AiOutlineStar className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Sign up and get 5 free image credits</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Transform ideas into stunning visuals with AI
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl text-pretty">
            Describe what you imagine. Watch AI bring it to life in seconds. No design skills needed — just your
            creativity.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="group h-12 min-w-[200px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 rounded-full"
              >
                Sign Up For 5 Free Credits
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="group h-12 min-w-[200px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 rounded-full"
              >
                Go to Dashboard
              </Button>
            </Link>
          </SignedIn>
        </div>

        <div className="relative mt-20 lg:mt-28">
          <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 transform lg:-top-6">
            <div className="flex items-center gap-3 rounded-full border border-indigo-200 bg-white/80 px-5 py-3 shadow-2xl backdrop-blur-md">
              <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-600" />
              <span className="font-mono text-sm text-gray-600">
                &quot;Create a cyberpunk cat with neon lights...&quot;
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl border border-gray-300 bg-gray-100 p-3 shadow-2xl backdrop-blur-sm lg:p-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

            <div className="relative grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-4">
              <div className="group relative aspect-square overflow-hidden rounded-xl bg-secondary border-4 border-indigo-600">
                <Image src="/images/make_cyberpunk_cat.png" alt="AI generated cyberpunk cat" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                  <p className="text-sm font-medium text-white">Cyberpunk Cat</p>
                  <p className="text-xs text-gray-300">Neon city vibes</p>
                </div>
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-xl bg-secondary border-4 border-indigo-600">
                <Image src="/images/make_cyberpunk_chiwawa_breed_d.png" alt="AI generated cyberpunk chihuahua" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                  <p className="text-sm font-medium text-white">Cyber Chihuahua</p>
                  <p className="text-xs text-gray-300">Digital companion</p>
                </div>
              </div>
              <div className="group relative aspect-square overflow-hidden rounded-xl bg-secondary border-4 border-indigo-600">
                <Image src="/images/make_punk_cat .png" alt="AI generated punk cat" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                  <p className="text-sm font-medium text-white">Punk Cat</p>
                  <p className="text-xs text-gray-300">Rebel style</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Examples of AI-generated images you can create with Texura AI
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

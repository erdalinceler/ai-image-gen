"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { AiOutlineStar, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { PiMagicWandFill } from "react-icons/pi";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";

const images = [
  {
    src: "/images/make_cyberpunk_cat.png",
    alt: "AI generated cyberpunk cat",
    title: "Cyberpunk Cat",
    subtitle: "Neon city vibes",
    prompt: "Create a cyberpunk cat with neon lights",
  },
  {
    src: "/images/make_cyberpunk_chiwawa_breed_d.png",
    alt: "AI generated cyberpunk chihuahua",
    title: "Cyber Chihuahua",
    subtitle: "Digital companion",
    prompt: "Make a cyberpunk chihuahua breed dog",
  },
  {
    src: "/images/make_punk_cat .png",
    alt: "AI generated punk cat",
    title: "Punk Cat",
    subtitle: "Rebel style",
    prompt: "Make a punk cat with mohawk",
  },
  {
    src: "/images/_A_Renaissance_style_painting_.png",
    alt: "AI generated Renaissance style painting",
    title: "Renaissance Art",
    subtitle: "Classical beauty",
    prompt: "A Renaissance style painting",
  },
  {
    src: "/images/_A_serene_lake_surrounded_by_a.png",
    alt: "AI generated serene lake landscape",
    title: "Serene Lake",
    subtitle: "Nature's peace",
    prompt: "A serene lake surrounded by autumn trees",
  },
  {
    src: "/images/_A_tranquil_Japanese_garden_in.png",
    alt: "AI generated Japanese garden",
    title: "Japanese Garden",
    subtitle: "Zen tranquility",
    prompt: "A tranquil Japanese garden in spring",
  },
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const currentPrompt = images[selectedIndex].prompt;
    setDisplayedText("");
    setIsTyping(true);
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < currentPrompt.length) {
        setDisplayedText(currentPrompt.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [selectedIndex]);

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
            <span className="text-sm font-medium text-indigo-700">
              Sign up and get 5 free image credits
            </span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Transform ideas into stunning visuals with AI
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl text-pretty">
            Describe what you imagine. Watch AI bring it to life in seconds. No
            design skills needed, just your creativity.
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
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 px-5 py-3 shadow-2xl backdrop-blur-md border border-indigo-300/50">
              <span className="font-mono text-sm text-gray-700 whitespace-nowrap">
                {displayedText}
                {isTyping && <span className="animate-pulse text-indigo-500">|</span>}
              </span>
              <PiMagicWandFill className="h-5 w-5 text-indigo-500 flex-shrink-0" />
            </div>
          </div>

          <div className="relative rounded-2xl border border-gray-300 bg-gray-100 p-3 shadow-2xl backdrop-blur-sm lg:p-4">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/5 via-transparent to-transparent" />

            <div className="relative">
              <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                <div className="flex">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-square min-w-0 flex-[0_0_100%] md:flex-[0_0_33.333%] px-1.5 lg:px-2"
                    >
                      <div className="group relative h-full w-full overflow-hidden rounded-xl border-4 border-indigo-600">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform group-hover:translate-y-0">
                          <p className="text-sm font-medium text-white">
                            {img.title}
                          </p>
                          <p className="text-xs text-gray-300">{img.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors md:left-0 md:-translate-x-1/2"
                aria-label="Previous image"
              >
                <AiOutlineLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors md:right-0 md:translate-x-1/2"
                aria-label="Next image"
              >
                <AiOutlineRight className="w-5 h-5 text-gray-700" />
              </button>

              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === selectedIndex
                        ? "bg-indigo-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
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
  );
}

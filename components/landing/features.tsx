"use client";

import { AiOutlineStar, AiOutlineThunderbolt, AiOutlinePicture, AiOutlineHeart } from "react-icons/ai";
import Container from "@/components/shared/container";

export default function Features() {
  const features = [
    {
      icon: <AiOutlineStar className="w-6 h-6 text-indigo-600" />,
      title: "State-of-the-art AI",
      description: "Powered by the latest AI model for generating high-quality images from text descriptions.",
    },
    {
      icon: <AiOutlineThunderbolt className="w-6 h-6 text-purple-600" />,
      title: "Fast Generation",
      description: "Create AI images in seconds with our optimized image generation pipeline.",
    },
    {
      icon: <AiOutlinePicture className="w-6 h-6 text-indigo-600" />,
      title: "Multiple Styles",
      description: "Choose from various artistic styles to create the perfect image for your needs.",
    },
    {
      icon: <AiOutlineHeart className="w-6 h-6 text-purple-600" />,
      title: "Easy to Use",
      description: "Simple interface that anyone can use. No design skills required.",
    },
  ];

  return (
    <section className="py-20 pb-32 bg-muted/40 border-b border-gray-200">
      <Container>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Choose Texura AI
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border hover:border-indigo-300 transition-all hover:shadow-lg"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

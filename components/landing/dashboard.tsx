"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/landing/header";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to generate image');
      }

      const data = await response.json();
      setImageUrl(data.url);
      setPrompt("");
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:p-6 lg:p-8 pt-24">
        <Container>
          <div className="mx-auto w-full max-w-3xl">
            <h1 className="text-2xl font-semibold mb-6">Generate AI Images</h1>
            
            <div className="bg-card rounded-lg p-6 border">
              <textarea
                placeholder="Describe the image you want to generate..."
                className="w-full min-h-[150px] p-4 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                maxLength={1000}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
              />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">{prompt.length}/1000</span>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 rounded-full"
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                >
                  {loading ? 'Generating...' : 'Generate Image ✨'}
                </Button>
              </div>
              
              {loading && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-2">Creating your image...</p>
                </div>
              )}
              
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Generated Images Grid */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Your Generated Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {imageUrl ? (
                  <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt="Generated image"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">No images yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

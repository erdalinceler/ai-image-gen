"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { AiOutlineDownload } from "react-icons/ai";
import Header from "@/components/landing/header";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { supabase, type GeneratedImage } from "@/lib/supabase";

export default function Dashboard() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [recentImages, setRecentImages] = useState<GeneratedImage[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

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
      
      // Refresh recent images and count
      if (user?.id) {
        const { data: images } = await supabase
          .from('generated_images')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(4);
        
        if (images) setRecentImages(images);

        // Update total count
        const { count } = await supabase
          .from('generated_images')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
        
        setTotalCount(count || 0);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      // Minimum 6 second loading time
      const startTime = Date.now();

      // Fetch recent images
      const { data, error } = await supabase
        .from('generated_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(4);

      if (!error) {
        setRecentImages(data || []);
      }

      // Fetch total count
      const { count } = await supabase
        .from('generated_images')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setTotalCount(count || 0);

      // Ensure minimum 6 seconds have passed
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 6000 - elapsedTime);
      
      setTimeout(() => {
        setIsInitialLoading(false);
      }, remainingTime);
    };

    fetchData();
  }, [user?.id]);

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Download failed silently
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:p-6 lg:p-8 pt-24">
        <Container>
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Generate AI Images</h1>
              {!isInitialLoading && user ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-200">
                  <span className="text-sm font-medium text-indigo-700">
                    {5 - totalCount} / 5 credits left
                  </span>
                </div>
              ) : (
                <div 
                  className="h-9 w-32 bg-gray-200 rounded-full" 
                  style={{ animation: 'skeleton-pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                />
              )}
            </div>
            
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
                {isInitialLoading ? (
                  // Loading skeleton
                  <>
                    <div 
                      className="aspect-square bg-gray-200 rounded-lg" 
                      style={{ animation: 'skeleton-pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                    />
                    <div 
                      className="aspect-square bg-gray-200 rounded-lg" 
                      style={{ animation: 'skeleton-pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                    />
                  </>
                ) : recentImages.length > 0 ? (
                  recentImages.map((img) => (
                    <div key={img.id} className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
                      <Image
                        src={img.image_url}
                        alt={img.prompt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 md:opacity-0 opacity-100 transition-opacity flex flex-col justify-between p-4">
                        <div className="flex-1" />
                        <div className="flex items-end justify-between">
                          <p className="text-white text-sm line-clamp-2 flex-1">{img.prompt}</p>
                          <button
                            onClick={() => handleDownload(img.image_url, img.prompt)}
                            className="ml-2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                            aria-label="Download image"
                          >
                            <AiOutlineDownload className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
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

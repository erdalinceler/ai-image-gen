"use client";

import Header from "@/components/landing/header";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:p-6 lg:p-8 pt-24">
        <Container>
          <div className="mx-auto w-full max-w-3xl">
            <h1 className="text-2xl font-bold mb-6">Generate AI Images</h1>
            
            <div className="bg-card rounded-lg p-6 border">
              <textarea
                placeholder="Describe the image you want to generate..."
                className="w-full min-h-[150px] p-4 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                maxLength={1000}
              />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">0/1000</span>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 rounded-full"
                >
                  Generate Image ✨
                </Button>
              </div>
            </div>

            {/* Generated Images Grid */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Your Generated Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">No images yet</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

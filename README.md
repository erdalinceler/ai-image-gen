# Texura AI

This project is a refactored version of one of my previous projects.

An AI-powered image generation app built with Next.js. Users can create stunning images from text prompts using ClipDrop API.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Authentication:** Clerk
- **Database:** Supabase (PostgreSQL)
- **AI:** ClipDrop API
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui

## Project Structure

```
├── app/
│   ├── api/generate/      # Image generation API endpoint
│   ├── dashboard/         # User dashboard page
│   └── page.tsx           # Landing page
├── components/
│   ├── landing/           # Landing page components (header, footer, hero, etc.)
│   ├── shared/            # Shared components
│   └── ui/                # UI components (button, sonner)
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── utils.ts           # Utility functions
└── middleware.ts          # Clerk auth middleware
```

## Features

- Text-to-image generation
- User authentication
- 5 images per account limit
- Image gallery with download option
- Responsive design

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

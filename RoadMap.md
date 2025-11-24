## 1. Project Overview
Build a modern AI Image Generation web application using Next.js 14+ (App Router). The application serves as a SaaS platform where users can sign up, log in, and generate images via an AI API.

**Key Objectives:**
* High-performance frontend using **Next.js**.
* Secure authentication using **Clerk**.
* Beautiful, accessible UI using **Tailwind CSS** and **ShadCN UI**.
* **Secure Backend:** Strictly protect API routes to prevent unauthorized image generation (Server-Side Validation).
* **Structured Layout:** Use a centralized Container component for consistent alignment.

---

## 2. Tech Stack

* **Framework:** Next.js 14+ (App Router, TypeScript).
* **Styling:** Tailwind CSS.
* **UI Components:** ShadCN UI (Radix UI primitives).
* **Authentication:** Clerk (Next.js SDK).
* **AI Provider:** OpenAI DALL-E 3 (or Replicate/Stable Diffusion).
* **State Management:** React Hooks / Zustand (if needed).
* **Icons:** Lucide React.

---

## 3. Folder Structure (App Router)

Follow this strict structure without Route Groups (parentheses):

```text
/
├── app/
│   ├── auth/                   # Authentication Folder
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── dashboard/              # Protected Dashboard Route
│   │   └── page.tsx            # Image Generation Interface
│   ├── api/
│   │   └── image/              # Backend API
│   │       └── route.ts        # Secure Generation Logic
│   ├── layout.tsx              # Root Layout (ClerkProvider wrapper)
│   └── page.tsx                # Landing Page
├── components/
│   ├── landing/                # Landing specific components
│   │   ├── hero.tsx
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── ui/                     # ShadCN components
│   └── shared/                 # Reusable components
│       └── container.tsx       # Main wrapper component
├── lib/
│   ├── utils.ts                # CN utility
│   └── openai.ts               # AI Client Configuration
├── middleware.ts               # Clerk Middleware
└── public/
4. Core Components & Layout Rules
A. The Container Component (Mandatory)
All main page sections (Header, Hero, Footer) must be wrapped inside the Container component to ensure consistent padding and max-width.

Create components/shared/container.tsx with this exact logic:

TypeScript

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <main className={cn("mx-auto w-full max-w-6xl px-8", className)}>
      {children}
    </main>
  );
}
B. Landing Page (app/page.tsx) implementation
The landing page must be structured as follows:

TypeScript

export default function LandingPage() {
  return (
    <>
      <Container>
        <Header />
        <Hero />
        <Footer />
      </Container>
    </>
  );
}
5. Functional Requirements
A. Authentication (Clerk)
Setup: Wrap app/layout.tsx with <ClerkProvider>.

Routes:

Sign In path: /auth/sign-in

Sign Up path: /auth/sign-up

Middleware: Protect /dashboard and /api. Allow public access to / (Landing) and /auth/*.

B. Dashboard (/dashboard/page.tsx)
This is the main protected application area.

Layout: Clean layout with the UserButton visible.

Functionality:

Input form for prompt.

Loading state handling.

Image display area.

C. Backend API & Security
Route: app/api/image/route.ts

Security:

Verify user session using Clerk's auth().

If !userId, return 401 Unauthorized.

Initialize OpenAI client server-side only.

6. Implementation Steps
Initialize Project: Create Next.js app with TypeScript & Tailwind.

Install ShadCN: Run initialization and add basic components (button, input).

Create Container: Implement components/shared/container.tsx immediately.

Build Landing: Create Header, Hero, Footer and wrap them in the Container.

Setup Clerk: Configure middleware and auth routes in the app/auth/ folder.

Develop Dashboard: Build the secure image generation UI and API connection.
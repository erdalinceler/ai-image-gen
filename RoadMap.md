# Project Specification: AI Image Generator SaaS

## 1. Project Overview
Build a modern AI Image Generation web application using Next.js 14+ (App Router). The application serves as a SaaS platform where users can sign up, log in, and generate images via an AI API.

**Key Objectives:**
* High-performance frontend using **Next.js**.
* Secure authentication using **Clerk**.
* Beautiful, accessible UI using **Tailwind CSS** and **ShadCN UI**.
* **Secure Backend:** Strictly protect API routes to prevent unauthorized image generation (Server-Side Validation).

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

Follow this structure to ensure organized routing and component separation:

```text
/
├── app/
│   ├── (auth)/                 # Authentication Routes (Clerk)
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── (dashboard)/            # Protected App Routes
│   │   └── dashboard/
│   │       └── page.tsx        # Image Generation Interface
│   ├── api/
│   │   └── image/              # Backend API
│   │       └── route.ts        # Secure Generation Logic
│   ├── layout.tsx              # Root Layout (ClerkProvider wrapper)
│   └── page.tsx                # Landing Page (Hero, etc.)
├── components/
│   ├── landing/                # Landing specific components
│   │   ├── hero.tsx
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── ui/                     # ShadCN components (button, input, etc.)
│   └── shared/                 # Reusable components
├── lib/
│   ├── utils.ts                # CN utility
│   └── openai.ts               # AI Client Configuration
├── middleware.ts               # Clerk Middleware (Edge protection)
└── public/
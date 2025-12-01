"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "bg-white border-gray-200 shadow-lg",
          title: "text-gray-900 font-medium",
          description: "text-gray-600",
          success: "!bg-indigo-50 !border-indigo-200 !text-indigo-900 [&>svg]:!text-indigo-600",
          warning: "!bg-purple-50 !border-purple-300 !text-purple-900 [&>svg]:!text-purple-600",
          error: "!bg-red-50 !border-red-200 !text-red-900 [&>svg]:!text-red-600",
          info: "!bg-purple-50 !border-purple-200 !text-purple-900 [&>svg]:!text-purple-600",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "0.75rem",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

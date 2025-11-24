import type React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Container({ children, className = "", style }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-8xl", className)} style={style}>{children}</div>
}

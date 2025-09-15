"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Main Designer Context
const DesignerContext = React.createContext<{
  isToolbarVisible: boolean
  setToolbarVisible: (visible: boolean) => void
}>({
  isToolbarVisible: true,
  setToolbarVisible: () => {}
})

export function useDesigner() {
  const context = React.useContext(DesignerContext)
  if (!context) {
    throw new Error("useDesigner must be used within a Designer component")
  }
  return context
}

// Designer Root Component
interface DesignerProps {
  children: React.ReactNode
  className?: string
}

export function Designer({ children, className }: DesignerProps) {
  const [isToolbarVisible, setToolbarVisible] = React.useState(true)

  return (
    <DesignerContext.Provider value={{ isToolbarVisible, setToolbarVisible }}>
      <div className={cn("relative flex flex-col h-full w-full", className)}>
        {children}
      </div>
    </DesignerContext.Provider>
  )
}

// Designer Content Container
interface DesignerContentProps {
  children: React.ReactNode
  className?: string
}

export function DesignerContent({ children, className }: DesignerContentProps) {
  return (
    <div className={cn("flex-1 relative overflow-hidden", className)}>
      {children}
    </div>
  )
}

// Designer Canvas
interface DesignerCanvasProps {
  children: React.ReactNode
  className?: string
}

export function DesignerCanvas({ children, className }: DesignerCanvasProps) {
  return (
    <div className={cn("w-full h-full relative bg-slate-50 border border-slate-200 rounded-lg overflow-hidden", className)}>
      {children}
    </div>
  )
}

// Designer Frame
interface DesignerFrameProps {
  className?: string
  children?: React.ReactNode
}

export function DesignerFrame({ className, children }: DesignerFrameProps) {
  return (
    <div className={cn("w-full h-full flex items-center justify-center p-8", className)}>
      {children || (
        <div className="text-slate-400 text-center space-y-2">
          <div className="text-6xl">📐</div>
          <p className="text-lg font-medium">Designer Canvas</p>
          <p className="text-sm">Your design content goes here</p>
        </div>
      )}
    </div>
  )
}

// Designer Toolbar Container
interface DesignerToolbarProps {
  children: React.ReactNode
  className?: string
  position?: "top" | "bottom" | "left" | "right"
}

export function DesignerToolbar({ 
  children, 
  className, 
  position = "top" 
}: DesignerToolbarProps) {
  const { isToolbarVisible } = useDesigner()

  if (!isToolbarVisible) return null

  const positionClasses = {
    top: "top-4 left-1/2 -translate-x-1/2",
    bottom: "bottom-4 left-1/2 -translate-x-1/2",
    left: "left-4 top-1/2 -translate-y-1/2 flex-col",
    right: "right-4 top-1/2 -translate-y-1/2 flex-col"
  }

  return (
    <div className={cn(
      "absolute z-50 flex items-center gap-2",
      "h-10 w-fit px-2",
      "rounded-[calc(var(--radius)+4px)] bg-background",
      "shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]",
      positionClasses[position],
      className
    )}>
      {children}
    </div>
  )
}

// Designer Toolbar Group
interface DesignerToolbarGroupProps {
  children: React.ReactNode
  className?: string
}

export function DesignerToolbarGroup({ children, className }: DesignerToolbarGroupProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {children}
    </div>
  )
}

// Designer Toolbar Separator
interface DesignerToolbarSeparatorProps {
  className?: string
}

export function DesignerToolbarSeparator({ className }: DesignerToolbarSeparatorProps) {
  return (
    <div className={cn("w-px h-5 bg-border mx-1", className)} />
  )
}

// Designer Toolbar Button
interface DesignerToolbarButtonProps {
  children: React.ReactNode
  tooltip?: string
  variant?: "default" | "secondary" | "outline" | "ghost"
  size?: "sm" | "default" | "lg" | "icon"
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function DesignerToolbarButton({
  children,
  tooltip,
  variant = "ghost",
  size = "default",
  onClick,
  disabled,
  className
}: DesignerToolbarButtonProps) {
  const button = (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-8 px-2 gap-1 text-xs font-medium",
        "bg-transparent border-0",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "transition-colors duration-150",
        className
      )}
    >
      {children}
    </Button>
  )

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return button
}

// Action Toolbar Add Layer Button
interface ActionToolbarAddLayerProps {
  onAddLayer?: () => void
  className?: string
}

export function ActionToolbarAddLayer({ onAddLayer, className }: ActionToolbarAddLayerProps) {
  return (
    <DesignerToolbarButton
      tooltip="Add Layer"
      onClick={onAddLayer || (() => console.log("Add layer clicked"))}
      className={className}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20M2 12h20" />
      </svg>
      Add Layer
    </DesignerToolbarButton>
  )
}

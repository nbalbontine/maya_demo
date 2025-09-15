"use client"

import * as React from "react"
import { ChevronDown, Camera, Box } from "lucide-react"
import { cn } from "@/lib/utils"

interface ViewmodeToolbarProps {
  className?: string
  onViewModeChange?: (mode: string) => void
  currentMode?: string
}

export function ViewmodeToolbar({ 
  className, 
  onViewModeChange,
  currentMode = "camera" 
}: ViewmodeToolbarProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
    onViewModeChange?.(currentMode)
  }

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Main toolbar container */}
      <div 
        className="bg-white border border-[#f1f1f6] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-1 flex items-center gap-1"
        role="toolbar"
        aria-label="View mode selector"
      >
        {/* Unified button container */}
        <button
          className="bg-white flex items-center justify-center gap-2 px-3 py-2 hover:bg-button-hover transition-colors rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
          onClick={handleButtonClick}
          aria-label="View mode selector"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Camera className="w-5 h-4" />
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Dropdown menu (optional - can be extended) */}
      {isOpen && (
        <div className="absolute bottom-full mb-1 left-0 bg-white border border-[#f1f1f6] rounded-lg shadow-lg z-50 min-w-[120px]">
          <div className="py-1">
            <button 
              className="w-full text-left px-3 py-2 text-sm hover:bg-button-hover transition-colors flex items-center gap-2"
              onClick={() => {
                onViewModeChange?.("camera")
                setIsOpen(false)
              }}
            >
              <Camera className="w-4 h-4" />
              360
            </button>
            <button 
              className="w-full text-left px-3 py-2 text-sm hover:bg-button-hover transition-colors flex items-center gap-2"
              onClick={() => {
                onViewModeChange?.("3d-model")
                setIsOpen(false)
              }}
            >
              <Box className="w-4 h-4" />
              Model
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

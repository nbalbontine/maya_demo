"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface SplitscreenToolbarProps {
  className?: string
  onViewChange?: (view: 'single' | 'split') => void
}

// First component: SplitscreenToolbarFullScreen
export function SplitscreenToolbarFullScreen({ className, onViewChange }: SplitscreenToolbarProps) {
  const handleSingleView = () => {
    onViewChange?.('single')
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-0 relative size-fit",
        className
      )}
    >
      <div className="bg-white flex flex-col gap-1 items-start justify-center p-1 relative rounded-lg border border-[#f1f1f6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Single View Button */}
        <button
          onClick={handleSingleView}
          className="bg-white hover:bg-button-hover active:bg-gray-100 transition-colors flex gap-2.5 items-center justify-center p-2 relative rounded shrink-0 group"
        >
          <div className="flex items-center justify-center overflow-hidden p-0 relative shrink-0 size-4">
            <Image 
              src="/Icons/one_Screen.svg" 
              alt="Single view" 
              width={16} 
              height={16}
              className="h-4 w-4"
            />
          </div>
        </button>
      </div>
    </div>
  )
}

// Second component: SplitscreenToolbarTwo
export function SplitscreenToolbarTwo({ className, onViewChange }: SplitscreenToolbarProps) {
  const handleSplitView = () => {
    onViewChange?.('split')
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-0 relative size-fit",
        className
      )}
    >
      <div className="bg-white flex flex-col gap-1 items-start justify-center p-1 relative rounded-lg border border-[#f1f1f6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Split View Button */}
        <button
          onClick={handleSplitView}
          className="bg-white hover:bg-button-hover active:bg-gray-100 transition-colors flex gap-2.5 items-center justify-center p-2 relative rounded shrink-0 group"
        >
          <div className="flex items-center justify-center p-0 relative shrink-0 size-4">
            <Image 
              src="/Icons/twoscreen.svg" 
              alt="Split view" 
              width={16} 
              height={16}
              className="h-4 w-4"
            />
          </div>
        </button>
      </div>
    </div>
  )
}

// Keep original component for backward compatibility
export function SplitscreenToolbar({ className, onViewChange }: SplitscreenToolbarProps) {
  const handleSingleView = () => {
    onViewChange?.('single')
  }

  const handleSplitView = () => {
    onViewChange?.('split')
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-0 relative size-fit",
        className
      )}
    >
      <div className="bg-white flex flex-col gap-1 items-start justify-center p-1 relative rounded-lg border border-[#f1f1f6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Single View Button */}
        <button
          onClick={handleSingleView}
          className="bg-white hover:bg-button-hover active:bg-gray-100 transition-colors flex gap-2.5 items-center justify-center p-2 relative rounded shrink-0 group"
        >
          <div className="flex items-center justify-center overflow-hidden p-0 relative shrink-0 size-4">
            <Image 
              src="/Icons/one_Screen.svg" 
              alt="Single view" 
              width={16} 
              height={16}
              className="h-4 w-4"
            />
          </div>
        </button>

        {/* Split View Button */}
        <button
          onClick={handleSplitView}
          className="bg-white hover:bg-button-hover active:bg-gray-100 transition-colors flex gap-2.5 items-center justify-center p-2 relative rounded shrink-0 group"
        >
          <div className="flex items-center justify-center p-0 relative shrink-0 size-4">
            <Image 
              src="/Icons/twoscreen.svg" 
              alt="Split view" 
              width={16} 
              height={16}
              className="h-4 w-4"
            />
          </div>
        </button>
      </div>
    </div>
  )
}

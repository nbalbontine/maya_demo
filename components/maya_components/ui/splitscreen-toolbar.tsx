"use client"

import { cn } from "@/lib/utils"

interface SplitscreenToolbarProps {
  className?: string
  onViewChange?: (view: 'single' | 'split') => void
}

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
      <div className="bg-white flex flex-col gap-1 items-start justify-center px-2 py-1 relative rounded-lg border border-[#f1f1f6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Single View Button */}
        <button
          onClick={handleSingleView}
          className="bg-white hover:bg-button-hover active:bg-gray-100 transition-colors flex gap-2.5 items-center justify-center p-2 relative rounded shrink-0 group"
        >
          <div className="flex items-center justify-center overflow-hidden p-0 relative shrink-0 size-4">
            <div className="relative shrink-0 size-3">
              {/* Single pane icon */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="block max-w-none size-full"
              >
                <rect
                  x="1"
                  y="1"
                  width="10"
                  height="10"
                  rx="1"
                  stroke="#474655"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </button>

        {/* Split View Button */}
        <button
          onClick={handleSplitView}
          className="bg-white hover:bg-button-hover active:bg-gray-100 transition-colors flex gap-2.5 items-center justify-center p-2 relative rounded shrink-0 group"
        >
          <div className="flex items-center justify-center p-0 relative shrink-0 size-4">
            <div className="relative shrink-0 size-3">
              {/* Split pane icon */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="block max-w-none size-full"
              >
                <rect
                  x="1"
                  y="1"
                  width="4"
                  height="10"
                  rx="1"
                  stroke="#474655"
                  strokeWidth="1"
                  fill="none"
                />
                <rect
                  x="7"
                  y="1"
                  width="4"
                  height="10"
                  rx="1"
                  stroke="#474655"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

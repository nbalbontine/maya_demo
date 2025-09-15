"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocationToolbarProps {
  /** Current time to display */
  time?: string
  /** Custom date/time object */
  date?: Date
  /** Custom time format function */
  formatTime?: (date: Date) => string
  /** Callback when previous button is clicked */
  onPrevious?: () => void
  /** Callback when next button is clicked */
  onNext?: () => void
  /** Callback when fast previous button is clicked */
  onFastPrevious?: () => void
  /** Callback when fast next button is clicked */
  onFastNext?: () => void
  /** Callback when play button is clicked */
  onPlay?: () => void
  /** Whether the component is disabled */
  disabled?: boolean
  /** Additional CSS classes */
  className?: string
}

const LocationToolbar = React.forwardRef<
  HTMLDivElement,
  LocationToolbarProps
>(({
  time,
  date,
  formatTime,
  onPrevious,
  onNext,
  onFastPrevious,
  onFastNext,
  onPlay,
  disabled = false,
  className,
  ...props
}, ref) => {
  // Default time formatting
  const defaultFormatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  }

  // Determine what time to display
  const displayTime = React.useMemo(() => {
    if (time) return time
    if (date) {
      const formatter = formatTime || defaultFormatTime
      return formatter(date)
    }
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  }, [time, date, formatTime])

  return (
    <div
      ref={ref}
      className={cn(
        "bg-white border border-[#f1f1f6] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center gap-0.5 px-1.5 py-1.5 w-fit",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Fast Previous Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded shrink-0 hover:bg-gray-100"
            onClick={onFastPrevious}
            disabled={disabled}
            aria-label="Fast previous"
          >
            <ChevronsLeft className="h-4 w-4 text-[#474655]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Fast previous</p>
        </TooltipContent>
      </Tooltip>

      {/* Previous Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded shrink-0 hover:bg-gray-100"
            onClick={onPrevious}
            disabled={disabled}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4 text-[#474655]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Previous</p>
        </TooltipContent>
      </Tooltip>

      {/* Play Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded shrink-0 hover:bg-gray-100"
            onClick={onPlay}
            disabled={disabled}
            aria-label="Play"
          >
            <Play className="h-4 w-4 text-[#474655] fill-current" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Play</p>
        </TooltipContent>
      </Tooltip>

      {/* Next Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded shrink-0 hover:bg-gray-100"
            onClick={onNext}
            disabled={disabled}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4 text-[#474655]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Next</p>
        </TooltipContent>
      </Tooltip>

      {/* Fast Next Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded shrink-0 hover:bg-gray-100"
            onClick={onFastNext}
            disabled={disabled}
            aria-label="Fast next"
          >
            <ChevronsRight className="h-4 w-4 text-[#474655]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Fast next</p>
        </TooltipContent>
      </Tooltip>

      {/* Time Display */}
      <div className="flex items-center justify-center pl-1 pr-1 shrink-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className="font-semibold text-[13px] text-[#474655] text-center whitespace-nowrap leading-[13px] cursor-help px-1"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              {displayTime}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Time of capture</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
})

LocationToolbar.displayName = "LocationToolbar"

export { LocationToolbar }

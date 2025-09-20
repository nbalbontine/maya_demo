"use client"

import * as React from "react"
import { CalendarToolbar } from "@/components/maya_components/ui/calendar-toolbar"
import { LocationToolbarMin } from "@/components/maya_components/ui/location-toolbar-min"
import { SplitscreenToolbarFullScreen } from "@/components/maya_components/ui/splitscreen-toolbar"
import { cn } from "@/lib/utils"

interface BottomNavigationHalfLeftProps {
  /** Custom CSS classes */
  className?: string
  /** Calendar toolbar props */
  calendar?: {
    date?: Date
    onDateChange?: (date: Date) => void
    formatDate?: (date: Date) => string
  }
  /** Location toolbar props */
  location?: {
    time?: string
    date?: Date
    formatTime?: (date: Date) => string
    onPrevious?: () => void
    onNext?: () => void
    disabled?: boolean
  }
  /** Split screen toolbar props */
  splitScreen?: {
    onViewChange?: (view: 'single' | 'split') => void
  }
  /** Whether the entire navigation is disabled */
  disabled?: boolean
  /** Show/hide individual toolbar sections */
  visibility?: {
    calendar?: boolean
    location?: boolean
    splitScreen?: boolean
  }
}

const BottomNavigationHalfLeft = React.forwardRef<
  HTMLDivElement,
  BottomNavigationHalfLeftProps
>(({
  className,
  calendar,
  location,
  splitScreen,
  disabled = false,
  visibility = {},
  ...props
}, ref) => {
  // Default visibility to true for all sections
  const {
    calendar: showCalendar = true,
    location: showLocation = true,
    splitScreen: showSplitScreen = true
  } = visibility
  return (
    <div
      ref={ref}
      className={cn(
        "box-border flex items-end px-6 pt-6 pb-8 relative w-full",
        "min-h-[100px]", // Ensure minimum height for proper spacing
        // Responsive behavior for smaller screens
        "sm:flex-row flex-col sm:gap-0 gap-4",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Center section - Main toolbar group */}
      <div className={cn(
        "flex items-center gap-4 flex-1 min-w-0",
        // Keep toolbars centered as in Figma reference
        "justify-center",
        "flex-wrap sm:flex-nowrap"
      )}>
        {/* Calendar Toolbar */}
        {showCalendar && (
          <div className="shrink-0 order-1">
            <CalendarToolbar
              date={calendar?.date}
              onDateChange={calendar?.onDateChange}
              formatDate={calendar?.formatDate}
              className="bg-white border border-[#f1f1f6] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
            />
          </div>
        )}

        {/* Location Toolbar */}
        {showLocation && (
          <div className="shrink-0 order-2">
            <LocationToolbarMin
              time={location?.time}
              date={location?.date}
              formatTime={location?.formatTime}
              onPrevious={location?.onPrevious}
              onNext={location?.onNext}
              disabled={location?.disabled || disabled}
            />
          </div>
        )}

      </div>

      {/* Right section - Split screen toolbar */}
      {showSplitScreen && (
        <div className={cn(
          "absolute right-6 bottom-6",
          "sm:relative sm:right-auto sm:bottom-auto sm:ml-4",
          "shrink-0"
        )}>
          <SplitscreenToolbarFullScreen
            onViewChange={splitScreen?.onViewChange}
          />
        </div>
      )}
    </div>
  )
})

BottomNavigationHalfLeft.displayName = "BottomNavigationHalfLeft"

export { BottomNavigationHalfLeft, type BottomNavigationHalfLeftProps }

"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CalendarPopover } from "@/components/maya_components/ui/calendar-popover"
import { cn } from "@/lib/utils"

interface CalendarToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: Date
  onDateChange?: (date: Date) => void
  formatDate?: (date: Date) => string
}

const CalendarToolbar = React.forwardRef<HTMLDivElement, CalendarToolbarProps>(
  ({ className, date = new Date(), onDateChange, formatDate, ...props }, ref) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

    const handlePrevious = () => {
      const newDate = new Date(date)
      newDate.setMonth(newDate.getMonth() - 1)
      onDateChange?.(newDate)
    }

    const handleNext = () => {
      const newDate = new Date(date)
      newDate.setMonth(newDate.getMonth() + 1)
      onDateChange?.(newDate)
    }

    const defaultFormatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }

    const formattedDate = formatDate ? formatDate(date) : defaultFormatDate(date)

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-between bg-background border rounded-lg shadow-sm px-1 py-1 gap-1",
          className
        )}
        {...props}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handlePrevious}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            <p>Previous month</p>
          </TooltipContent>
        </Tooltip>
        
        <div className="flex-1 text-center">
          <Tooltip>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <button 
                    className="text-sm font-medium text-foreground px-4 cursor-pointer hover:text-primary transition-colors bg-transparent border-none outline-none"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  >
                    {formattedDate}
                  </button>
                </PopoverTrigger>
              </TooltipTrigger>
              <PopoverContent 
                className="w-auto p-0" 
                side="top" 
                align="center"
                sideOffset={24}
              >
                <CalendarPopover 
                  date={date} 
                  onDateChange={(newDate) => newDate && onDateChange?.(newDate)}
                />
              </PopoverContent>
            </Popover>
            <TooltipContent sideOffset={8}>
              <p>Click to select date</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleNext}
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            <p>Next month</p>
          </TooltipContent>
        </Tooltip>
      </div>
    )
  }
)

CalendarToolbar.displayName = "CalendarToolbar"

export { CalendarToolbar, type CalendarToolbarProps }

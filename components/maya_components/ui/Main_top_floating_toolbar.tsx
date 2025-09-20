"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface MainTopFloatingToolbarProps {
  className?: string
  onAddClick?: () => void
  onCameraClick?: () => void
  onMagicWandClick?: () => void
  isAddIssueMode?: boolean
  onAddIssueModeChange?: (isActive: boolean) => void
}

const MainTopFloatingToolbar = React.forwardRef<
  HTMLDivElement,
  MainTopFloatingToolbarProps
>(({ className, onAddClick, onCameraClick, onMagicWandClick, isAddIssueMode = false, onAddIssueModeChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-white border border-[#f1f1f6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-1",
        className
      )}
      {...props}
    >
      {/* Add Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 transition-colors",
              isAddIssueMode && "bg-blue-100 text-blue-600 hover:bg-blue-200"
            )}
            onClick={() => {
              const newMode = !isAddIssueMode
              onAddIssueModeChange?.(newMode)
              onAddClick?.()
            }}
            aria-label="Add item"
          >
            <Image 
              src="/Icons/add_issue6.svg" 
              alt="Add issue" 
              width={24} 
              height={24}
              className="h-4 w-4"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          {isAddIssueMode ? "Exit add issue mode" : "Add issue"}
        </TooltipContent>
      </Tooltip>

      {/* Camera Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 transition-colors"
            onClick={onCameraClick}
            aria-label="Take photo"
          >
            <Image 
              src="/Icons/addview6.svg" 
              alt="Add view" 
              width={24} 
              height={24}
              className="h-4 w-4"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          Add view
        </TooltipContent>
      </Tooltip>

      {/* Magic Wand Button with Dropdown */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 transition-colors gap-1"
            onClick={onMagicWandClick}
            aria-label="Magic tools"
          >
            <Image 
              src="/Icons/mark-up5.svg" 
              alt="Add mark-up" 
              width={24} 
              height={24}
              className="h-4 w-4"
            />
            <ChevronDown className="h-3 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={8}>
          Add mark-up
        </TooltipContent>
      </Tooltip>
    </div>
  )
})

MainTopFloatingToolbar.displayName = "MainTopFloatingToolbar"

export { MainTopFloatingToolbar }
export type { MainTopFloatingToolbarProps }

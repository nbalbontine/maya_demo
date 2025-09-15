

"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Camera, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloorMap } from "./floor-map"

interface TopNavigationProps {
  onBack?: () => void
  onAdd?: () => void
  onPhoto?: () => void
  onMenuAction?: () => void
  className?: string
}

export function TopNavigation({ 
  onBack, 
  onAdd, 
  onPhoto, 
  onMenuAction,
  className 
}: TopNavigationProps) {
  return (
    <div 
      className={cn(
        "box-border content-stretch flex items-start justify-between p-6 relative w-full", 
        className
      )}
      data-name="Top navigation"
    >
      {/* Left content */}
      <div className="basis-0 content-stretch flex grow items-start justify-between min-h-px min-w-px relative shrink-0">
        {/* Back button */}
        <div className="content-stretch flex items-center justify-start relative shrink-0">
          <div className="bg-white box-border content-stretch flex gap-1 items-center justify-start p-1 relative rounded-lg shrink-0 shadow-sm border border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="bg-white p-2 rounded size-8 border-0"
            >
              <ArrowLeft className="size-4 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Main toolbar - centered */}
        <div className="basis-0 content-stretch flex flex-col gap-2.5 grow items-center justify-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex flex-col items-start justify-start relative shrink-0">
            <div className="bg-white box-border content-stretch flex gap-1 items-center justify-start px-2 py-1 relative rounded-lg shrink-0 shadow-sm border border-gray-200">
              {/* Add button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onAdd}
                className="bg-white p-2 rounded size-8 border-0"
              >
                <Plus className="size-4 text-gray-700" />
              </Button>

              {/* Photo button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onPhoto}
                className="bg-white p-2 rounded size-8 border-0"
              >
                <Camera className="size-4 text-gray-700" />
              </Button>

              {/* Split button with dropdown */}
              <div className="content-stretch flex items-start justify-start relative rounded shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMenuAction}
                  className="bg-white p-2 rounded-l size-8 border-0 rounded-r-none"
                >
                  <div className="size-4 text-gray-700">
                    {/* Custom icon placeholder - you can replace with actual menu icon */}
                    <div className="w-3 h-3 bg-gray-600 rounded-sm" />
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMenuAction}
                  className="bg-white p-2 rounded-r size-6 border-0 rounded-l-none pl-0"
                >
                  <ChevronDown className="size-4 text-gray-700" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Floor Map */}
      <div className="shrink-0" data-name="map">
        <FloorMap size="sm" />
      </div>
    </div>
  )
}

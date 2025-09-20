

"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloorMap } from "./floor-map"
import { MainTopFloatingToolbar } from "./Main_top_floating_toolbar"

interface TopNavigationProps {
  onBack?: () => void
  onAdd?: () => void
  onPhoto?: () => void
  onMagicWand?: () => void
  className?: string
}

export function TopNavigation({ 
  onBack, 
  onAdd, 
  onPhoto, 
  onMagicWand,
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
          <MainTopFloatingToolbar
            onBackClick={onBack}
            onAddClick={onAdd}
            onCameraClick={onPhoto}
            onMagicWandClick={onMagicWand}
          />
        </div>
      </div>

      {/* Right side - Floor Map */}
      <div className="shrink-0" data-name="map">
        <FloorMap size="sm" />
      </div>
    </div>
  )
}

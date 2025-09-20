"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MainTopFloatingToolbar } from "./Main_top_floating_toolbar"

interface TopNavigationRightProps {
  onClose?: () => void
  onBack?: () => void
  onAdd?: () => void
  onPhoto?: () => void
  onMagicWand?: () => void
  onMenuAction?: () => void
  onViewChange?: (view: 'single' | 'split') => void
  className?: string
  isAddIssueMode?: boolean
  onAddIssueModeChange?: (isActive: boolean) => void
}

export function TopNavigationRight({ 
  onClose, 
  onBack,
  onAdd, 
  onPhoto, 
  onMagicWand,
  onMenuAction,
  onViewChange,
  className,
  isAddIssueMode,
  onAddIssueModeChange
}: TopNavigationRightProps) {
  const handleClose = () => {
    // Activate fullscreen mode (same as SplitscreenToolbarFullScreen)
    onViewChange?.('single')
    // Also call the original onClose/onBack if provided for backward compatibility
    onClose?.()
    onBack?.()
  }

  return (
    <div 
      className={cn(
        "box-border content-stretch flex items-start justify-between p-6 relative w-full", 
        className
      )}
      data-name="Top navigation right"
    >
      {/* Left content */}
      <div className="basis-0 content-stretch flex grow items-start justify-between min-h-px min-w-px relative shrink-0">
        {/* Close button */}
        <div className="content-stretch flex items-center justify-start relative shrink-0">
          <div className="bg-white box-border content-stretch flex gap-1 items-center justify-start p-1 relative rounded-lg shrink-0 shadow-sm border border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="bg-white p-2 rounded size-8 border-0"
            >
              <X className="size-4 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Main toolbar - centered */}
        <div className="basis-0 content-stretch flex flex-col gap-2.5 grow items-center justify-start min-h-px min-w-px relative shrink-0">
          <MainTopFloatingToolbar
            onAddClick={onAdd}
            onCameraClick={onPhoto}
            onMagicWandClick={onMagicWand || onMenuAction}
            isAddIssueMode={isAddIssueMode}
            onAddIssueModeChange={onAddIssueModeChange}
          />
        </div>
      </div>
    </div>
  )
}

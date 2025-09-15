"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface MinimapProps {
  className?: string
  onFloorPlanChange?: (floorPlan: string) => void
  onZoomIn?: () => void
  onZoomOut?: () => void
}

function Minimap({ 
  className,
  onFloorPlanChange,
  onZoomIn,
  onZoomOut,
  ...props
}: MinimapProps) {
  return (
    <div 
      className={cn(
        "w-full max-w-md bg-background border rounded-lg shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b bg-muted/20">
        <div className="flex-1">
          <Select onValueChange={onFloorPlanChange}>
            <SelectTrigger size="sm" className="w-full">
              <SelectValue placeholder="A-104 - LEVEL 4 FLOOR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a-104-rev-06">A-104 - LEVEL 4 FLOOR PLAN Rev.06</SelectItem>
              <SelectItem value="a-104-rev-05">A-104 - LEVEL 4 FLOOR PLAN Rev.05</SelectItem>
              <SelectItem value="a-104-rev-04">A-104 - LEVEL 4 FLOOR PLAN Rev.04</SelectItem>
              <SelectItem value="a-104-rev-03">A-104 - LEVEL 4 FLOOR PLAN Rev.03</SelectItem>
              <SelectItem value="a-104-rev-02">A-104 - LEVEL 4 FLOOR PLAN Rev.02</SelectItem>
              <SelectItem value="a-104-rev-01">A-104 - LEVEL 4 FLOOR PLAN Rev.01</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Vertical Separator */}
        <div className="w-px h-6 bg-border" />
        
        <div className="flex items-center gap-1">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-7 w-7"
            onClick={onZoomIn}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-7 w-7"
            onClick={onZoomOut}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      {/* Map Area */}
      <div className="relative h-64 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
        {/* Placeholder map content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Floor plan view</p>
            <p className="text-xs text-muted-foreground">Select a revision to explore</p>
          </div>
        </div>
        
        {/* Mock map elements */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        <div className="absolute top-8 right-6 w-2 h-2 bg-blue-500 rounded-full" />
        <div className="absolute bottom-6 left-6 w-2 h-2 bg-green-500 rounded-full" />
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
        
        {/* Grid overlay for map-like appearance */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="text-muted-foreground">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export { Minimap }

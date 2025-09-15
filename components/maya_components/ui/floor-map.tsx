"use client"

import { useState, useRef, useCallback, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { CapturePoint } from "./capture-point"
import { GPSLocator } from "./gps-locator"
import { cn } from "@/lib/utils"

interface Point {
  x: number
  y: number
  id: string
}

interface FloorMapProps {
  size?: "xs" | "sm" | "md" | "lg"
  className?: string
}

// Responsive map dimensions
const MAP_DIMENSIONS = {
  xs: { width: 238, height: 150.56 },
  sm: { width: 362, height: 229 },
  md: { width: 664, height: 407.39 },
  lg: { width: 1153.97, height: 730 }
}

// Base path coordinates creating a stylized animal shape (cat/dog) with perked ears
const BASE_PATH_POINTS: Point[] = [
  // Start at the nose/snout - START POINT
  { x: 0.15, y: 0.35, id: "start" },   // Start point - Nose tip (moved 110px up total)
  { x: 0.18, y: 0.40, id: "2" },   // Snout curve (moved 60px up)
  { x: 0.22, y: 0.46, id: "3" },   // Upper snout
  { x: 0.26, y: 0.44, id: "4" },   // Approaching face
  
  // Head and face outline
  { x: 0.30, y: 0.42, id: "5" },   // Lower face
  { x: 0.34, y: 0.38, id: "6" },   // Cheek area
  { x: 0.38, y: 0.34, id: "7" },   // Side of head
  { x: 0.42, y: 0.30, id: "8" },   // Upper head
  { x: 0.46, y: 0.26, id: "9" },   // Forehead
  
  // Left ear (perked up)
  { x: 0.48, y: 0.22, id: "10" },  // Ear base
  { x: 0.50, y: 0.18, id: "11" },  // Ear rising
  { x: 0.52, y: 0.14, id: "12" },  // Ear tip (sharp)
  { x: 0.54, y: 0.18, id: "13" },  // Ear back down
  { x: 0.56, y: 0.22, id: "14" },  // Ear to head
  
  // Top of head between ears
  { x: 0.60, y: 0.24, id: "15" },  // Between ears
  { x: 0.64, y: 0.22, id: "16" },  // Moving to right ear
  
  // Right ear (perked up)
  { x: 0.66, y: 0.18, id: "17" },  // Right ear base
  { x: 0.68, y: 0.14, id: "18" },  // Right ear rising
  { x: 0.70, y: 0.10, id: "19" },  // Right ear tip (sharp)
  { x: 0.72, y: 0.14, id: "20" },  // Right ear back
  { x: 0.74, y: 0.18, id: "21" },  // Ear to head
  
  // Right side of head and neck - S-shaped curve
  { x: 0.76, y: 0.22, id: "22" },  // Right forehead
  { x: 0.78, y: 0.26, id: "23" },  // Right head side
  { x: 0.80, y: 0.30, id: "24" },  // Right cheek
  { x: 0.82, y: 0.34, id: "25" },  // Right jaw
  
  // S-shaped neck curve - first curve outward
  { x: 0.85, y: 0.37, id: "26" },  // Neck starts curving out
  { x: 0.87, y: 0.40, id: "27" },  // First S curve peak (outward)
  { x: 0.88, y: 0.43, id: "28" },  // S curve transition
  
  // S-shaped neck curve - second curve inward
  { x: 0.86, y: 0.46, id: "29" },  // S curve dips inward
  { x: 0.84, y: 0.49, id: "30" },  // Deeper inward curve
  { x: 0.86, y: 0.52, id: "31" },  // S curve flows back out
  
  // Body outline - flowing curves
  { x: 0.88, y: 0.54, id: "32" },  // Neck to shoulder connection
  { x: 0.90, y: 0.56, id: "33" },  // Shoulder
  { x: 0.90, y: 0.60, id: "34" },  // Upper back
  { x: 0.88, y: 0.64, id: "35" },  // Back curve
  { x: 0.86, y: 0.68, id: "36" },  // Lower back
  
  // Tail area (flowing)
  { x: 0.84, y: 0.72, id: "37" },  // Tail base
  { x: 0.82, y: 0.76, id: "38" },  // Tail curve
  { x: 0.80, y: 0.80, id: "39" },  // Tail flowing
  { x: 0.76, y: 0.82, id: "40" },  // Tail end
  
  // Bottom body line
  { x: 0.72, y: 0.80, id: "41" },  // Lower body
  { x: 0.68, y: 0.78, id: "42" },  // Belly area
  { x: 0.64, y: 0.76, id: "43" },  // Mid belly
  { x: 0.60, y: 0.74, id: "44" },  // Lower chest
  
  // Front legs suggestion
  { x: 0.56, y: 0.72, id: "45" },  // Chest to leg
  { x: 0.48, y: 0.76, id: "46" },  // Leg bottom
  
  // Back to chest and neck - S-shaped on left side too
  { x: 0.40, y: 0.72, id: "47" },  // Chest area
  { x: 0.34, y: 0.64, id: "48" },  // Left neck base (S-curve start)
  { x: 0.32, y: 0.60, id: "49" },  // Left neck S-curve inward
  { x: 0.30, y: 0.56, id: "50" },  // Left neck S-curve deeper
  { x: 0.28, y: 0.52, id: "51" },  // Left neck S-curve outward
  
  // End point - 100px away from start point
  { x: 0.24, y: 0.64, id: "end" }   // END POINT - 100px away from start point
]

export function FloorMap({ 
  size = "lg", 
  className
}: FloorMapProps) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null)
  
  const svgRef = useRef<SVGSVGElement>(null)
  const dimensions = MAP_DIMENSIONS[size]

  // Get adaptive point count based on size
  const getPointCount = useCallback(() => {
    switch (size) {
      case "xs": return 25
      case "sm": return 30
      case "md": return 45
      case "lg": return 52
      default: return 52
    }
  }, [size])

  // Scale and filter points based on size - memoized to prevent infinite re-renders
  const scaledPoints = useMemo(() => {
    const pointCount = getPointCount()
    
    // For smaller sizes, distribute points more evenly along the path
    let selectedPoints: Point[]
    
    if (pointCount >= BASE_PATH_POINTS.length) {
      // Use all points for large sizes
      selectedPoints = BASE_PATH_POINTS
    } else {
      // For smaller sizes, select points to maintain path shape
      selectedPoints = []
      const step = (BASE_PATH_POINTS.length - 1) / (pointCount - 1)
      
      for (let i = 0; i < pointCount; i++) {
        const index = Math.round(i * step)
        selectedPoints.push(BASE_PATH_POINTS[index])
      }
    }
    
    // Convert percentage coordinates to actual pixel coordinates
    return selectedPoints.map(point => ({
      ...point,
      x: point.x * dimensions.width,
      y: point.y * dimensions.height
    }))
  }, [dimensions, getPointCount])

  // Calculate map content boundaries
  const getMapBounds = useCallback(() => {
    if (scaledPoints.length === 0) return { minX: 0, minY: 0, maxX: dimensions.width, maxY: dimensions.height }
    
    const padding = 50 // Add padding around the path
    const minX = Math.max(0, Math.min(...scaledPoints.map(p => p.x)) - padding)
    const minY = Math.max(0, Math.min(...scaledPoints.map(p => p.y)) - padding)
    const maxX = Math.min(dimensions.width, Math.max(...scaledPoints.map(p => p.x)) + padding)
    const maxY = Math.min(dimensions.height, Math.max(...scaledPoints.map(p => p.y)) + padding)
    
    return { minX, minY, maxX, maxY }
  }, [scaledPoints, dimensions])

  // Calculate pan limits based on zoom level and content bounds
  const getPanLimits = useCallback(() => {
    const bounds = getMapBounds()
    const containerWidth = dimensions.width
    const containerHeight = dimensions.height
    
    // Transform origin is "center center", so scaling happens from container center
    const containerCenterX = containerWidth / 2
    const containerCenterY = containerHeight / 2
    
    // Calculate content bounds relative to container center (since that's our transform origin)
    const contentMinX = bounds.minX - containerCenterX
    const contentMaxX = bounds.maxX - containerCenterX
    const contentMinY = bounds.minY - containerCenterY
    const contentMaxY = bounds.maxY - containerCenterY
    
    // When zoomed, these bounds get scaled from center
    const scaledContentMinX = contentMinX * zoom
    const scaledContentMaxX = contentMaxX * zoom
    const scaledContentMinY = contentMinY * zoom
    const scaledContentMaxY = contentMaxY * zoom
    
    // Convert back to absolute coordinates (add container center back)
    const absoluteMinX = scaledContentMinX + containerCenterX
    const absoluteMaxX = scaledContentMaxX + containerCenterX
    const absoluteMinY = scaledContentMinY + containerCenterY
    const absoluteMaxY = scaledContentMaxY + containerCenterY
    
    // Calculate pan limits to keep content within view
    // We can pan left until the right edge of content reaches the right edge of container
    const maxPanLeft = Math.min(0, containerWidth - absoluteMaxX)
    // We can pan right until the left edge of content reaches the left edge of container
    const maxPanRight = Math.max(0, -absoluteMinX)
    // We can pan up until the bottom edge of content reaches the bottom edge of container
    const maxPanUp = Math.min(0, containerHeight - absoluteMaxY)
    // We can pan down until the top edge of content reaches the top edge of container
    const maxPanDown = Math.max(0, -absoluteMinY)
    
    return {
      minX: maxPanLeft,
      maxX: maxPanRight,
      minY: maxPanUp,
      maxY: maxPanDown
    }
  }, [getMapBounds, dimensions, zoom])

  // Constrain pan to limits
  const constrainPan = useCallback((newPan: { x: number; y: number }) => {
    const limits = getPanLimits()
    return {
      x: Math.max(limits.minX, Math.min(limits.maxX, newPan.x)),
      y: Math.max(limits.minY, Math.min(limits.maxY, newPan.y))
    }
  }, [getPanLimits])

  // Generate SVG path for smooth flowing lines using curves (from start to end, no loop)
  const generatePath = useCallback(() => {
    if (scaledPoints.length < 2) return ""
    
    let path = `M ${scaledPoints[0].x} ${scaledPoints[0].y}`
    
    // Create smooth curves between points for organic flowing appearance
    for (let i = 1; i < scaledPoints.length; i++) {
      const current = scaledPoints[i]
      const prev = scaledPoints[i - 1]
      const next = scaledPoints[i + 1] // Don't loop back to start for next
      
      // Calculate control points for smooth curves
      const tension = 0.3 // Curve smoothness factor
      const cp1x = prev.x + (current.x - prev.x) * tension
      const cp1y = prev.y + (current.y - prev.y) * tension
      
      if (next) {
        const cp2x = current.x - (next.x - current.x) * tension
        const cp2y = current.y - (next.y - current.y) * tension
        
        // Use quadratic curves for smoother animal-like flowing lines
        if (i === 1) {
          // First curve - start with smooth transition
          path += ` Q ${cp1x} ${cp1y} ${current.x} ${current.y}`
        } else {
          // Subsequent curves - create flowing connections
          path += ` S ${cp2x} ${cp2y} ${current.x} ${current.y}`
        }
      } else {
        // Last point (end) - just draw line to it
        path += ` L ${current.x} ${current.y}`
      }
    }
    
    // Do NOT close the path (no 'Z') - path goes from start to end without looping
    
    return path
  }, [scaledPoints])

  // Zoom controls with pan constraint - currently unused but kept for future enhancement
  // const handleZoomIn = useCallback(() => {
  //   setZoom(prev => {
  //     const newZoom = Math.min(prev + 0.25, 3)
  //     // Apply pan constraints for the new zoom level
  //     setTimeout(() => setPan(currentPan => constrainPan(currentPan)), 0)
  //     return newZoom
  //   })
  // }, [constrainPan])

  // const handleZoomOut = useCallback(() => {
  //   setZoom(prev => {
  //     const newZoom = Math.max(prev - 0.25, 1)
  //     // Apply pan constraints for the new zoom level
  //     setTimeout(() => setPan(currentPan => constrainPan(currentPan)), 0)
  //     return newZoom
  //   })
  // }, [constrainPan])

  // Pan controls
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }, [pan])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    const newPan = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    }
    setPan(constrainPan(newPan))
  }, [isDragging, dragStart, constrainPan])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Wheel zoom with pan constraint
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom(prev => {
      const newZoom = Math.max(1, Math.min(3, prev + delta))
      // Apply pan constraints for the new zoom level
      setTimeout(() => setPan(currentPan => constrainPan(currentPan)), 0)
      return newZoom
    })
  }, [constrainPan])


  const handlePointClick = useCallback((pointId: string) => {
    setSelectedPoint(selectedPoint === pointId ? null : pointId)
  }, [selectedPoint])

  const handlePointHover = useCallback((pointId: string, hovered: boolean) => {
    setHoveredPoint(hovered ? pointId : null)
  }, [])

  // Get the coordinates of the selected point for GPS locator positioning
  const getSelectedPointCoordinates = useCallback(() => {
    if (!selectedPoint) return null
    const point = scaledPoints.find(p => p.id === selectedPoint)
    return point ? { x: point.x, y: point.y } : null
  }, [selectedPoint, scaledPoints])

  // Apply pan constraints when zoom or dimensions change
  useEffect(() => {
    setPan(currentPan => constrainPan(currentPan))
  }, [constrainPan, zoom, size])

  return (
    <div 
      className={cn(
        "relative bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg",
        className
      )}
      style={{ 
        width: dimensions.width, 
        height: dimensions.height 
      }}
    >
      <motion.div
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        animate={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          className="w-full h-full"
        >
          {/* Define the background image pattern */}
          <defs>
            <pattern
              id="backgroundMap"
              x="0"
              y="0"
              width={dimensions.width}
              height={dimensions.height}
              patternUnits="userSpaceOnUse"
            >
              <image
                href="/Map content lg 2.jpg"
                x="0"
                y="0"
                width={dimensions.width}
                height={dimensions.height}
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>

          {/* Background with map image */}
          <rect
            width={dimensions.width}
            height={dimensions.height}
            fill="url(#backgroundMap)"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
          
          
          {/* Solid path lines */}
          <path
            d={generatePath()}
            stroke="#89C6ED"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Capture points - no longer show selected state visually */}
          {scaledPoints.map((point, index) => (
            <CapturePoint
              key={point.id}
              x={point.x}
              y={point.y}
              index={index}
              isStart={point.id === 'start'}
              isEnd={point.id === 'end'}
              isSelected={false} // Never show blue selected state
              isHovered={hoveredPoint === point.id}
              onClick={() => handlePointClick(point.id)}
              onHover={(hovered) => handlePointHover(point.id, hovered)}
            />
          ))}

          {/* GPS Locator positioned at selected point - inside SVG */}
          {selectedPoint && getSelectedPointCoordinates() && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.3
              }}
            >
              <foreignObject
                x={getSelectedPointCoordinates()!.x - 45} // Center the 90px wide GPS locator
                y={getSelectedPointCoordinates()!.y - 45} // Center the 90px tall GPS locator
                width="90"
                height="90"
                style={{ pointerEvents: "none" }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <GPSLocator 
                    direction="west"
                    className="scale-75" // Make it smaller to fit better on the map
                  />
                </div>
              </foreignObject>
            </motion.g>
          )}
        </svg>
      </motion.div>

    </div>
  )
}

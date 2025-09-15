"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CapturePointProps {
  x: number
  y: number
  index: number
  isStart?: boolean
  isEnd?: boolean
  isSelected?: boolean
  isHovered?: boolean
  onClick?: () => void
  onHover?: (hovered: boolean) => void
  className?: string
}

export function CapturePoint({
  x,
  y,
  index,
  isStart = false,
  isEnd = false,
  isSelected = false,
  isHovered = false,
  onClick,
  onHover,
  className
}: CapturePointProps) {
  const getPointColor = () => {
    if (isStart) return "#22c55e" // green-500
    if (isEnd) return "#ef4444" // red-500
    if (isSelected) return "#3b82f6" // blue-500
    return "#89C6ED" // Sky blue from Figma
  }

  const getPointSize = () => {
    if (isStart || isEnd) return 6
    if (isSelected || isHovered) return 5
    return 4
  }

  return (
    <motion.g
      initial={{ scale: 1, opacity: 1 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        transition: { delay: index * 0.02 }
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Outer ring for start/end points */}
      {(isStart || isEnd) && (
        <motion.circle
          cx={x}
          cy={y}
          r={8}
          fill="none"
          stroke={getPointColor()}
          strokeWidth={2}
          opacity={0.6}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.02 + 0.1 }}
        />
      )}
      
      {/* Main point */}
      <motion.circle
        cx={x}
        cy={y}
        r={getPointSize()}
        fill={getPointColor()}
        stroke="#ffffff"
        strokeWidth={1}
        className={cn(
          "cursor-pointer transition-all duration-200",
          isHovered && "drop-shadow-lg",
          className
        )}
        onClick={onClick}
        onMouseEnter={() => onHover?.(true)}
        onMouseLeave={() => onHover?.(false)}
        whileHover={{ 
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
          transition: { duration: 0.2 }
        }}
      />
      
      {/* Point number for start/end */}
      {(isStart || isEnd) && (
        <motion.text
          x={x}
          y={y + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8"
          fill="#ffffff"
          fontWeight="bold"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.02 + 0.2 }}
        >
          {isStart ? 'S' : 'E'}
        </motion.text>
      )}
    </motion.g>
  )
}

'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface FloatingToolbarProps {
  currentDate?: Date
  onDateChange?: (date: Date) => void
  className?: string
  style?: React.CSSProperties
}

export default function FloatingToolbar({ 
  currentDate = new Date(), 
  onDateChange,
  className = '',
  style
}: FloatingToolbarProps) {
  const [selectedDate, setSelectedDate] = useState(currentDate)

  const formatDate = (date: Date) => {
    const day = date.getDate()
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' : 
                   day === 2 || day === 22 ? 'nd' : 
                   day === 3 || day === 23 ? 'rd' : 'th'
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).replace(/(\d+)/, `$1${suffix}`)
  }

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 1)
    setSelectedDate(newDate)
    onDateChange?.(newDate)
  }

  const handleNextDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 1)
    setSelectedDate(newDate)
    onDateChange?.(newDate)
  }

  return (
    <div 
      className={`
        inline-flex items-center gap-1
        bg-white 
        border-2 border-gray-300
        rounded-xl 
        px-3 py-2
        shadow-2xl
        ${className}
      `}
      style={style}
    >
      {/* Left Navigation Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePreviousDay}
        className="h-10 w-10 hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center bg-gray-100"
        aria-label="Previous day"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </Button>

      {/* Date Display */}
      <div className="px-6 py-2 flex items-center justify-center">
        <span className="text-base font-semibold text-gray-900 text-center whitespace-nowrap">
          {formatDate(selectedDate)}
        </span>
      </div>

      {/* Right Navigation Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNextDay}
        className="h-10 w-10 hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center bg-gray-100"
        aria-label="Next day"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </Button>
    </div>
  )
}

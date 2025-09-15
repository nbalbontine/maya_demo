"use client"

import { BottomNavigation } from "@/components/maya_components/ui/bottom-navigation-full-screen"
import { useState } from "react"

export default function BottomNavigationDemo() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentMode, setCurrentMode] = useState("camera")

  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate)
    console.log("Date changed to:", newDate)
  }

  const handleViewModeChange = (mode: string) => {
    setCurrentMode(mode)
    console.log("View mode changed to:", mode)
  }

  const handleViewChange = (view: 'single' | 'split') => {
    console.log("Split view changed to:", view)
  }

  const handleLocationControls = {
    onPrevious: () => console.log("Previous time"),
    onNext: () => console.log("Next time"),
    onFastPrevious: () => console.log("Fast previous time"),
    onFastNext: () => console.log("Fast next time"),
    onPlay: () => console.log("Play time")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Bottom Navigation - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0">
        <BottomNavigation
          calendar={{
            date: currentDate,
            onDateChange: handleDateChange,
            formatDate: (date) => date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          }}
          location={{
            ...handleLocationControls,
            time: new Date().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              timeZoneName: 'short'
            })
          }}
          viewMode={{
            onViewModeChange: handleViewModeChange,
            currentMode: currentMode
          }}
          splitScreen={{
            onViewChange: handleViewChange
          }}
        />
      </div>
    </div>
  )
}

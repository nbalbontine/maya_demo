"use client"

import { CalendarToolbar } from "@/components/maya_components/ui/calendar-toolbar"
import { useState } from "react"

export default function CalendarToolbarDemo() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Calendar Toolbar Demo</h1>
          <p className="text-muted-foreground">
            Hover over the date to see the calendar popover with animation
          </p>
        </div>
        
        <div className="flex justify-center">
          <CalendarToolbar 
            date={date} 
            onDateChange={setDate}
          />
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          Current selected date: {date.toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

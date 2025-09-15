"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

interface CalendarPopoverProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
}

export function CalendarPopover({ date, onDateChange }: CalendarPopoverProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)

  const handleDateSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate)
    onDateChange?.(newDate)
  }

  return (
    <Calendar
      mode="single"
      defaultMonth={selectedDate}
      selected={selectedDate}
      onSelect={handleDateSelect}
      captionLayout="dropdown"
      className="rounded-lg border-0 shadow-none"
    />
  )
}

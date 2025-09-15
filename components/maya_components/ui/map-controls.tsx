"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { IconMapPin } from "@tabler/icons-react"
import { motion } from "framer-motion"

interface MapControlsProps {
  className?: string
}

export function MapControls({
  className
}: MapControlsProps) {

  return (
    <motion.div
      className={`absolute top-4 right-4 z-10 space-y-3 ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >

      {/* Map Tools */}
      <Card className="p-2 bg-white/90 backdrop-blur-sm shadow-lg border-0">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title="Reset View"
          >
            <IconMapPin className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

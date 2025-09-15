"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface TestComponentProps {
  className?: string
  variant?: 'default' | 'colorful' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
}

const colors = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
]

const quotes = [
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Stay hungry, stay foolish.",
  "Design is not just what it looks like - design is how it works.",
  "Simplicity is the ultimate sophistication.",
  "The future belongs to those who believe in the beauty of their dreams."
]

export function TestComponent({ 
  className = "", 
  variant = "default",
  size = "md" 
}: TestComponentProps) {
  const [currentColor, setCurrentColor] = useState(colors[0])
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [randomNumber, setRandomNumber] = useState(42)

  const sizeClasses = {
    sm: "w-64 h-48",
    md: "w-80 h-64", 
    lg: "w-96 h-80"
  }

  const variantClasses = {
    default: "bg-white border-2 border-gray-200",
    colorful: "bg-gradient-to-br from-purple-400 to-blue-500 text-white",
    minimal: "bg-gray-50 border border-gray-100 shadow-sm"
  }

  const generateRandomValues = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)]
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)]
    const newNumber = Math.floor(Math.random() * 1000) + 1
    
    setCurrentColor(newColor)
    setCurrentQuote(newQuote)
    setRandomNumber(newNumber)
    setClickCount(prev => prev + 1)
    setIsAnimating(true)
    
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomNumber(Math.floor(Math.random() * 1000) + 1)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`h-full ${variantClasses[variant]} overflow-hidden relative`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Test Component</span>
            <motion.div 
              className={`w-4 h-4 rounded-full ${currentColor}`}
              animate={{ 
                scale: isAnimating ? [1, 1.5, 1] : 1,
                rotate: isAnimating ? 360 : 0
              }}
              transition={{ duration: 0.5 }}
            />
          </CardTitle>
          <CardDescription className={variant === 'colorful' ? 'text-white/80' : ''}>
            A random interactive component for testing
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center">
            <motion.div 
              className="text-3xl font-bold"
              key={randomNumber}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {randomNumber}
            </motion.div>
            <p className="text-sm opacity-70">Random Number</p>
          </div>

          <motion.blockquote 
            className="text-sm italic text-center px-2"
            key={currentQuote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            "{currentQuote}"
          </motion.blockquote>

          <div className="flex justify-center space-x-2">
            <Button 
              onClick={generateRandomValues}
              size="sm"
              variant={variant === 'colorful' ? 'secondary' : 'default'}
              className="transition-all duration-200 hover:scale-105"
            >
              Randomize
            </Button>
            <Button 
              onClick={() => setClickCount(0)}
              size="sm"
              variant="outline"
              className="transition-all duration-200 hover:scale-105"
            >
              Reset
            </Button>
          </div>

          <div className="text-center text-xs opacity-60">
            Clicks: {clickCount}
          </div>
        </CardContent>

        {/* Floating animated circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-current opacity-20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`
              }}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

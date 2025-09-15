"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type Direction = "north" | "northeast" | "east" | "southeast" | "south" | "southwest" | "west" | "northwest";

interface GPSLocatorProps {
  direction?: Direction;
  className?: string;
}

interface GPSLocatorDemoProps {
  className?: string;
}

const directionRotation: Record<Direction, number> = {
  north: 0,
  northeast: 45,
  east: 90,
  southeast: 135,
  south: 180,
  southwest: 225,
  west: 270,
  northwest: 315,
};

function GPSLocator({ 
  direction = "north", 
  className = "" 
}: GPSLocatorProps) {
  const rotation = directionRotation[direction];

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ 
        width: 120, 
        height: 120 
      }}
    >
      <div className="relative">
        {/* GPS Unit - Circle and Cone rotate together */}
        <motion.div
          className="relative"
          animate={{ 
            rotate: rotation
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
        >
          {/* Central Circle - vertex anchor point */}
          <motion.div
            className="relative z-10 bg-blue-600 rounded-full shadow-lg border-2 border-white"
            style={{
              width: 20,
              height: 20,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />

          {/* Direction Cone - vertex hidden under circle, cone extends outward */}
          <motion.div
            className="absolute bg-gradient-to-b from-blue-400 to-transparent"
            style={{
              width: 50,
              height: 60,
              clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)", // vertex at bottom center, base at top
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -85%)", // Move up more so vertex is under circle
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function GPSLocatorDemo({ className = "" }: GPSLocatorDemoProps) {
  const [direction, setDirection] = useState<Direction>("north");

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main GPS Locator Display */}
      <div className="flex justify-center">
        <GPSLocator 
          direction={direction}
        />
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Direction Controls */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-700 text-center">Direction</h4>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-2 max-w-xs">
              {/* Top row */}
              <div></div>
              <button
                onClick={() => setDirection("north")}
                className={`px-3 py-2 rounded-lg shadow text-xs font-medium transition-all ${
                  direction === "north"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50"
                }`}
              >
                N
              </button>
              <div></div>
              
              {/* Middle row */}
              <button
                onClick={() => setDirection("northwest")}
                className={`px-2 py-2 rounded-lg shadow text-xs font-medium transition-all ${
                  direction === "northwest"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50"
                }`}
              >
                NW
              </button>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                </div>
              </div>
              <button
                onClick={() => setDirection("northeast")}
                className={`px-2 py-2 rounded-lg shadow text-xs font-medium transition-all ${
                  direction === "northeast"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50"
                }`}
              >
                NE
              </button>
              
              {/* Bottom row */}
              <button
                onClick={() => setDirection("west")}
                className={`px-3 py-2 rounded-lg shadow text-xs font-medium transition-all ${
                  direction === "west"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50"
                }`}
              >
                W
              </button>
              <div></div>
              <button
                onClick={() => setDirection("east")}
                className={`px-3 py-2 rounded-lg shadow text-xs font-medium transition-all ${
                  direction === "east"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50"
                }`}
              >
                E
              </button>
              
              {/* Fourth row */}
              <button
                onClick={() => setDirection("southwest")}
                className={`px-2 py-2 rounded-lg shadow text-xs font-medium transition-all ${
                  direction === "southwest"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50"
                }`}
              >
                SW
              </button>
              <div></div>
              <button
                onClick={() => setDirection("southeast")}
                className={`px-2 py-2 rounded-lg shadow text-xs font-medium transition-all ${
                  direction === "southeast"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50"
                }`}
              >
                SE
              </button>
              
              {/* Bottom row */}
              <div></div>
              <button
                onClick={() => setDirection("south")}
                className={`px-3 py-2 rounded-lg shadow text-xs font-medium transition-all ${
                  direction === "south"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-blue-50"
                }`}
              >
                S
              </button>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Settings Display */}
      <div className="text-center text-sm text-slate-600 space-y-1">
        <p>Direction: <span className="font-medium">{direction}</span></p>
      </div>
    </div>
  );
}

export { GPSLocator, GPSLocatorDemo };

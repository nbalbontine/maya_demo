"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BottomNavigation } from "@/components/maya_components/ui/bottom-navigation-full-screen"
import { BottomNavigationHalfLeft } from "@/components/maya_components/ui/bottom_navigation_half_left"
import { BottomNavigation as BottomNavigationNoSplit } from "@/components/maya_components/ui/bottom-navigation-half_right"
import { TopNavigation } from "@/components/maya_components/ui/top-navigation"
import { TopNavigationRight } from "@/components/maya_components/ui/top-navigation-right"
import { MainTopFloatingToolbar } from "@/components/maya_components/ui/Main_top_floating_toolbar"
import { CalendarToolbar } from "@/components/maya_components/ui/calendar-toolbar"
import { LocationToolbar } from "@/components/maya_components/ui/location-toolbar"
import { LocationToolbarMin } from "@/components/maya_components/ui/location-toolbar-min"
import { ViewmodeToolbar } from "@/components/maya_components/ui/viewmode-toolbar"
import { SplitscreenToolbar } from "@/components/maya_components/ui/splitscreen-toolbar"
import { FloorMap } from "@/components/maya_components/ui/floor-map"
import { GPSLocatorDemo } from "@/components/maya_components/ui/gps-locator"
import { ToolbarMainDemo } from "@/components/maya_components/ui/toolbar-main"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import Link from "next/link"
import { Toaster } from "sonner"
import SplitViewer from "@/components/maya_components/ui/split-viewer"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function UIShowcase() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentMode, setCurrentMode] = useState("camera")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

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

  const handleTopNavigation = {
    onBack: () => console.log("Back button clicked"),
    onAdd: () => console.log("Add button clicked"),
    onPhoto: () => console.log("Photo button clicked"),
    onMenuAction: () => console.log("Menu action clicked")
  }

  const handleToolbarActions = {
    onAddClick: () => console.log("Add clicked"),
    onCameraClick: () => console.log("Camera clicked"),
    onMagicWandClick: () => console.log("Magic wand clicked")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Maya Components UI Showcase
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Complete collection of Maya UI components with interactive demos. 
            All components are built with shadcn/ui and designed for modern applications.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button variant="outline">← Back to Home</Button>
            </Link>
            <Link href="/bottom-navigation-demo">
              <Button variant="outline">Bottom Nav Demo</Button>
            </Link>
            <Link href="/main-toolbar-demo">
              <Button variant="outline">Toolbar Demo</Button>
            </Link>
          </div>
        </div>

        {/* Navigation Components */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Navigation Components</h2>
          
          {/* Top Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🧭 Top Navigation
              </CardTitle>
              <CardDescription>
                Header navigation with back, add, photo, and menu actions - available with and without floor map
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* With Floor Map */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">With Floor Map</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <TopNavigation
                    onBack={handleTopNavigation.onBack}
                    onAdd={handleTopNavigation.onAdd}
                    onPhoto={handleTopNavigation.onPhoto}
                    onMenuAction={handleTopNavigation.onMenuAction}
                  />
                </div>
                <p className="text-sm text-slate-600">
                  Interactive header with navigation controls and integrated 2D floor map
                </p>
              </div>

              {/* Without Floor Map */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Without Floor Map</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <TopNavigationRight
                    onBack={handleTopNavigation.onBack}
                    onAdd={handleTopNavigation.onAdd}
                    onPhoto={handleTopNavigation.onPhoto}
                    onMenuAction={handleTopNavigation.onMenuAction}
                  />
                </div>
                <p className="text-sm text-slate-600">
                  Simplified header navigation without the integrated floor map component
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📱 Bottom Navigation
              </CardTitle>
              <CardDescription>
                Comprehensive bottom navigation with calendar, location, view modes, and split screen controls - available in full-screen, half-left, and half-right layouts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* With Split Screen */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Full Screen</h4>
                <div className="bg-slate-50 rounded-lg p-4">
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
                    splitScreen={{
                      onViewChange: handleViewChange
                    }}
                  />
                </div>
                <p className="text-sm text-slate-600">
                  Full-featured bottom navigation with integrated toolbars including split screen controls
                </p>
              </div>

              {/* Half Left */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Half Left</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <BottomNavigationHalfLeft
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
                    splitScreen={{
                      onViewChange: handleViewChange
                    }}
                  />
                </div>
                <p className="text-sm text-slate-600">
                  Half left layout with all navigation controls positioned for left-side usage
                </p>
              </div>

              {/* Without Split Screen */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Half Right</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <BottomNavigationNoSplit
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
                  />
                </div>
                <p className="text-sm text-slate-600">
                  Simplified bottom navigation without split screen functionality - perfect for single-view applications
                </p>
              </div>

            </CardContent>
          </Card>
        </section>

        {/* Toolbar Components */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Toolbar Components</h2>
          
          {/* Main Floating Toolbar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🛠️ Main Top Floating Toolbar
              </CardTitle>
              <CardDescription>
                Floating toolbar with add, camera, and magic wand tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-8 flex justify-center">
                <MainTopFloatingToolbar
                  onAddClick={handleToolbarActions.onAddClick}
                  onCameraClick={handleToolbarActions.onCameraClick}
                  onMagicWandClick={handleToolbarActions.onMagicWandClick}
                />
              </div>
              <p className="text-sm text-slate-600">
                Floating toolbar designed to match Figma reference with shadcn styling
              </p>
            </CardContent>
          </Card>

          {/* Calendar Toolbar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📅 Calendar Toolbar
              </CardTitle>
              <CardDescription>
                Calendar-specific controls and date selection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <CalendarToolbar
                  date={currentDate}
                  onDateChange={handleDateChange}
                  formatDate={(date) => date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                />
              </div>
              <p className="text-sm text-slate-600">
                Dedicated calendar controls with date formatting
              </p>
            </CardContent>
          </Card>

          {/* Location Toolbar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📍 Location Toolbar
              </CardTitle>
              <CardDescription>
                Time and location navigation controls - available in full and minimized versions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Full Version */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Full Version</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <LocationToolbar
                    time={new Date().toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      timeZoneName: 'short'
                    })}
                    onPrevious={handleLocationControls.onPrevious}
                    onNext={handleLocationControls.onNext}
                    onFastPrevious={handleLocationControls.onFastPrevious}
                    onFastNext={handleLocationControls.onFastNext}
                    onPlay={handleLocationControls.onPlay}
                  />
                </div>
                <p className="text-sm text-slate-600">
                  Complete navigation controls with fast previous/next, play, and time display
                </p>
              </div>

              {/* Minimized Version */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Minimized Version</h4>
                <div className="bg-slate-50 rounded-lg p-4">
                  <LocationToolbarMin
                    time={new Date().toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      timeZoneName: 'short'
                    })}
                    onPrevious={handleLocationControls.onPrevious}
                    onNext={handleLocationControls.onNext}
                  />
                </div>
                <p className="text-sm text-slate-600">
                  Compact version with only essential previous/next controls and time display
                </p>
              </div>
            </CardContent>
          </Card>

          {/* View Mode Toolbar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                👁️ View Mode Toolbar
              </CardTitle>
              <CardDescription>
                Switch between different view modes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <ViewmodeToolbar
                  onViewModeChange={handleViewModeChange}
                  currentMode={currentMode}
                />
              </div>
              <p className="text-sm text-slate-600">
                Toggle between camera, map, and other view modes
              </p>
            </CardContent>
          </Card>

          {/* Split Screen Toolbar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔀 Split Screen Toolbar
              </CardTitle>
              <CardDescription>
                Controls for split screen functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <SplitscreenToolbar
                  onViewChange={handleViewChange}
                />
              </div>
              <p className="text-sm text-slate-600">
                Toggle between single and split screen views
              </p>
            </CardContent>
          </Card>

          {/* Main Designer Toolbar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎨 Main Designer Toolbar
              </CardTitle>
              <CardDescription>
                Professional designer toolbar with grouped actions, tooltips, and toast notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ToolbarMainDemo />
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Design Features</h4>
                <ul className="text-sm text-slate-600 space-y-1 pl-4">
                  <li>• Exact shadcn/ui design system styling</li>
                  <li>• Proper spacing with calc(var(--radius) + 4px) border radius</li>
                  <li>• Correct shadow depth and background colors</li>
                  <li>• Compact 40px height with 8px horizontal padding</li>
                  <li>• 2px gap between groups, 2px gap within groups</li>
                  <li>• Tooltips on hover with proper positioning</li>
                  <li>• Toast notifications for user feedback</li>
                  <li>• Multiple toolbar positions (top, bottom, left, right)</li>
                  <li>• Text-based and icon-based button combinations</li>
                  <li>• Accent button styling for primary actions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Map Components */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Map Components</h2>
          
          {/* Floor Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🗺️ 2D Floor Map with Path Tracking
              </CardTitle>
              <CardDescription>
                Interactive floor map with adaptive capture points, zoom (100%-300%), pan functionality, and animated path visualization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Responsive Map Sizes */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-700">Responsive Sizes</h4>
                
                {/* Extra Small */}
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Extra Small (xs) - 238×151px - 25 capture points</p>
                  <div className="bg-slate-50 rounded-lg p-4 flex justify-center">
                    <FloorMap 
                      size="xs" 
                    />
                  </div>
                </div>
                
                {/* Small */}
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Small (sm) - 362×229px - 30 capture points</p>
                  <div className="bg-slate-50 rounded-lg p-4 flex justify-center">
                    <FloorMap 
                      size="sm" 
                    />
                  </div>
                </div>
                
                {/* Medium */}
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Medium (md) - 664×407px - 45 capture points</p>
                  <div className="bg-slate-50 rounded-lg p-4 flex justify-center overflow-hidden">
                    <FloorMap 
                      size="md" 
                    />
                  </div>
                </div>
                
                {/* Large */}
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Large (lg) - 1154×730px - 52 capture points (Reference Size)</p>
                  <div className="bg-slate-50 rounded-lg p-4 flex justify-center overflow-auto max-h-96">
                    <FloorMap 
                      size="lg" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Features</h4>
                <ul className="text-sm text-slate-600 space-y-1 pl-4">
                  <li>• Mouse wheel zoom (100% - 300%)</li>
                  <li>• Click and drag to pan around the map</li>
                  <li>• Clear start and end points (100px apart, not connected)</li>
                  <li>• Visual path connections with solid lines</li>
                  <li>• Hover effects and selection highlighting</li>
                  <li>• Real-time zoom percentage display</li>
                  <li>• Adaptive point counts: xs(25), sm(30), md(45), lg(52)</li>
                  <li>• Smooth zoom and pan animations with Framer Motion</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* GPS Locator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🧭 GPS Locator
              </CardTitle>
              <CardDescription>
                Interactive GPS direction indicator with 8-direction compass control, smooth rotation animations, and intuitive compass-style interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-8">
                <GPSLocatorDemo />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Features</h4>
                <ul className="text-sm text-slate-600 space-y-1 pl-4">
                  <li>• 8-direction compass control: N, NE, E, SE, S, SW, W, NW</li>
                  <li>• Compass-style grid layout with intuitive direction selection</li>
                  <li>• Precise rotation angles: 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°</li>
                  <li>• Smooth spring animations with Framer Motion</li>
                  <li>• Interactive controls for real-time customization</li>
                  <li>• SVG-based cone with gradient and transparency effects</li>
                  <li>• Centered blue circle with hover effects</li>
                  <li>• Responsive and scalable design</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Viewer Components */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Viewer Components</h2>
          
          {/* Split Viewer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔄 Split Viewer with 360° Panoramas
              </CardTitle>
              <CardDescription>
                Advanced dual-panel 360° panoramic viewer with synchronized or independent controls, time-based image switching, and interactive navigation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preview */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Preview</h4>
                <div className="bg-slate-50 rounded-lg p-4 overflow-hidden">
                  <div className="w-full h-64 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center relative">
                    <div className="text-center space-y-2">
                      <div className="text-slate-500 text-sm">Split Viewer Preview</div>
                      <div className="text-xs text-slate-400">360° Panoramic Viewer with Dual Panels</div>
                    </div>
                    {/* Mini preview of split viewer interface */}
                    <div className="absolute inset-4 bg-gradient-to-r from-blue-100 to-green-100 rounded border flex">
                      <div className="flex-1 bg-blue-50 rounded-l border-r border-slate-200 flex items-center justify-center">
                        <div className="text-xs text-blue-600">Left Panel</div>
                      </div>
                      <div className="w-1 bg-slate-300"></div>
                      <div className="flex-1 bg-green-50 rounded-r flex items-center justify-center">
                        <div className="text-xs text-green-600">Right Panel</div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Compact preview showing the split-panel layout concept
                </p>
              </div>

              {/* Full Screen Button */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Full Screen Experience</h4>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="lg" className="w-full">
                      🔍 Open Full Screen Split Viewer
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="top" className="h-screen w-full max-w-none p-0">
                    <SheetHeader className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur rounded-lg p-3">
                      <SheetTitle>360° Split Viewer</SheetTitle>
                    </SheetHeader>
                    <div className="h-full w-full">
                      <SplitViewer />
                    </div>
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-slate-600">
                  Experience the full split viewer with all interactive features
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Features</h4>
                <ul className="text-sm text-slate-600 space-y-1 pl-4">
                  <li>• Dual 360° panoramic viewers with independent or synchronized control</li>
                  <li>• 5 high-quality day/night image pairs for time-based viewing</li>
                  <li>• Interactive split-screen divider with mouse dragging</li>
                  <li>• Lock/unlock mode for synchronized or independent navigation</li>
                  <li>• Integrated top and bottom navigation components</li>
                  <li>• Calendar-based image switching and time controls</li>
                  <li>• Single/split view mode toggle</li>
                  <li>• Smooth mouse and touch interactions for 360° exploration</li>
                  <li>• Auto-rotation capability with customizable speed</li>
                  <li>• Responsive design adapting to different screen sizes</li>
                  <li>• WebGL-powered rendering for smooth performance</li>
                  <li>• Memory-optimized image loading and caching</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>


        {/* Base UI Components */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Base UI Components</h2>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🗓️ Calendar
              </CardTitle>
              <CardDescription>
                Interactive calendar with date selection and keyboard navigation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <p className="text-sm text-slate-600">
                Built with React Day Picker and shadcn/ui styling
              </p>
            </CardContent>
          </Card>

          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔘 Buttons
              </CardTitle>
              <CardDescription>
                Various button styles and states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Complete set of button variants with consistent styling
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Component Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Component Library Stats</CardTitle>
            <CardDescription>
              Overview of the Maya Components collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-blue-600">14</div>
                <p className="text-sm text-slate-600">Total Components</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-green-600">6</div>
                <p className="text-sm text-slate-600">Toolbar Components</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-purple-600">2</div>
                <p className="text-sm text-slate-600">Map Components</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-indigo-600">1</div>
                <p className="text-sm text-slate-600">Viewer Components</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <p className="text-sm text-slate-600">TypeScript Coverage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Toast Notifications */}
      <Toaster position="bottom-right" expand={true} richColors />
    </div>
  )
}

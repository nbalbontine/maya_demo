'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Viewer360 from './viewer360'
import { BottomNavigationHalfLeft } from './bottom_navigation_half_left'
import { BottomNavigation as BottomNavigationNoSplit } from './bottom-navigation-half_right'
import { BottomNavigation as BottomNavigationFullScreen } from './bottom-navigation-full-screen'
import { TopNavigation } from './top-navigation'
import { TopNavigationRight } from './top-navigation-right'


export default function SplitViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewer1Ref = useRef<{ updateCamera: (rotY: number, rotX: number, fov: number) => void; render: () => void; resize: (width: number, height: number) => void } | null>(null)
  const viewer2Ref = useRef<{ updateCamera: (rotY: number, rotX: number, fov: number) => void; render: () => void; resize: (width: number, height: number) => void } | null>(null)
  const viewer1ContainerRef = useRef<HTMLDivElement>(null)
  const viewer2ContainerRef = useRef<HTMLDivElement>(null)
  const splitLineRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // Available 360° images
  const imageSet = useMemo(() => [
    { day: '/360_images/00_360.jpg', night: '/360_images/00_360_B.jpg' },
    { day: '/360_images/01_360.jpg', night: '/360_images/01_360_B.jpg' },
    { day: '/360_images/02_360.jpg', night: '/360_images/02_360_B.jpg' },
    { day: '/360_images/03_360.jpg', night: '/360_images/03_360_B.jpg' },
    { day: '/360_images/04_360.jpg', night: '/360_images/04_360_B.jpg' }
  ], [])

  // State
  const [, setLoadedImages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [splitPosition, setSplitPosition] = useState(50)
  const [autoRotate] = useState(false)
  const [isLocked, setIsLocked] = useState(true) // Lock/unlock state
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'single' | 'split'>('split') // View mode state
  const [currentImageIndex, setCurrentImageIndex] = useState(0) // Current image index for both viewers - start at 00
  
  // Function to sync states when locking/unlocking
  const toggleLock = useCallback(() => {
    if (isLocked) {
      // Switching to unlocked: copy shared state to individual states
      const sharedState = mouseStateRef.current
      viewer1StateRef.current = {
        ...viewer1StateRef.current,
        targetRotationY: sharedState.targetRotationY,
        targetRotationX: sharedState.targetRotationX,
        currentRotationY: sharedState.currentRotationY,
        currentRotationX: sharedState.currentRotationX,
        fov: sharedState.fov
      }
      viewer2StateRef.current = {
        ...viewer2StateRef.current,
        targetRotationY: sharedState.targetRotationY,
        targetRotationX: sharedState.targetRotationX,
        currentRotationY: sharedState.currentRotationY,
        currentRotationX: sharedState.currentRotationX,
        fov: sharedState.fov
      }
    } else {
      // Switching to locked: use viewer1 state as the shared state
      const state1 = viewer1StateRef.current
      mouseStateRef.current = {
        ...mouseStateRef.current,
        targetRotationY: state1.targetRotationY,
        targetRotationX: state1.targetRotationX,
        currentRotationY: state1.currentRotationY,
        currentRotationX: state1.currentRotationX,
        fov: state1.fov
      }
    }
    setIsLocked(!isLocked)
  }, [isLocked])

  // Mouse/interaction state - shared when locked
  const mouseStateRef = useRef({
    isMouseDown: false,
    isSplitDragging: false,
    mouseX: 0,
    mouseY: 0,
    targetRotationY: 0,
    targetRotationX: 0,
    currentRotationY: 0,
    currentRotationX: 0,
    fov: 75
  })

  // Individual mouse states for each viewer when unlocked
  const viewer1StateRef = useRef({
    isMouseDown: false,
    mouseX: 0,
    mouseY: 0,
    targetRotationY: 0,
    targetRotationX: 0,
    currentRotationY: 0,
    currentRotationX: 0,
    fov: 75
  })

  const viewer2StateRef = useRef({
    isMouseDown: false,
    mouseX: 0,
    mouseY: 0,
    targetRotationY: 0,
    targetRotationX: 0,
    currentRotationY: 0,
    currentRotationX: 0,
    fov: 75
  })

  // Track which viewer is currently being dragged in unlocked mode
  const activeDragViewerRef = useRef<'viewer1' | 'viewer2' | null>(null)

  const controls = useMemo(() => ({
    mouseSpeed: 0.005,
    damping: 0.95,
    autoRotateSpeed: 0.002
  }), [])

  const onImageLoad = useCallback(() => {
    setLoadedImages(prev => {
      const newCount = prev + 1
      if (newCount >= 2) {
        setIsLoading(false)
        // Start animation loop with a small delay to ensure viewers are ready
        setTimeout(() => {
          console.log('Starting animation loop. Viewer refs:', {
            viewer1: !!viewer1Ref.current,
            viewer2: !!viewer2Ref.current
          })
          const animate = () => {
          if (isLocked) {
            // Locked mode: use shared state
            const state = mouseStateRef.current
            
            // Auto rotation
            if (autoRotate) {
              state.targetRotationY += controls.autoRotateSpeed
            }
            
            // Smooth camera movement with damping
            state.currentRotationY += (state.targetRotationY - state.currentRotationY) * (1 - controls.damping)
            state.currentRotationX += (state.targetRotationX - state.currentRotationX) * (1 - controls.damping)
            
            // Limit vertical rotation
            state.currentRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, state.currentRotationX))
            
            // Update both cameras with same values
            if (viewer1Ref.current?.updateCamera) {
              viewer1Ref.current.updateCamera(state.currentRotationY, state.currentRotationX, state.fov)
            }
            if (viewer2Ref.current?.updateCamera) {
              viewer2Ref.current.updateCamera(state.currentRotationY, state.currentRotationX, state.fov)
            }
          } else {
            // Unlocked mode: use individual states
            const state1 = viewer1StateRef.current
            const state2 = viewer2StateRef.current
            
            // Auto rotation for both
            if (autoRotate) {
              state1.targetRotationY += controls.autoRotateSpeed
              state2.targetRotationY += controls.autoRotateSpeed
            }
            
            // Smooth camera movement with damping for viewer 1
            state1.currentRotationY += (state1.targetRotationY - state1.currentRotationY) * (1 - controls.damping)
            state1.currentRotationX += (state1.targetRotationX - state1.currentRotationX) * (1 - controls.damping)
            state1.currentRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, state1.currentRotationX))
            
            // Smooth camera movement with damping for viewer 2
            state2.currentRotationY += (state2.targetRotationY - state2.currentRotationY) * (1 - controls.damping)
            state2.currentRotationX += (state2.targetRotationX - state2.currentRotationX) * (1 - controls.damping)
            state2.currentRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, state2.currentRotationX))
            
            // Update cameras with individual values
            if (viewer1Ref.current?.updateCamera) {
              viewer1Ref.current.updateCamera(state1.currentRotationY, state1.currentRotationX, state1.fov)
            }
            if (viewer2Ref.current?.updateCamera) {
              viewer2Ref.current.updateCamera(state2.currentRotationY, state2.currentRotationX, state2.fov)
            }
          }
          
          // Render both viewers
          if (viewer1Ref.current?.render) viewer1Ref.current.render()
          if (viewer2Ref.current?.render) viewer2Ref.current.render()
          
          animationRef.current = requestAnimationFrame(animate)
        }
        animate()
        }, 100) // 100ms delay to ensure viewers are initialized
      }
      return newCount
    })
  }, [autoRotate, isLocked, controls])

  const onImageError = useCallback((error: Error | Event) => {
    console.error('Error loading image:', error)
  }, [])

  const updateSplitPosition = useCallback((position: number) => {
    if (!viewer1ContainerRef.current || !viewer2ContainerRef.current || !splitLineRef.current || !containerRef.current) return
    
    const clampedPosition = Math.max(10, Math.min(90, position))
    setSplitPosition(clampedPosition)
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const containerWidth = containerRect.width
    const containerHeight = containerRect.height
    
    // Update viewer widths and positions
    viewer1ContainerRef.current.style.width = clampedPosition + '%'
    viewer2ContainerRef.current.style.left = clampedPosition + '%'
    viewer2ContainerRef.current.style.width = (100 - clampedPosition) + '%'
    splitLineRef.current.style.left = clampedPosition + '%'
    
    // Resize the viewers to fit their new containers
    const viewer1Width = (containerWidth * clampedPosition) / 100
    const viewer2Width = (containerWidth * (100 - clampedPosition)) / 100
    
    if (viewer1Ref.current?.resize) viewer1Ref.current.resize(viewer1Width, containerHeight)
    if (viewer2Ref.current?.resize) viewer2Ref.current.resize(viewer2Width, containerHeight)
  }, [])

  // Helper function to determine which viewer is being interacted with
  const getActiveViewer = useCallback((clientX: number) => {
    if (!containerRef.current) return null
    const rect = containerRef.current.getBoundingClientRect()
    const relativeX = (clientX - rect.left) / rect.width * 100
    return relativeX <= splitPosition ? 'viewer1' : 'viewer2'
  }, [splitPosition])

  // Mouse event handlers
  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if ((event.target as Element).closest('.split-line')) return
    
    if (isLocked) {
      // Locked mode: use shared state
      const state = mouseStateRef.current
      state.isMouseDown = true
      state.mouseX = event.clientX
      state.mouseY = event.clientY
    } else {
      // Unlocked mode: determine which viewer and use individual state
      const activeViewer = getActiveViewer(event.clientX)
      activeDragViewerRef.current = activeViewer
      if (activeViewer === 'viewer1') {
        const state = viewer1StateRef.current
        state.isMouseDown = true
        state.mouseX = event.clientX
        state.mouseY = event.clientY
      } else if (activeViewer === 'viewer2') {
        const state = viewer2StateRef.current
        state.isMouseDown = true
        state.mouseX = event.clientX
        state.mouseY = event.clientY
      }
    }
  }, [isLocked, getActiveViewer])

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const sharedState = mouseStateRef.current
    
    if (sharedState.isSplitDragging) {
      // Handle split line dragging
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = event.clientX - rect.left
        const newPosition = (x / rect.width) * 100
        updateSplitPosition(newPosition)
      }
      event.preventDefault()
    } else if (isLocked) {
      // Locked mode: use shared state
      if (sharedState.isMouseDown) {
        const deltaX = event.clientX - sharedState.mouseX
        const deltaY = event.clientY - sharedState.mouseY
        
        sharedState.targetRotationY += deltaX * controls.mouseSpeed
        sharedState.targetRotationX -= deltaY * controls.mouseSpeed
        
        // Limit vertical rotation
        sharedState.targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, sharedState.targetRotationX))
        
        sharedState.mouseX = event.clientX
        sharedState.mouseY = event.clientY
      }
    } else {
      // Unlocked mode: only update the viewer that initiated the drag
      const activeDragViewer = activeDragViewerRef.current
      
      if (activeDragViewer === 'viewer1') {
        const state = viewer1StateRef.current
        if (state.isMouseDown) {
          const deltaX = event.clientX - state.mouseX
          const deltaY = event.clientY - state.mouseY
          
          state.targetRotationY += deltaX * controls.mouseSpeed
          state.targetRotationX -= deltaY * controls.mouseSpeed
          state.targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, state.targetRotationX))
          
          state.mouseX = event.clientX
          state.mouseY = event.clientY
        }
      } else if (activeDragViewer === 'viewer2') {
        const state = viewer2StateRef.current
        if (state.isMouseDown) {
          const deltaX = event.clientX - state.mouseX
          const deltaY = event.clientY - state.mouseY
          
          state.targetRotationY += deltaX * controls.mouseSpeed
          state.targetRotationX -= deltaY * controls.mouseSpeed
          state.targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, state.targetRotationX))
          
          state.mouseX = event.clientX
          state.mouseY = event.clientY
        }
      }
    }
  }, [updateSplitPosition, controls.mouseSpeed, isLocked])

  const handleMouseUp = useCallback(() => {
    // Reset all mouse states
    mouseStateRef.current.isMouseDown = false
    mouseStateRef.current.isSplitDragging = false
    viewer1StateRef.current.isMouseDown = false
    viewer2StateRef.current.isMouseDown = false
    activeDragViewerRef.current = null
  }, [])

  const handleSplitMouseDown = useCallback((event: React.MouseEvent) => {
    const state = mouseStateRef.current
    state.isSplitDragging = true
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleWheel = useCallback((event: React.WheelEvent) => {
    if (isLocked) {
      // Locked mode: use shared state
      const state = mouseStateRef.current
      const fov = state.fov + event.deltaY * 0.05
      state.fov = Math.max(30, Math.min(100, fov))
    } else {
      // Unlocked mode: determine which viewer and use individual state
      const activeViewer = getActiveViewer(event.clientX)
      if (activeViewer === 'viewer1') {
        const state = viewer1StateRef.current
        const fov = state.fov + event.deltaY * 0.05
        state.fov = Math.max(30, Math.min(100, fov))
      } else if (activeViewer === 'viewer2') {
        const state = viewer2StateRef.current
        const fov = state.fov + event.deltaY * 0.05
        state.fov = Math.max(30, Math.min(100, fov))
      }
    }
  }, [isLocked, getActiveViewer])

  // Handler for date changes from the toolbar
  const handleDateChange = useCallback((newDate: Date) => {
    setCurrentDate(newDate)
    // Here you could add logic to load different images based on the selected date
    console.log('Date changed to:', newDate)
  }, [])

  // Navigation handlers for changing images
  const handlePrevious = useCallback(() => {
    // Cancel current animation loop before changing images
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    
    // Reset loading state when changing images
    setLoadedImages(0)
    setIsLoading(true)
    
    // Update both viewers to the same index: 01 -> 00 -> 04 -> 03 -> 02 -> 01
    setCurrentImageIndex(prevIndex => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : imageSet.length - 1
      const leftImage = imageSet[newIndex].day
      const rightImage = imageSet[newIndex].night
      console.log('Previous - Both viewers index changed to:', newIndex, `(Left: ${leftImage}, Right: ${rightImage})`)
      return newIndex
    })
    
    // Update date to reflect the change
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }, [currentDate, imageSet])

  const handleNext = useCallback(() => {
    // Cancel current animation loop before changing images
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    
    // Reset loading state when changing images
    setLoadedImages(0)
    setIsLoading(true)
    
    // Update both viewers to the same index: 00 -> 01 -> 02 -> 03 -> 04 -> 00
    setCurrentImageIndex(prevIndex => {
      console.log('Navigation Debug - Current index:', prevIndex, 'imageSet.length:', imageSet.length, 'condition:', prevIndex < imageSet.length - 1)
      const newIndex = prevIndex < imageSet.length - 1 ? prevIndex + 1 : 0
      const leftImage = imageSet[newIndex].day
      const rightImage = imageSet[newIndex].night
      console.log('Next - Both viewers index changed to:', newIndex, `(Left: ${leftImage}, Right: ${rightImage})`)
      return newIndex
    })
    
    // Update date to reflect the change
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }, [currentDate, imageSet])

  const handleFastPrevious = useCallback(() => {
    // Cancel current animation loop before changing images
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    
    // Reset loading state when changing images
    setLoadedImages(0)
    setIsLoading(true)
    
    // Update both viewers - jump back 7 days (clamped to 0)
    setCurrentImageIndex(prevIndex => {
      const newIndex = Math.max(0, prevIndex - 7)
      const leftImage = imageSet[newIndex].day
      const rightImage = imageSet[newIndex].night
      console.log('Fast previous - Both viewers index changed to:', newIndex, `(Left: ${leftImage}, Right: ${rightImage})`)
      return newIndex
    })
    
    // Update date to reflect the change
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }, [currentDate, imageSet])

  const handleFastNext = useCallback(() => {
    // Cancel current animation loop before changing images
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    
    // Reset loading state when changing images
    setLoadedImages(0)
    setIsLoading(true)
    
    // Update both viewers - jump forward 7 days (clamped to max)
    setCurrentImageIndex(prevIndex => {
      const newIndex = Math.min(imageSet.length - 1, prevIndex + 7)
      const leftImage = imageSet[newIndex].day
      const rightImage = imageSet[newIndex].night
      console.log('Fast next - Both viewers index changed to:', newIndex, `(Left: ${leftImage}, Right: ${rightImage})`)
      return newIndex
    })
    
    // Update date to reflect the change
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }, [currentDate, imageSet])

  // Update navigation widths when split position changes
  const [bottomNavWidth, setBottomNavWidth] = useState(`calc(${splitPosition}% - 48px)`)
  const [bottomNavRightWidth, setBottomNavRightWidth] = useState(`calc(${100 - splitPosition}% - 48px)`)
  const [bottomNavRightLeft, setBottomNavRightLeft] = useState(`calc(${splitPosition}% + 24px)`)
  const [topNavWidth, setTopNavWidth] = useState(`${splitPosition}%`)
  const [topNavRightWidth, setTopNavRightWidth] = useState(`${100 - splitPosition}%`)
  const [topNavRightLeft, setTopNavRightLeft] = useState(`${splitPosition}%`)
  
  useEffect(() => {
    setBottomNavWidth(`calc(${splitPosition}% - 48px)`)
    setBottomNavRightWidth(`calc(${100 - splitPosition}% - 48px)`)
    setBottomNavRightLeft(`calc(${splitPosition}% + 24px)`)
    setTopNavWidth(`${splitPosition}%`)
    setTopNavRightWidth(`${100 - splitPosition}%`)
    setTopNavRightLeft(`${splitPosition}%`)
  }, [splitPosition])

  // Initial sizing effect when loading completes
  useEffect(() => {
    if (!isLoading) {
      // Set up initial split position and sizing after a brief delay to ensure DOM is ready
      const timeoutId = setTimeout(() => updateSplitPosition(splitPosition), 0)
      return () => clearTimeout(timeoutId)
    }
  }, [isLoading, splitPosition, updateSplitPosition])

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      // Call updateSplitPosition which will handle resizing both viewers appropriately
      updateSplitPosition(splitPosition)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [splitPosition, updateSplitPosition])

  // Handle viewer resizing when switching view modes
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const containerHeight = containerRect.height
      
      if (viewMode === 'single') {
        // In single mode, make viewer1 full screen
        if (viewer1Ref.current?.resize) {
          viewer1Ref.current.resize(containerWidth, containerHeight)
        }
      } else {
        // In split mode, use the current split position
        updateSplitPosition(splitPosition)
      }
    }
  }, [viewMode, isLoading, splitPosition, updateSplitPosition])

  // Cleanup animation loop
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="viewer-container relative">
      {isLoading && (
        <div className="loading">Loading 360° images...</div>
      )}
      
      <div 
        ref={containerRef}
        className="viewer-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Viewer 1 - Always mounted, positioned based on view mode */}
        <div 
          ref={viewer1ContainerRef} 
          className={viewMode === 'single' 
            ? "viewer-single viewer-left relative w-full h-full" 
            : "viewer-split viewer-left relative"
          }
        >
          <Viewer360 
            ref={viewer1Ref}
            imageUrl={(() => {
              const url = imageSet[currentImageIndex].day
              console.log('Left viewer - currentImageIndex:', currentImageIndex, 'URL:', url)
              return url
            })()}
            containerId="viewer1"
            onLoad={onImageLoad}
            onError={onImageError}
          />
        </div>
        
        {/* Viewer 2 - Always mounted, hidden in single mode */}
        <div 
          ref={viewer2ContainerRef} 
          className={viewMode === 'single' 
            ? "viewer-split viewer-right hidden" 
            : "viewer-split viewer-right"
          }
        >
          <Viewer360 
            ref={viewer2Ref}
            imageUrl={(() => {
              const url = imageSet[currentImageIndex].night
              console.log('Right viewer - currentImageIndex:', currentImageIndex, 'URL:', url)
              return url
            })()}
            containerId="viewer2"
            onLoad={onImageLoad}
            onError={onImageError}
          />
        </div>
        
        {/* Split line - only show in split mode */}
        {viewMode === 'split' && (
          <div 
            ref={splitLineRef}
            className="split-line"
            onMouseDown={handleSplitMouseDown}
          >
            <button
              className="lock-unlock-button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleLock()
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              title={isLocked ? "Unlock to control views independently" : "Lock to synchronize views"}
            >
              {isLocked ? (
                // Lock icon
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18,8H17V6A5,5 0 0,0 12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8M12,3A3,3 0 0,1 15,6V8H9V6A3,3 0 0,1 12,3Z"/>
                </svg>
              ) : (
                // Unlock icon
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18,8H17V6A5,5 0 0,0 12,1A5,5 0 0,0 7,6H9A3,3 0 0,1 12,3A3,3 0 0,1 15,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8Z"/>
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Top Navigation - positioned at top of left pane */}
        <div 
          className="fixed top-0 left-0 z-[1002]"
          style={{ 
            width: viewMode === 'single' ? '100%' : topNavWidth,
            maxWidth: viewMode === 'single' ? '100%' : topNavWidth
          }}
        >
          <TopNavigation 
            onBack={() => console.log('Back button clicked')}
            onAdd={() => console.log('Add button clicked')}
            onPhoto={() => console.log('Photo button clicked')}
            onMenuAction={() => console.log('Menu action clicked')}
            className="w-full"
          />
        </div>

        {/* Top Navigation Right - positioned at top of right pane - only show in split mode */}
        {viewMode === 'split' && (
          <div 
            className="fixed top-0 z-[1002]"
            style={{ 
              left: topNavRightLeft,
              width: topNavRightWidth,
              maxWidth: topNavRightWidth
            }}
          >
            <TopNavigationRight 
              onBack={() => console.log('Right Back button clicked')}
              onAdd={() => console.log('Right Add button clicked')}
              onPhoto={() => console.log('Right Photo button clicked')}
              onMenuAction={() => console.log('Right Menu action clicked')}
              className="w-full"
            />
          </div>
        )}

        {/* Bottom Navigation - conditional based on view mode */}
        <div 
          className="fixed bottom-6 left-6 z-[1002]"
          style={{ 
            width: viewMode === 'single' ? 'calc(100% - 48px)' : bottomNavWidth,
            maxWidth: viewMode === 'single' ? 'calc(100% - 48px)' : bottomNavWidth
          }}
        >
          {viewMode === 'single' ? (
            <BottomNavigationFullScreen 
              calendar={{
                date: currentDate,
                onDateChange: handleDateChange,
                formatDate: (date: Date) => date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              }}
              location={{
                time: new Date().toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  timeZoneName: 'short'
                }),
                date: currentDate,
                onPrevious: handlePrevious,
                onNext: handleNext,
                onFastPrevious: handleFastPrevious,
                onFastNext: handleFastNext,
                onPlay: () => {
                  console.log('Full screen play button clicked')
                }
              }}
              viewMode={{
                onViewModeChange: (mode: string) => {
                  console.log('Full screen view mode changed to:', mode)
                },
                currentMode: "camera"
              }}
              splitScreen={{
                onViewChange: (view: 'single' | 'split') => {
                  setViewMode(view)
                  console.log('Split screen view changed to:', view)
                }
              }}
            />
          ) : (
            <BottomNavigationHalfLeft 
              calendar={{
                date: currentDate,
                onDateChange: handleDateChange,
                formatDate: (date: Date) => date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              }}
              location={{
                time: new Date().toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  timeZoneName: 'short'
                }),
                date: currentDate,
                onPrevious: handlePrevious,
                onNext: handleNext
              }}
              splitScreen={{
                onViewChange: (view: 'single' | 'split') => {
                  setViewMode(view)
                  console.log('Split screen view changed to:', view)
                }
              }}
            />
          )}
        </div>

        {/* Bottom Navigation (No Split) - positioned at bottom of right pane - only show in split mode */}
        {viewMode === 'split' && (
          <div 
            className="fixed bottom-6 z-[1002]"
            style={{ 
              left: bottomNavRightLeft,
              width: bottomNavRightWidth,
              maxWidth: bottomNavRightWidth
            }}
          >
            <BottomNavigationNoSplit 
              calendar={{
                date: currentDate,
                onDateChange: handleDateChange,
                formatDate: (date: Date) => date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              }}
              location={{
                time: new Date().toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  timeZoneName: 'short'
                }),
                date: currentDate,
                onPrevious: handlePrevious,
                onNext: handleNext,
                onFastPrevious: handleFastPrevious,
                onFastNext: handleFastNext,
                onPlay: () => {
                  console.log('Right panel play button clicked')
                }
              }}
              viewMode={{
                onViewModeChange: (mode: string) => {
                  console.log('Right panel view mode changed to:', mode)
                },
                currentMode: "camera"
              }}
          />
          </div>
        )}
      </div>
    </div>
  )
}

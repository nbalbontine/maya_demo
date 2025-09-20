'use client'

import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle, useState } from 'react'
import * as THREE from 'three'
import Image from 'next/image'

export interface IssueMarker {
  id: string
  position: THREE.Vector3
  screenPosition: { x: number; y: number }
  timestamp: number
  viewerId: string
}

interface ViewerProps {
  imageUrl: string
  containerId: string
  onLoad?: () => void
  onError?: (error: Error | Event) => void
  onIssueAdd?: (marker: IssueMarker) => void
  isAddIssueMode?: boolean
  issues?: IssueMarker[]
}


const Viewer360 = ({ 
  imageUrl, 
  containerId, 
  onLoad, 
  onError,
  onIssueAdd,
  issues = []
}: ViewerProps, ref: React.Ref<{ 
  updateCamera: (rotY: number, rotX: number, fov: number) => void; 
  render: () => void; 
  resize: (width: number, height: number) => void;
  addIssueAtPosition: (x: number, y: number) => void;
}>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sphereRef = useRef<THREE.Mesh | null>(null)
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster())
  const [issueMarkers, setIssueMarkers] = useState<IssueMarker[]>(issues)
  const [, forceUpdate] = useState(0) // Force re-render for marker position updates
  
  // Sync issues prop with local state
  useEffect(() => {
    setIssueMarkers(issues)
  }, [issues])

  // Function to convert 3D world position to 2D screen coordinates
  const worldToScreen = useCallback((worldPosition: THREE.Vector3): { x: number; y: number } => {
    if (!cameraRef.current || !containerRef.current) {
      return { x: 0, y: 0 }
    }

    const vector = worldPosition.clone()
    vector.project(cameraRef.current)

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    
    const x = (vector.x * 0.5 + 0.5) * rect.width
    const y = (vector.y * -0.5 + 0.5) * rect.height

    return { x, y }
  }, [])

  // Function to add issue at screen position with proper coordinate handling
  const addIssueAtPosition = useCallback((x: number, y: number) => {
    if (!cameraRef.current || !sphereRef.current || !containerRef.current) {
      console.warn('Cannot add issue: camera, sphere, or container not ready')
      return
    }

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    
    // Convert screen coordinates to normalized device coordinates (-1 to 1)
    const mouse = new THREE.Vector2()
    mouse.x = (x / rect.width) * 2 - 1
    mouse.y = -(y / rect.height) * 2 + 1

    // Use raycaster to find intersection with sphere
    const raycaster = raycasterRef.current
    raycaster.setFromCamera(mouse, cameraRef.current)
    
    const intersects = raycaster.intersectObject(sphereRef.current)
    
    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point
      
      // Create new issue marker
      const newMarker: IssueMarker = {
        id: `issue-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        position: intersectionPoint.clone(),
        screenPosition: { x, y },
        timestamp: Date.now(),
        viewerId: containerId
      }

      // Add to local state
      setIssueMarkers(prev => [...prev, newMarker])
      
      // Notify parent component
      onIssueAdd?.(newMarker)
      
      console.log('Issue marker added:', newMarker)
    } else {
      console.warn('No intersection found with sphere')
    }
  }, [containerId, onIssueAdd])

  // Update marker screen positions when camera changes
  const updateMarkerPositions = useCallback(() => {
    if (issueMarkers.length > 0) {
      setIssueMarkers(prev => 
        prev.map(marker => ({
          ...marker,
          screenPosition: worldToScreen(marker.position)
        }))
      )
      forceUpdate(prev => prev + 1)
    }
  }, [issueMarkers.length, worldToScreen])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const containerRect = container.getBoundingClientRect()
    const width = containerRect.width || window.innerWidth
    const height = containerRect.height || window.innerHeight
    const aspect = width / height
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
    camera.position.set(0, 0, 0)
    camera.rotation.order = 'YXZ'
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    // Initial size - will be updated by parent component
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000)
    // Disable automatic color space conversion to preserve original image colors
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    rendererRef.current = renderer
    
    container.appendChild(renderer.domElement)

    // Create sphere geometry for 360° viewing
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1) // Invert to show texture on inside

    // Load texture
    const loader = new THREE.TextureLoader()
    loader.load(
      imageUrl,
      (texture) => {
        console.log('Texture loaded successfully:', imageUrl)
        // Preserve original image colors without color space conversion
        texture.colorSpace = THREE.NoColorSpace
        texture.generateMipmaps = false
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        const material = new THREE.MeshBasicMaterial({ 
          map: texture,
          // Ensure no color modifications
          color: 0xffffff,
          transparent: false,
          opacity: 1.0
        })
        const sphere = new THREE.Mesh(geometry, material)
        sphereRef.current = sphere
        scene.add(sphere)
        // Initial render after texture loads
        renderer.render(scene, camera)
        onLoad?.()
      },
      (progress) => {
        console.log('Loading progress:', imageUrl, progress)
      },
      (error) => {
        console.error('Error loading texture:', imageUrl, error)
        onError?.(error as Error)
      }
    )

    // Cleanup function
    return () => {
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
    }
  }, [imageUrl, onLoad, onError])

  const updateCamera = useCallback((rotationY: number, rotationX: number, fov: number) => {
    if (cameraRef.current) {
      cameraRef.current.rotation.order = 'YXZ'
      cameraRef.current.rotation.y = rotationY
      cameraRef.current.rotation.x = rotationX
      cameraRef.current.fov = fov
      cameraRef.current.updateProjectionMatrix()
      
      // Update marker positions when camera changes
      updateMarkerPositions()
    }
  }, [updateMarkerPositions])

  const render = useCallback(() => {
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }
  }, [])

  const resize = useCallback((width: number, height: number) => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }
  }, [])

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    updateCamera,
    render,
    resize,
    addIssueAtPosition
  }), [updateCamera, render, resize, addIssueAtPosition])

  return (
    <div ref={containerRef} id={containerId} className="viewer-split relative">
      {/* Issue markers overlay */}
      {issueMarkers.map((marker) => {
        const screenPos = worldToScreen(marker.position)
        return (
          <div
            key={marker.id}
            className="absolute pointer-events-none z-10"
            style={{
              left: `${screenPos.x - 12}px`, // Center the 24px icon
              top: `${screenPos.y - 12}px`,
              transform: 'translate(0, 0)', // Prevent sub-pixel rendering issues
            }}
          >
            <Image
              src="/Icons/issue.svg"
              alt="Issue marker"
              width={24}
              height={24}
              className="drop-shadow-lg"
            />
          </div>
        )
      })}
    </div>
  )
}

export default forwardRef(Viewer360)

'use client'

import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle, useState } from 'react'
import * as THREE from 'three'
import Image from 'next/image'

interface IssueMarker {
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
  isAddIssueMode = false,
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

  // Update issue markers when props change
  useEffect(() => {
    setIssueMarkers(issues)
  }, [issues])

  const updateCamera = useCallback((rotationY: number, rotationX: number, fov: number) => {
    if (cameraRef.current) {
      cameraRef.current.rotation.order = 'YXZ'
      cameraRef.current.rotation.y = rotationY
      cameraRef.current.rotation.x = rotationX
      cameraRef.current.fov = fov
      cameraRef.current.updateProjectionMatrix()
    }
  }, [])

  const render = useCallback(() => {
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current)
      // Update marker positions when rendering
      forceUpdate(prev => prev + 1)
    }
  }, [])

  const resize = useCallback((width: number, height: number) => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }
  }, [])

  // Convert 2D screen coordinates to 3D world position using raycasting
  const addIssueAtPosition = useCallback((x: number, y: number) => {
    if (!cameraRef.current || !sphereRef.current || !rendererRef.current) return

    const container = containerRef.current
    if (!container) return

    // Get the canvas element (renderer's DOM element)
    const canvas = rendererRef.current.domElement
    const canvasRect = canvas.getBoundingClientRect()
    
    // Convert screen coordinates to normalized device coordinates (-1 to +1)
    // Use canvas coordinates, not container coordinates
    const mouse = new THREE.Vector2()
    mouse.x = ((x - canvasRect.left) / canvasRect.width) * 2 - 1
    mouse.y = -((y - canvasRect.top) / canvasRect.height) * 2 + 1

    console.log('Click coordinates:', { x, y })
    console.log('Canvas rect:', canvasRect)
    console.log('Normalized mouse:', mouse)

    // Update raycaster
    raycasterRef.current.setFromCamera(mouse, cameraRef.current)

    // Find intersection with sphere
    const intersects = raycasterRef.current.intersectObject(sphereRef.current)
    
    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point
      
      // Create new issue marker
      const newMarker: IssueMarker = {
        id: `${containerId}-issue-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        position: intersectionPoint.clone(),
        screenPosition: { x, y },
        timestamp: Date.now(),
        viewerId: containerId
      }

      // Add to local state
      setIssueMarkers(prev => [...prev, newMarker])
      
      // Notify parent component
      onIssueAdd?.(newMarker)
      
      console.log('Issue marker added at 3D position:', intersectionPoint, 'in viewer:', containerId)
      console.log('Intersection details:', intersects[0])
    } else {
      console.log('No intersection found with sphere')
    }
  }, [onIssueAdd, containerId])

  // Calculate screen position for 3D markers
  const getScreenPosition = useCallback((worldPosition: THREE.Vector3) => {
    if (!cameraRef.current || !rendererRef.current) return null

    // Clone the world position to avoid modifying the original
    const vector = worldPosition.clone()
    
    // Project the 3D position to screen coordinates
    vector.project(cameraRef.current)

    const canvas = rendererRef.current.domElement
    const canvasRect = canvas.getBoundingClientRect()
    
    // Convert from normalized device coordinates (-1 to 1) to canvas pixels
    const x = (vector.x * 0.5 + 0.5) * canvasRect.width
    const y = (vector.y * -0.5 + 0.5) * canvasRect.height

    // Simple visibility check - if z > 1, the point is behind the camera
    const isVisible = vector.z < 1

    return { 
      x: x, // Canvas-relative coordinates
      y: y, // Canvas-relative coordinates
      isVisible: isVisible
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
    <div ref={containerRef} id={containerId} className="viewer-split relative overflow-hidden">
      {/* Issue markers overlay */}
      {issueMarkers.map((marker) => {
        const screenPos = getScreenPosition(marker.position)
        if (!screenPos || !screenPos.isVisible) return null

        return (
          <div
            key={marker.id}
            className="absolute pointer-events-none z-10"
            style={{
              left: `${screenPos.x}px`,
              top: `${screenPos.y}px`,
              transform: 'translate(-50%, -50%)'
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
export type { IssueMarker }

'use client'

import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'

interface ViewerProps {
  imageUrl: string
  containerId: string
  onLoad?: () => void
  onError?: (error: Error | Event) => void
}


const Viewer360 = ({ imageUrl, containerId, onLoad, onError }: ViewerProps, ref: React.Ref<{ updateCamera: (rotY: number, rotX: number, fov: number) => void; render: () => void; resize: (width: number, height: number) => void }>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sphereRef = useRef<THREE.Mesh | null>(null)
  
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
    }
  }, [])

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
    resize
  }), [updateCamera, render, resize])

  return <div ref={containerRef} id={containerId} className="viewer-split" />
}

export default forwardRef(Viewer360)

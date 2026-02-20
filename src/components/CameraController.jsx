import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import * as THREE from 'three'

const CAMERA_POSITIONS = {
  default: { position: [0, 0, 3.5], target: [0, 0, 0] },
  display: { position: [0, 0.15, 2], target: [0, 0.15, 0] },
  camera: { position: [0.4, 0.7, -2.2], target: [0, 0.6, -0.1] },
  processor: { position: [0, -0.3, 2.2], target: [0, -0.3, 0] },
  triggers: { position: [2.2, 0.8, 1.2], target: [0.5, 0.8, 0] },
  battery: { position: [0, -1.2, 2.2], target: [0, -1, 0] },
}

export default function CameraController({ activeFeature, autoRotate }) {
  const { camera } = useThree()
  const controlsRef = useRef()
  const isAnimating = useRef(false)

  useEffect(() => {
    const preset = CAMERA_POSITIONS[activeFeature] || CAMERA_POSITIONS.default
    isAnimating.current = true

    if (controlsRef.current) {
      controlsRef.current.autoRotate = false
    }

    gsap.to(camera.position, {
      x: preset.position[0],
      y: preset.position[1],
      z: preset.position[2],
      duration: 1.5,
      ease: 'power3.inOut',
      onComplete: () => {
        isAnimating.current = false
        if (controlsRef.current && autoRotate && activeFeature === 'default') {
          controlsRef.current.autoRotate = true
        }
      }
    })

    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: preset.target[0],
        y: preset.target[1],
        z: preset.target[2],
        duration: 1.5,
        ease: 'power3.inOut',
      })
    }
  }, [activeFeature, camera, autoRotate])

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={1.5}
      maxDistance={8}
      autoRotate={autoRotate && activeFeature === 'default'}
      autoRotateSpeed={1.5}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI * 0.85}
      minPolarAngle={Math.PI * 0.15}
    />
  )
}

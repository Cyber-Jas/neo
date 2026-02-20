import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useEffect, Suspense } from 'react'
import PhoneModel from './PhoneModel'
import CameraController from './CameraController'
import * as THREE from 'three'

function ClickHandler({ onHotspotClick }) {
  const { camera, scene, gl } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const pointer = useRef(new THREE.Vector2())

  useEffect(() => {
    const handleClick = (event) => {
      const rect = gl.domElement.getBoundingClientRect()
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.current.setFromCamera(pointer.current, camera)

      // Collect hotspot meshes fresh each click
      const hotspots = []
      scene.traverse((obj) => {
        if (obj.name === 'hotspot' && obj.userData?.feature) {
          hotspots.push(obj)
        }
      })

      const intersects = raycaster.current.intersectObjects(hotspots, false)
      if (intersects.length > 0) {
        const feature = intersects[0].object.userData.feature
        if (feature) onHotspotClick(feature)
      }
    }

    gl.domElement.addEventListener('click', handleClick)
    return () => gl.domElement.removeEventListener('click', handleClick)
  }, [camera, scene, gl, onHotspotClick])

  return null
}

export default function Scene3D({ activeFeature, onHotspotClick, autoRotate }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      dpr={[1, 2]}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {/* Strong lighting so the phone is always visible */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#ff3333" />
      <pointLight position={[0, -3, 3]} intensity={1} color="#ff4444" />
      <pointLight position={[3, 2, 4]} intensity={0.6} />

      {/* Phone model */}
      <PhoneModel activeFeature={activeFeature} />

      {/* Click handler for hotspots */}
      <ClickHandler onHotspotClick={onHotspotClick} />

      {/* Camera control */}
      <CameraController activeFeature={activeFeature} autoRotate={autoRotate} />
    </Canvas>
  )
}

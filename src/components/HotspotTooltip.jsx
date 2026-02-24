import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const TOOLTIP_DATA = {
  display: { label: '120Hz AMOLED', desc: 'Tap to explore' },
  camera: { label: '50MP AI Camera', desc: 'Tap to explore' },
  processor: { label: 'UNISOC T9100', desc: 'Tap to explore' },
  triggers: { label: 'Shoulder Triggers', desc: 'Tap to explore' },
  battery: { label: '6000mAh Battery', desc: 'Tap to explore' },
}

export function HotspotTooltip({ position, feature, active, hovered }) {
  const groupRef = useRef()
  const { camera } = useThree()
  const data = TOOLTIP_DATA[feature]

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.quaternion.copy(camera.quaternion)
    }
  })

  if (!hovered || active) return null

  return (
    <group position={position} ref={groupRef}>
      {/* Background panel */}
      <mesh position={[0, 0.18, 0]}>
        <planeGeometry args={[0.6, 0.16]} />
        <meshBasicMaterial
          color="#0a0a14"
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Red accent line */}
      <mesh position={[0, 0.105, 0.001]}>
        <planeGeometry args={[0.55, 0.008]} />
        <meshBasicMaterial color="#ff0a0a" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

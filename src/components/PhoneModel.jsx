import React, { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Realistic smartphone proportions (~2.15:1 aspect ratio)
const BODY_W = 1.55
const BODY_H = 3.3
const BODY_D = 0.18
const CORNER_R = 0.12
const BEZEL = 0.06

/* ─── Metallic frame (chamfered edge around the phone) ─── */
function PhoneFrame() {
  return (
    <RoundedBox
      args={[BODY_W + 0.02, BODY_H + 0.02, BODY_D + 0.01]}
      radius={CORNER_R + 0.01}
      smoothness={8}
    >
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.85}
        roughness={0.12}
        clearcoat={0.5}
        clearcoatRoughness={0.08}
      />
    </RoundedBox>
  )
}

/* ─── Main phone chassis ─── */
function PhoneBody() {
  return (
    <RoundedBox
      args={[BODY_W, BODY_H, BODY_D]}
      radius={CORNER_R}
      smoothness={8}
    >
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.3}
        roughness={0.25}
        clearcoat={0.4}
        clearcoatRoughness={0.15}
      />
    </RoundedBox>
  )
}

/* ─── High-res screen with glass effect ─── */
function ScreenPanel() {
  const screenW = BODY_W - BEZEL * 2
  const screenH = BODY_H - BEZEL * 2

  return (
    <group position={[0, 0, BODY_D / 2 + 0.01]}>
      {/* Black screen */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshBasicMaterial color="#000000" toneMapped={false} />
      </mesh>
      {/* Glass reflection overlay */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.08}
          color="#aabbff"
          metalness={0.1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </group>
  )
}

/* Helper: draw rounded rect on canvas */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

/* ─── Rear Camera Module ─── */
function CameraLens({ position, outerR, innerR }) {
  return (
    <group position={position}>
      {/* Outer ring - flat on back */}
      <mesh>
        <ringGeometry args={[outerR - 0.05, outerR, 32, 8]} />
        <meshPhysicalMaterial color="#222222" metalness={0.95} roughness={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Glass lens */}
      <mesh position={[0, 0, 0.050]}>
        <circleGeometry args={[innerR, 48]} />
        <meshPhysicalMaterial
          color="#0a0020"
          metalness={0.1}
          roughness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.02}
          emissive="#120028"
          emissiveIntensity={0.15}
          transmission={0.15}
          thickness={0.5}
        />
      </mesh>
      {/* Inner reflection ring */}
      <mesh position={[0, 0, 0.040]}>
        <ringGeometry args={[innerR * 0.6, innerR * 0.65, 48]} />
        <meshBasicMaterial color="#334466" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function CameraModule() {
  return null
}

/* ─── Back Cover Image ─── */
function BackCover() {
  const texture = useLoader(THREE.TextureLoader, '/back-cover.jpg')
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.anisotropy = 16

  const coverW = BODY_W
  const coverH = BODY_H

  // Create a rounded-corner alpha mask
  const alphaTex = useMemo(() => {
    const size = 512
    const aspect = BODY_H / BODY_W
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = Math.round(size * aspect)
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    const r = 28 // corner radius in pixels

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.moveTo(r, 0)
    ctx.lineTo(W - r, 0)
    ctx.quadraticCurveTo(W, 0, W, r)
    ctx.lineTo(W, H - r)
    ctx.quadraticCurveTo(W, H, W - r, H)
    ctx.lineTo(r, H)
    ctx.quadraticCurveTo(0, H, 0, H - r)
    ctx.lineTo(0, r)
    ctx.quadraticCurveTo(0, 0, r, 0)
    ctx.fill()

    const tex = new THREE.CanvasTexture(canvas)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.needsUpdate = true
    return tex
  }, [])

  return (
    <mesh position={[0, 0, -(BODY_D / 2) - 0.006]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[coverW, coverH]} />
      <meshBasicMaterial
        map={texture}
        alphaMap={alphaTex}
        transparent
        toneMapped={false}
      />
    </mesh>
  )
}

/* ─── Side Buttons ─── */
function SideButtons() {
  const bw = 0.025
  const bd = BODY_D * 0.35
  const x = BODY_W / 2 + bw / 2 + 0.008
  return (
    <group>
      {/* Volume up */}
      <RoundedBox args={[bw, 0.28, bd]} radius={0.005} smoothness={4} position={[x, 0.35, 0]}>
        <meshPhysicalMaterial color="#c8ccd0" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      {/* Volume down */}
      <RoundedBox args={[bw, 0.28, bd]} radius={0.005} smoothness={4} position={[x, 0, 0]}>
        <meshPhysicalMaterial color="#c8ccd0" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      {/* Power / gaming trigger */}
      <RoundedBox args={[bw, 0.22, bd]} radius={0.005} smoothness={4} position={[x, -0.3, 0]}>
        <meshPhysicalMaterial color="#ff1111" metalness={0.85} roughness={0.12} />
      </RoundedBox>
    </group>
  )
}

/* ─── Gaming Red Accent Lines ─── */
function GamingAccents() {
  const glowMat = (
    <meshBasicMaterial color="#ff1111" transparent opacity={0.85} toneMapped={false} />
  )
  return (
    <group>
      {/* Top edge accent */}
      <mesh position={[0, BODY_H / 2 - 0.01, BODY_D / 2 + 0.002]}>
        <planeGeometry args={[BODY_W * 0.7, 0.012]} />
        {glowMat}
      </mesh>
      {/* Bottom edge accent */}
      <mesh position={[0, -(BODY_H / 2) + 0.01, BODY_D / 2 + 0.002]}>
        <planeGeometry args={[BODY_W * 0.7, 0.012]} />
        {glowMat}
      </mesh>
    </group>
  )
}

/* ─── Side Triggers (landscape gaming grip: top-right & bottom-left) ─── */
function ShoulderTriggers() {
  const bw = 0.025
  const triggerH = 0.35
  const bd = BODY_D * 0.35
  const xRight = BODY_W / 2 + bw / 2 + 0.008
  const xLeft = -(BODY_W / 2 + bw / 2 + 0.008)
  const yTop = BODY_H / 2 - 0.35    // near top edge
  const yBottom = -(BODY_H / 2) + 0.35  // near bottom edge
  return (
    <group>
      {/* Right trigger (top, R1) */}
      <RoundedBox args={[bw, triggerH, bd]} radius={0.006} smoothness={4} position={[xRight, yTop, 0]}>
        <meshPhysicalMaterial color="#c8ccd0" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      {/* Left trigger (bottom, L1) */}
      <RoundedBox args={[bw, triggerH, bd]} radius={0.006} smoothness={4} position={[xLeft, yBottom, 0]}>
        <meshPhysicalMaterial color="#c8ccd0" metalness={0.9} roughness={0.1} />
      </RoundedBox>
    </group>
  )
}

/* ─── Bottom Ports ─── */
function BottomPorts() {
  const y = -(BODY_H / 2) - 0.005
  return (
    <group position={[0, y, 0]}>
      {/* USB-C port */}
      <RoundedBox args={[0.22, 0.035, 0.07]} radius={0.01} smoothness={4}>
        <meshPhysicalMaterial color="#1a1a1a" metalness={0.9} roughness={0.08} />
      </RoundedBox>
      {/* Speaker grilles */}
      {[-0.4, 0.4].map((xOff) => (
        <group key={xOff} position={[xOff, 0.005, 0]}>
          {[...Array(5)].map((_, i) => (
            <mesh key={i} position={[(i - 2) * 0.05, 0, BODY_D / 2 + 0.001]}>
              <circleGeometry args={[0.012, 16]} />
              <meshPhysicalMaterial color="#1a1a1a" metalness={0.6} roughness={0.2} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

/* ─── Hotspot Dots ─── */
function HotspotDot({ position, feature, active }) {
  const dotRef = useRef()

  useFrame((state) => {
    if (dotRef.current) {
      const s = active ? 1.4 : 1 + Math.sin(state.clock.elapsedTime * 3) * 0.12
      dotRef.current.scale.setScalar(s)
    }
  })

  return (
    <group position={position} name="hotspot" userData={{ feature }}>
      <mesh ref={dotRef} name="hotspot" userData={{ feature }} position={[0, 0, 0.002]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshBasicMaterial
          color={active ? '#ff3333' : '#ffffff'}
          transparent
          opacity={active ? 1 : 0.7}
        />
      </mesh>
      <mesh name="hotspot" userData={{ feature }} position={[0, 0, 0.001]}>
        <ringGeometry args={[0.10, 0.14, 48]} />
        <meshBasicMaterial
          color={active ? '#ff3333' : '#ffffff'}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

/* ─── Main Export ─── */
export default function PhoneModel({ activeFeature }) {
  return (
    <group scale={0.75}>
      {/* Metallic frame */}
      <PhoneFrame />

      {/* Main phone body */}
      <PhoneBody />

      {/* Front screen */}
      <ScreenPanel />

      {/* Punch-hole front camera */}
      <mesh position={[0, BODY_H / 2 - 0.2, BODY_D / 2 + 0.002]}>
        <circleGeometry args={[0.035, 32]} />
        <meshPhysicalMaterial
          color="#050505"
          metalness={0.3}
          roughness={0.05}
          clearcoat={1}
        />
      </mesh>

      {/* Rear camera module */}
      <CameraModule />

      {/* Back cover image */}
      <BackCover />

      {/* Gaming accents */}
      <GamingAccents />

      {/* Shoulder triggers */}
      <ShoulderTriggers />

      {/* Side buttons */}
      <SideButtons />

      {/* Bottom ports & speakers */}
      <BottomPorts />

      {/* ── Hotspot markers ── */}
      <HotspotDot
        position={[0, 0.2, BODY_D / 2 + 0.008]}
        feature="display"
        active={activeFeature === 'display'}
      />
      <HotspotDot
        position={[0.4, 0.85, -(BODY_D / 2) - 0.008]}
        feature="camera"
        active={activeFeature === 'camera'}
      />
      <HotspotDot
        position={[0, -0.6, BODY_D / 2 + 0.008]}
        feature="processor"
        active={activeFeature === 'processor'}
      />
      <HotspotDot
        position={[BODY_W / 2 + 0.008, BODY_H / 2 - 0.35, 0]}
        feature="triggers"
        active={activeFeature === 'triggers'}
      />
      <HotspotDot
        position={[0, -(BODY_H / 2) - 0.008, 0]}
        feature="battery"
        active={activeFeature === 'battery'}
      />
    </group>
  )
}


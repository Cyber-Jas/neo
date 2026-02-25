import { Html } from '@react-three/drei'

const TOOLTIP_DATA = {
  display: { label: '120Hz AMOLED', desc: 'Tap to explore' },
  camera: { label: '50MP AI Camera', desc: 'Tap to explore' },
  processor: { label: 'UNISOC T9100', desc: 'Tap to explore' },
  triggers: { label: 'Shoulder Triggers', desc: 'Tap to explore' },
  battery: { label: '6000mAh Battery', desc: 'Tap to explore' },
}

const tooltipStyle = {
  background: 'rgba(10, 10, 20, 0.92)',
  border: '1px solid rgba(255, 10, 10, 0.5)',
  borderRadius: '8px',
  padding: '8px 14px',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
  transform: 'translateY(-120%)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 20px rgba(255, 0, 0, 0.15)',
}

const labelStyle = {
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: 700,
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
  margin: 0,
  lineHeight: 1.3,
}

const descStyle = {
  color: '#ff4444',
  fontSize: '10px',
  fontWeight: 500,
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
  margin: '2px 0 0',
  lineHeight: 1.2,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
}

export function HotspotTooltip({ position, feature, active, hovered }) {
  const data = TOOLTIP_DATA[feature]

  if (!hovered || active) return null

  return (
    <Html
      position={position}
      center
      distanceFactor={4}
      style={{ pointerEvents: 'none' }}
      zIndexRange={[100, 0]}
    >
      <div style={tooltipStyle}>
        <p style={labelStyle}>{data.label}</p>
        <p style={descStyle}>{data.desc}</p>
      </div>
    </Html>
  )
}

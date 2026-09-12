import { useRef, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Sparkles,
  Torus,
  Sphere,
} from '@react-three/drei';

// ── Error Boundary for 3D Canvas ───────────────────────────────────────────────
export class ThreeErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn('3D Canvas encountered an error, using 2D fallback:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-poy-purple-bg">
          <span className="text-4xl mb-1">🍲</span>
          <span className="font-serif text-xs text-poy-purple font-bold">Interactive Dish</span>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Main Hero Donut ─────────────────────────────────────────────────────────────
function HeroDonut() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Torus ref={meshRef} args={[1.6, 0.55, 32, 64]}>
        <meshStandardMaterial
          color="#734060"        // Pinch of Yum signature purple
          roughness={0.25}
          metalness={0.7}
          emissive="#4a233c"     // Rich wine glow
          emissiveIntensity={0.3}
        />
      </Torus>
    </Float>
  );
}

// ── Orbiting Mini Tori ─────────────────────────────────────────────────────────
function OrbitingTori() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.08;
  });

  const specs = [
    { position: [3.4, 0.6, 0],    color: '#edb654', scale: 0.4 },  // POY gold
    { position: [-3.0, -0.8, 0.5], color: '#ddc5d8', scale: 0.32 }, // POY light purple
    { position: [1.2, 2.8, -1.0], color: '#734060', scale: 0.36 }, // POY purple
  ];

  return (
    <group ref={groupRef}>
      {specs.map(({ position, color, scale }, i) => (
        <Float key={i} speed={1 + i * 0.4} floatIntensity={0.5} rotationIntensity={0.6}>
          <Torus args={[0.9, 0.35, 24, 48]} position={position} scale={scale}>
            <meshStandardMaterial
              color={color}
              roughness={0.3}
              metalness={0.5}
            />
          </Torus>
        </Float>
      ))}
    </group>
  );
}

// ── Floating Spheres (ingredients) ─────────────────────────────────────────────
function FloatingSpheres() {
  const positions = [
    [-3.2, 1.5, -1],
    [2.8, -1.6, 0.5],
    [-1.0, -2.4, -0.8],
    [2.2, 2.2, -1.5],
  ];
  const colors = ['#edb654', '#734060', '#f2b955', '#ddc5d8'];

  return (
    <>
      {positions.map((pos, i) => (
        <Float key={i} speed={0.8 + i * 0.3} floatIntensity={0.8} rotationIntensity={0.4}>
          <Sphere args={[0.2, 24, 24]} position={pos}>
            <meshStandardMaterial
              color={colors[i % colors.length]}
              roughness={0.2}
              metalness={0.6}
              emissive={colors[i % colors.length]}
              emissiveIntensity={0.2}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

// ── Lighting ────────────────────────────────────────────────────────────────────
function Lights() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[6, 6, 6]} intensity={35} color="#edb654" decay={2} />
      <pointLight position={[-6, -4, -4]} intensity={25} color="#734060" decay={2} />
      <directionalLight position={[0, 8, 4]} intensity={1.5} color="#ffffff" />
    </>
  );
}

// ── Full 3D Scene (Zero External Network Dependencies) ──────────────────────────
function Scene() {
  return (
    <>
      <Lights />
      <HeroDonut />
      <OrbitingTori />
      <FloatingSpheres />

      {/* Sparkles */}
      <Sparkles
        count={80}
        scale={8}
        size={2}
        speed={0.3}
        color="#edb654"
        opacity={0.8}
      />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 3.5}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <ThreeErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 46 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </ThreeErrorBoundary>
  );
}

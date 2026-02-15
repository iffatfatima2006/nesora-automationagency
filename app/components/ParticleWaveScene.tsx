"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const waveVertexShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uClick; // x, z, time
  
  attribute vec3 targetPosition;
  attribute float aRandom;
  
  varying float vAlpha;
  varying float vRandom;
  varying float vDepth;
  
  void main() {
    vRandom = aRandom;

    // 1. Morphing: Plane (position) -> Cube (targetPosition)
    // Faster transition to sphere shape
    float t = smoothstep(0.0, 0.5, uScroll);
    vec3 pos = mix(position, targetPosition, t);
    
    // 2. Wave Animation - smoothly fades in/out
    float waveInfluence = 1.0 - smoothstep(0.0, 0.5, t); 
    float wave = sin(pos.x * 0.4 + uTime * 1.2) * cos(pos.z * 0.4 + uTime * 1.0) * 0.5;
    pos.y += wave * waveInfluence;
    
    // 3. Ripple Effect
    float timeSinceClick = uTime - uClick.z;
    if (timeSinceClick > 0.0 && timeSinceClick < 2.5) {
      float dist = distance(pos.xz, uClick.xy);
      float rippleRadius = timeSinceClick * 12.0;
      float rippleWidth = 3.0;
      
      float ripple = smoothstep(rippleRadius - rippleWidth, rippleRadius, dist) * 
                     (1.0 - smoothstep(rippleRadius, rippleRadius + 1.0, dist));
      
      pos.y += ripple * 8.0 * exp(-timeSinceClick * 1.5) * waveInfluence;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size - consistent sizing for clean look
    float baseSize = 3.8 + aRandom * 1.2;
    float size = baseSize * (1.0 - t * 0.15);
    gl_PointSize = size * (30.0 / -mvPosition.z);
    
    // Depth-based opacity calculation for immersive effect
    // Dots farther (lower z) -> lower opacity (0.2-0.4)
    // Dots closer (higher z) -> higher opacity (0.7-1.0)
    // Map z range roughly -60 to +40 to 0.0-1.0
    float depthNorm = smoothstep(-60.0, 40.0, pos.z);
    vDepth = depthNorm; // Pass to fragment for color influence if needed
    
    // Base alpha from depth
    float baseAlpha = mix(0.2, 1.0, depthNorm);
    
    // Pulse effect
    float pulseSpeed = 0.15;
    float pulse = 0.1 * sin(uTime * pulseSpeed + aRandom * 6.28);
    
    vAlpha = baseAlpha + pulse;
    vAlpha = clamp(vAlpha, 0.1, 1.0);
  }
`;

const waveFragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;
  varying float vRandom;
  varying float vDepth;
  
  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;
    
    // Color Palette
    // Primary: #2ED3FF (Cyan-Blue)
    // Secondary: #1FAAFF (Blue-Cyan)
    // Tertiary: #0E6BFF (Deep Blue)
    
    vec3 c1 = vec3(0.18, 0.83, 1.0); // #2ED3FF
    vec3 c2 = vec3(0.12, 0.67, 1.0); // #1FAAFF
    vec3 c3 = vec3(0.05, 0.42, 1.0); // #0E6BFF
    
    vec3 finalColor;
    
    // Mix colors based on randomness and depth
    if (vRandom < 0.33) {
        finalColor = mix(c1, c2, vRandom * 3.0);
    } else if (vRandom < 0.66) {
        finalColor = mix(c2, c3, (vRandom - 0.33) * 3.0);
    } else {
        finalColor = mix(c3, c1, (vRandom - 0.66) * 3.0);
    }
    
    // Add luminosity based on depth (closer = brighter)
    finalColor += vec3(0.1) * vDepth;
    
    // Soft outer glow effect
    // Center is bright, edges fade
    float glow = 1.0 - (dist * 2.0);
    glow = pow(glow, 2.0); // Sharpen the glow slightly
    
    // Subtle glow color tint
    vec3 glowColor = vec3(0.18, 0.83, 1.0) * 0.35; // #2ED3FF at 35%
    
    vec3 outColor = finalColor + glowColor * (1.0 - glow);
    
    gl_FragColor = vec4(outColor, vAlpha * glow);
  }
`;

function SceneContent({ scrollRef, setHovering }: { scrollRef: React.MutableRefObject<number>, setHovering: (h: boolean) => void }) {
    const { viewport, clock, raycaster } = useThree();
    const pointsRef = useRef<THREE.Points>(null);
    const shaderRef = useRef<THREE.ShaderMaterial>(null);
    const clickState = useRef(new THREE.Vector3(0, 0, -1000));

    const geometry = useMemo(() => {
        // Optimized particle count
        const count = 20000;
        const positions = new Float32Array(count * 3);
        const targetPositions = new Float32Array(count * 3);
        const randoms = new Float32Array(count);

        // 1. Grid Mesh (Plane)
        const gridSize = Math.ceil(Math.sqrt(count));
        const spacing = 0.6;
        const offset = (gridSize * spacing) / 2;

        for (let i = 0; i < count; i++) {
            const r = Math.floor(i / gridSize);
            const c = i % gridSize;
            const randomOffsetX = (Math.random() - 0.5) * 0.1;
            const randomOffsetZ = (Math.random() - 0.5) * 0.1;
            positions[i * 3] = (c * spacing) - offset + randomOffsetX;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = (r * spacing) - offset + randomOffsetZ;
            randoms[i] = Math.random();
        }

        // 2. Sphere Distribution - Filled Volumetric Sphere
        const radius = 6.0;

        for (let i = 0; i < count; i++) {
            // Random point IN volume for denser core look
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);

            // Cube root of r ensures uniform distribution in volume
            // adjusting distribution to favor outer shell slightly for definition
            const r = radius * Math.cbrt(Math.random());

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            targetPositions[i * 3] = x;
            targetPositions[i * 3 + 1] = y;
            targetPositions[i * 3 + 2] = z;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3));
        geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
        return geo;
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uClick: { value: clickState.current },
        uColor: { value: new THREE.Color("#2ED3FF") } // Updated base color
    }), []);

    useFrame((state) => {
        const scrollProgress = scrollRef.current;

        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            shaderRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
                shaderRef.current.uniforms.uScroll.value,
                scrollProgress,
                0.12
            );
        }

        if (pointsRef.current) {
            // Continuous Y rotation
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;

            if (scrollProgress > 0.05) {
                // Tumble rotation to show 3D volume
                // Rotate on X axis to bring top forward
                pointsRef.current.rotation.x = THREE.MathUtils.lerp(
                    pointsRef.current.rotation.x,
                    scrollProgress * Math.PI * 0.5, // Rotate 90 degrees max
                    0.08
                );
                // Add slight Z tilt for interest
                pointsRef.current.rotation.z = THREE.MathUtils.lerp(
                    pointsRef.current.rotation.z,
                    scrollProgress * Math.PI * 0.1,
                    0.08
                );
            } else {
                pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, 0, 0.08);
                pointsRef.current.rotation.z = THREE.MathUtils.lerp(pointsRef.current.rotation.z, 0, 0.08);
            }
        }
    });

    return (
        <>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={(e) => {
                    const point = e.point;
                    clickState.current.set(point.x, point.z, clock.getElapsedTime());
                    if (shaderRef.current) shaderRef.current.uniforms.uClick.value.copy(clickState.current);
                }}
                onPointerOver={() => setHovering(true)}
                onPointerOut={() => setHovering(false)}
            >
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>

            <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
                <shaderMaterial
                    ref={shaderRef}
                    vertexShader={waveVertexShader}
                    fragmentShader={waveFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                    depthTest={true}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </>
    );
}

export default function ParticleWaveScene({ scrollRef, setHovering }: { scrollRef: React.MutableRefObject<number>, setHovering: (h: boolean) => void }) {
    // Use a stable key or conditional rendering to force re-mount if needed
    return (
        <div className="h-full w-full absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 5, 30], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            >
                {/* Transparent background to let CSS gradient show through */}
                {/* <color attach="background" args={["#000000"]} /> */}
                <fog attach="fog" args={["#040814", 30, 90]} />
                <SceneContent scrollRef={scrollRef} setHovering={setHovering} />
            </Canvas>
        </div>
    );
}

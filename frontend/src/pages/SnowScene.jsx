// SnowScene.jsx
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Snow({ count = 1500 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = -Math.random() * 40;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 3) {
      pos[i + 1] -= 0.08;
      pos[i + 2] += 0.15;

      if (pos[i + 1] < -5 || pos[i + 2] > 5) {
        pos[i]     = (Math.random() - 0.5) * 30;
        pos[i + 1] = 20;
        pos[i + 2] = -40;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="white"
        size={0.15}
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export default function SnowScene() {
  return (
    <div
      className="snow-layer"
    >
      <Canvas
        camera={{ position: [0, 2, 5], fov: 10 }}
        style={{ pointerEvents: "none" }}   // 🔥 IMPORTANT
      >
        <ambientLight intensity={0.6} />
        <Snow />
      </Canvas>
    </div>
  );
}

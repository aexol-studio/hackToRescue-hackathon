import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { animated, useSprings, useSpring } from "@react-spring/three";
import React, { useRef, useState, useMemo, useEffect, FC } from "react";
import { Group, Mesh } from "three";
import { useAppStore } from "@/stores";

import * as THREE from "three";
import { generateLungsColor } from "@/utils";

useGLTF.preload(`/assets/models/newday.glb`);

export const Model2: FC = () => {
  const { scaleLounge, showLounge, lungPollution, allowRotation } = useAppStore(
    ({ scaleLounge, showLounge, lungPollution, allowRotation }) => ({
      scaleLounge,
      showLounge,
      lungPollution,
      allowRotation,
    })
  );
  const groupRef = useRef<Group>(null);
  const { nodes } = useGLTF(`/assets/models/newday.glb`) as any;

  const vec = new THREE.Vector3();
  const { scale } = useSpring({ scale: scaleLounge ? 0.5 : 1, delay: 0 });

  const [colors, setColors] = useState({ old: "#fff", new: "#fff" });
  const modelMeshes: Mesh[] = useMemo(
    () =>
      Object.entries(nodes)
        .map(([key, value]) => (key.toLowerCase().includes("object") ? value : null))
        .filter(Boolean) as Mesh[],
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current || allowRotation) return;
    groupRef.current.rotation.z += delta * 0.2;
    // state.camera.lookAt(groupRef.current.position);
    if (scaleLounge) state.camera.position.lerp(vec.set(0, -2.2, 6), 0.2);
    else state.camera.position.lerp(vec.set(0, 0, 6), 0.2);
    groupRef.current.updateMatrixWorld();
    state.camera.updateProjectionMatrix();
  });
  const [lungSprings] = useSprings(
    10,
    i => ({
      delay: 100 * i,
      from: { opacity: showLounge ? 0 : 0.8, color: colors.old },
      to: { opacity: showLounge ? 0.8 : 0, color: colors.new },
    }),
    [showLounge, lungPollution]
  );

  useEffect(() => {
    if (showLounge)
      setColors(p => ({
        new: generateLungsColor((lungPollution ?? 0) * 100) ?? "#fff",
        old: p.new,
      }));
    else setColors({ new: "#fff", old: "#fff" });
  }, [lungPollution, showLounge]);

  useEffect(() => {
    if (groupRef.current) {
      if (window.innerWidth <= 640) groupRef.current.scale.set(0.6, 0.6, 0.6);
      else groupRef.current.scale.set(1, 1, 1);
    }

    const handleModelResize = () => {
      if (!groupRef.current) return;

      if (window.innerWidth <= 640) groupRef.current.scale.set(0.6, 0.6, 0.6);
      else groupRef.current.scale.set(1, 1, 1);
    };

    window.addEventListener("resize", () => handleModelResize());
    return () => window.removeEventListener("resize", () => handleModelResize());
  }, []);

  return (
    <>
      <animated.group
        scale={scale}
        castShadow
        ref={groupRef}
        dispose={null}
        position={[0, 0.2, 0]}
        rotation={[-(Math.PI / 2.5), 0, 0]}>
        {lungSprings.map((spring, i) => (
          <mesh key={i} scale={0.012} castShadow receiveShadow geometry={modelMeshes[i].geometry}>
            {/* @ts-ignore */}
            <animated.meshToonMaterial color={spring.color} opacity={spring.opacity} transparent />
          </mesh>
        ))}
      </animated.group>
    </>
  );
};

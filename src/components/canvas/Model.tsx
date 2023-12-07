import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { animated, useSprings } from "@react-spring/three";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { Group, Mesh } from "three";
import { useAppStore } from "@/stores";
import { airQualityColors } from "@/constans";
useGLTF.preload(`/assets/models/model.glb`);

export const Model = () => {
  const { nodes } = useGLTF(`/assets/models/model.glb`) as any;
  const { airQuality, hoveredQualityIndex, allowRotation } = useAppStore(
    (state) => ({
      allowRotation: state.allowRotation,
      airQuality: state.airQuality,
      hoveredQualityIndex: state.hoveredQualityIndex,
    })
  );
  const [colors, setColors] = useState({ old: "#fff", new: "#fff" });
  const groupRef = useRef<Group>(null);
  const modelMeshes: Mesh[] = useMemo(
    () =>
      Object.entries(nodes)
        .map(([key, value]) =>
          key.toLowerCase().includes("object") ? value : null
        )
        .filter(Boolean) as Mesh[],
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current || allowRotation) return;
    groupRef.current.rotation.z += delta * 0.2;
    groupRef.current.updateMatrixWorld();
  });
  const [opacities] = useSprings(
    10,
    (i) => ({
      delay: 100 * i,
      from: { color: colors.old },
      to: { color: colors.new },
    }),
    [colors]
  );

  const zoomRef = useRef(1);
  useEffect(() => {
    if (hoveredQualityIndex !== undefined && hoveredQualityIndex !== -1) {
      setColors((p) => ({
        new: airQualityColors[
          hoveredQualityIndex as keyof typeof airQualityColors
        ],
        old: p.new,
      }));
      return;
    } else if ((airQuality?.st?.indexLevel?.id ?? -1) < 0)
      setColors((p) => ({
        old: "#fff",
        new: "#fff",
      }));
    else
      setColors((p) => ({
        new: airQualityColors[
          airQuality?.st.indexLevel?.id as keyof typeof airQualityColors
        ],
        old: p.new,
      }));
  }, [airQuality, , hoveredQualityIndex]);

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
    return () =>
      window.removeEventListener("resize", () => handleModelResize());
  }, []);

  return (
    <>
      <perspectiveCamera position={[0, 0, 30]} />
      <group
        castShadow
        ref={groupRef}
        dispose={null}
        position={[0, 0.2, 0]}
        rotation={[-(Math.PI / 2.5), 0, 0]}
      >
        {opacities.map((color, i) => (
          <mesh
            key={i}
            scale={0.012}
            castShadow
            receiveShadow
            geometry={modelMeshes[i].geometry}
          >
            {/* @ts-ignore */}
            <animated.meshToonMaterial
              color={color.color}
              opacity={0.8}
              transparent
            />
          </mesh>
        ))}
      </group>
    </>
  );
};

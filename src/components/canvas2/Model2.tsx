import { Loader, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { animated, useSprings, useSpring } from "@react-spring/three";
import React, { useRef, useState, useMemo, useEffect, FC } from "react";
import { Group, Mesh } from "three";
import { useAppStore } from "@/stores";
import { airQualityColors } from "@/constans";
import * as THREE from "three";

useGLTF.preload(`/assets/models/model.glb`);
useGLTF.preload(`/assets/models/111lungs.glb`);

export const Model2: FC<{ test: boolean }> = ({ test }) => {
  console.log(test);
  const { nodes } = useGLTF(`/assets/models/model.glb`) as any;
  // const { nodes: newNodes } = useGLTF(`/assets/models/111lungs.glb`);
  const { airQuality, hoveredQualityIndex, allowRotation } = useAppStore(
    (state) => ({
      allowRotation: state.allowRotation,
      airQuality: state.airQuality,
      hoveredQualityIndex: state.hoveredQualityIndex,
    })
  );
  const vec = new THREE.Vector3();
  const { scale } = useSpring({ scale: test ? 0.5 : 1 });
  const { y } = useSpring({ y: test ? 0.3 : 0.2 });
  // console.log(scale);
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

  // const modelMeshes2: Mesh[] = useMemo(
  //   () =>
  //     Object.entries(newNodes)
  //       .map(([key, value]) =>
  //         key.toLowerCase().includes("sculpt") ? value : null
  //       )
  //       .filter(Boolean) as Mesh[],
  //   []
  // );
  // // console.log(newNodes);
  // console.log(modelMeshes2);

  useFrame((state, delta) => {
    if (!groupRef.current || allowRotation) return;
    groupRef.current.rotation.z += delta * 0.2;
    // state.camera.lookAt(groupRef.current.position);
    if (test) state.camera.position.lerp(vec.set(0, -2, 6), 0.1);
    else state.camera.position.lerp(vec.set(0, 0, 6), 0.1);
    groupRef.current.updateMatrixWorld();
    state.camera.updateProjectionMatrix();
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
      <animated.group
        scale={scale}
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
      </animated.group>
    </>
  );
};

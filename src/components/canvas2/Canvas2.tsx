"use client";

import React, { useRef, Suspense, useEffect, FC } from "react";
import { Canvas as FiberCanvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OrbitControls as OrbitControlsRef } from "three-stdlib";
import { Model2 } from "./Model2";
import { Loader } from "./Loader";
import { useAppStore } from "@/stores";

export const Canvas2: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbitControlsRef = useRef<OrbitControlsRef>(null);
  const { allowRotation } = useAppStore(state => ({
    allowRotation: state.allowRotation,
  }));
  const zoomRef = useRef(1);
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!orbitControlsRef.current) return;
      const { deltaY } = e;
      if (deltaY < 0) {
        zoomRef.current += 0.1;
      } else {
        zoomRef.current -= 0.1;
      }
    };
    document.addEventListener("wheel", handleScroll);
    return () => document.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <FiberCanvas ref={canvasRef}>
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} shadow-normalBias={0.04} />
      <ambientLight intensity={1.5} />
      <Suspense fallback={<Loader />}>
        <Model2 />
      </Suspense>
      <OrbitControls
        ref={orbitControlsRef}
        enabled={allowRotation}
        maxDistance={8}
        minDistance={4}
        enablePan={false}
      />
    </FiberCanvas>
  );
};

"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

const Lights = () => {
  return (
    <>
      <directionalLight args={[0xffffff, 2]} position={[2, 0, Math.PI * 2]} />
      {/* <directionalLight args={[0xffffff, 2]} position={[2, 0, 0]} /> */}
      {/* <directionalLight args={[0xffffff, 2]} position={[-2, 0, Math.PI * 2]} /> */}
      <directionalLight args={[0xffffff, 2]} position={[-2, 0, 0]} />
    </>
  );
};

type GLTFResult = GLTF & {
  nodes: {
    david_low_poly__0_1: THREE.Mesh;
    david_low_poly__0_2: THREE.Mesh;
  };
  materials: {
    ["default"]: THREE.MeshStandardMaterial;
    ["default"]: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/david.glb") as GLTFResult;
  return (
    <group
      {...props}
      dispose={null}
      scale={0.08}
      position-z={0.7346}
      rotation-x={-Math.PI / 2}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.david_low_poly__0_1.geometry}
        material={materials["default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.david_low_poly__0_2.geometry}
        material={materials["default"]}
      />
    </group>
  );
}

const ModelCanvas = () => {
  return (
    <div className="fixed inset-0 -z-0">
      <Canvas
        frameloop="demand"
        camera={{ position: [0, 2, 0] }}
        gl={{ preserveDrawingBuffer: true }}
        className="touch-none"
        shadows
      >
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <Lights />
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload("/models/david.glb");

export default ModelCanvas;

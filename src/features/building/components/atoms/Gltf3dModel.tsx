import React from "react"
import { Canvas, extend } from "@react-three/fiber"
import { OrbitControls, Stage, Gltf } from "@react-three/drei"
import Image from "next/image"

extend({ Image })

interface IModelProps {
  poster: string
  model: string
}

const Gltf3dModel = ({ model }: IModelProps) => (
  <div className="relative h-full w-full">
    <Canvas
      shadows
      camera={{ position: [4, -1, 8], fov: 45 }}
    >
      <Stage
        intensity={0.5}
        preset="rembrandt"
        adjustCamera={1}
        environment="city"
      >
        <Gltf
          castShadow
          receiveShadow
          src={model}
        />
      </Stage>
      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={1}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.9}
        enablePan={false}
        enableDamping
        minDistance={2}
        maxDistance={2}
        enableZoom={false}
      />
    </Canvas>
  </div>
)

export default Gltf3dModel

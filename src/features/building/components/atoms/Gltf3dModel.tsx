import React, { Suspense } from "react"
import { Canvas, extend } from "@react-three/fiber"
import {
  OrbitControls,
  Stage,
  Gltf,
  Html,
  useProgress,
  Preload
} from "@react-three/drei"
import { Image } from "@components/atoms/image/index"

extend({ Image })

interface IModelProps {
  poster: string
  model: string
}

const Gltf3dModel = ({ model }: IModelProps) => {
  const { progress } = useProgress()

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        camera={{ position: [4, -1, 8], fov: 45 }}
      >
        <Stage
          intensity={1}
          adjustCamera={1}
          environment="warehouse"
        >
          <Suspense
            fallback={
              <Html
                as="div"
                center
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <span className="canvas-loader" />
                <p
                  style={{
                    fontSize: 14,
                    color: "#F1F1F1",
                    fontWeight: 800,
                    marginTop: 40
                  }}
                  className="flex flex-row gap-1"
                >
                  {progress.toFixed(2)} %
                </p>
              </Html>
            }
          >
            <Gltf
              castShadow
              receiveShadow
              src={model}
            />
            <Preload all />
          </Suspense>
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
}

export default Gltf3dModel

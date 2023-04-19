import { useFrame, useLoader } from "@react-three/fiber"
import React, { useRef } from "react"
import { TextureLoader } from "three"
import * as THREE from "three"
import { colorMap } from "@constants/map"

const MapScene = () => {
  const colorOfBackground = colorMap.background as THREE.ColorRepresentation
  const textureMap = useLoader(TextureLoader, "/images/bg-map.jpeg")
  const scene = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    scene.current!.position.set(0.5, 0, 0)
    scene.current!.rotation.set(0, 0, 0)
  })

  return (
    <>
      {/* <gridHelper />
          <axesHelper />  */}
      <color
        attach="background"
        args={[colorOfBackground]}
      />
      <ambientLight intensity={1} />
      <mesh ref={scene}>
        <planeBufferGeometry
          attach="geometry"
          args={[145, 80, 145, 80]}
        />
        <meshBasicMaterial
          attach="material"
          map={textureMap}
          wireframe={false}
        />
      </mesh>
    </>
  )
}

export default MapScene

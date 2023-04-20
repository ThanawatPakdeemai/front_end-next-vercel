import { useTexture } from "@react-three/drei"
import { ThreeEvent } from "@react-three/fiber"
import { colorThree } from "@constants/map"
import React, { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { ColorRepresentation } from "three"
import { ILandMap } from "@feature/land/interfaces/ILandService"

interface IMeshMaterialBox {
  color: THREE.ColorRepresentation
  logo: string
}

const MeshMaterialBox = ({ color, logo }: IMeshMaterialBox) => {
  const texture = useTexture(logo)
  return (
    <meshStandardMaterial
      attach="material"
      metalness={0.1}
      color={color === colorThree.land ? 0xffffff : color}
      map={texture || undefined}
    />
  )
}

interface IBoxElement {
  pos: {
    px: number
    py: number
  }
  color: ColorRepresentation
  land?: ILandMap
  currentLand?: any | null
  setCurrentLand?: (_value: ILandMap) => void
  lastBox?: boolean
  setLoading?: (_value: boolean) => void
}

const BoxElement = ({
  pos,
  color,
  land,
  currentLand,
  setCurrentLand,
  lastBox,
  setLoading
}: IBoxElement) => {
  const targetBox = useRef<THREE.Mesh>(null!)
  const [hovered, sethovered] = useState<boolean>(false)
  const [thisCurrent, setThisCurrent] = useState<boolean>(false)

  const renderColor = () => {
    const isCurrent = currentLand && land && currentLand._id === land._id

    if (color === colorThree.disable) {
      setThisCurrent(false)
      return color
    }

    setThisCurrent(isCurrent)
    return isCurrent ? colorThree.currentLand : color
  }

  const memoColor = useMemo(
    () => renderColor(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLand, color, hovered]
  )

  useEffect(() => {
    if (lastBox && setLoading) {
      setLoading(false)
    }
  }, [lastBox, setLoading])

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"
  }, [hovered])

  const handleClick = async () => {
    if (
      land &&
      land.color &&
      land.color !== colorThree.disable &&
      setCurrentLand
    ) {
      setCurrentLand(land)
    }
  }

  const onhoveredOver = (_e: ThreeEvent<PointerEvent>) => {
    if (land && land.color && land.color !== colorThree.disable) {
      sethovered(true)
    }
  }

  const onhoveredOut = (_e: ThreeEvent<PointerEvent>) => {
    if (land && land.color && land.color !== colorThree.disable) {
      sethovered(false)
    }
  }

  return (
    <>
      {(hovered || thisCurrent) && (
        <mesh
          position={[pos.px, pos.py, 0.024]}
          scale={new THREE.Vector3(0.99, 0.99, 0.5)}
          onClick={handleClick}
        >
          <planeGeometry args={[0.99, 0.99, 1, 1]} />
          <meshStandardMaterial
            attach="material"
            metalness={0.1}
            color={
              new THREE.Color(
                // eslint-disable-next-line no-nested-ternary
                hovered
                  ? 0xffffff
                  : thisCurrent
                  ? colorThree.currentLand
                  : 0xffffff
              )
            }
          />
        </mesh>
      )}
      <mesh
        ref={targetBox}
        position={[pos.px, pos.py, 0.025]}
        scale={
          // eslint-disable-next-line no-nested-ternary
          hovered
            ? new THREE.Vector3(0.85, 0.85, 0.5)
            : thisCurrent
            ? new THREE.Vector3(0, 0, 0.5)
            : new THREE.Vector3(0.99, 0.99, 0.5)
        }
        onPointerOver={onhoveredOver}
        onPointerOut={onhoveredOut}
        onClick={handleClick}
      >
        <planeGeometry args={[0.99, 0.99, 1, 1]} />
        {land && land.logo_in_map ? (
          <MeshMaterialBox
            color={memoColor}
            logo={land.logo_in_map}
          />
        ) : (
          <meshStandardMaterial
            attach="material"
            metalness={0.1}
            color={memoColor}
          />
        )}
      </mesh>
    </>
  )
}

export default BoxElement

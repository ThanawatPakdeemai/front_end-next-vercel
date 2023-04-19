import React, { Suspense, useEffect, useMemo, useState } from "react"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import useGetAllLand from "@feature/land/containers/hooks/useGetAllLand"
import { cameraSetting, colorThree } from "@constants/map"
import { ILandMap } from "@feature/land/interfaces/ILandService"
import useLoadingStore from "@stores/loading"
import BoxElement from "../molecules/BoxElement"
import CameraController from "../molecules/CameraController"
import MapScene from "../molecules/MapScene"

const calculatePosition = ({ x, y }: { x: string; y: string }) => ({
  px: Number(x) - 173.5,
  py: Number(y) - 1.5
})

const FullMap = () => {
  // hook
  const { setOpen, setClose } = useLoadingStore()

  // stage
  const { allLand: allLandData, isSuccess } = useGetAllLand()
  const [currentLand, setCurrentLand] = useState<ILandMap | null>(null)
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true)
  const [disable, setDisable] = useState<boolean>(true)
  const [allLand, setAllLand] = useState<ILandMap[]>([])

  // three stage
  const [focus, setFocus] = useState<boolean>(false)
  const [disMove, setDisMove] = useState<boolean>(false)
  const [updateZoom, setUpdateZoom] = useState<boolean>(false)
  const [cameraPos, setCameraPos] = useState({ x: "175", y: "1" })

  const fetchAllLandToPlot = async () => {
    if (isSuccess && allLandData) {
      const newData: ILandMap[] = allLandData.map((item: ILandMap) => {
        item.color = colorThree.land
        return item
      })
      setAllLand(newData)
      setDisable(!disable)
    }
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (loadingStatus) {
        setOpen()
      }
    }
    setClose()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingStatus])

  useEffect(() => {
    let load = false

    if (!load) {
      fetchAllLandToPlot()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLandData])

  useMemo(() => {
    if (currentLand) {
      setCameraPos(currentLand.position)
      // setShowCardLand(true)
      setFocus(!focus)
      setUpdateZoom(true)
      // router.push(
      //   {
      //     query: { x: currentLand.position.x, y: currentLand.position.y }
      //   },
      //   undefined,
      //   { shallow: true }
      // )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLand])

  return (
    <div className="map-content relative flex h-full w-screen flex-col overflow-y-hidden bg-secondary-light">
      <Canvas
        gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
        linear
        camera={{
          position: [0, 0, cameraSetting.maxDis * 3.5]
        }}
      >
        <Suspense fallback={null}>
          <CameraController
            focus={focus}
            setFocus={setFocus}
            dollyState={cameraSetting.doll}
            updated={updateZoom}
            setUpdated={setUpdateZoom}
            dismove={disMove}
            setDismove={setDisMove}
            setting={cameraSetting}
            pos={calculatePosition(cameraPos)}
            full
          />
          {/* <primitive object={new THREE.AxesHelper(10)} /> */}
          {allLandData && allLandData.length > 0 && <MapScene />}
          {allLand &&
            allLand.length > 0 &&
            allLand.map((element, index) => (
              <BoxElement
                key={element._id}
                pos={calculatePosition(element.position)}
                color={element.color ? element.color : colorThree.disable}
                land={element}
                currentLand={currentLand}
                setCurrentLand={setCurrentLand}
                lastBox={allLand.length === index + 1}
                setLoading={setLoadingStatus}
              />
            ))}
          {/* </Suspense> */}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default FullMap

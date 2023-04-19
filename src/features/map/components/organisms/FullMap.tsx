import React, { Suspense, useEffect, useMemo, useState } from "react"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import useGetAllLand from "@feature/land/containers/hooks/useGetAllLand"
import { cameraSetting, colorThree } from "@constants/map"
import { ILandMap } from "@feature/land/interfaces/ILandService"
import useLoadingStore from "@stores/loading"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import BoxElement from "../molecules/BoxElement"
import CameraController from "../molecules/CameraController"
import MapScene from "../molecules/MapScene"
import CardLandMap from "./CardLandMap"
import MapInfo from "../molecules/MapInfo"

const calculatePosition = ({ x, y }: { x: string; y: string }) => ({
  px: Number(x) - 173.5,
  py: Number(y) - 1.5
})

const containerVariants = {
  initial: { x: "100vw", opacity: 0 },
  enter: { x: 0, opacity: 1, duration: 0.5, ease: "easeInOut" },
  exit: { x: 0, opacity: 0, duration: 0.5, ease: "easeInOut" }
}

const FullMap = () => {
  // hook
  const { setOpen, setClose } = useLoadingStore()
  const router = useRouter()

  // state
  const { allLand: allLandData, isSuccess, isLoading } = useGetAllLand()
  const [currentLand, setCurrentLand] = useState<ILandMap | null>(null)
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true)
  const [disable, setDisable] = useState<boolean>(true)
  const [allLand, setAllLand] = useState<ILandMap[]>([])
  const [showCardLand, setShowCardLand] = useState<boolean>(false)
  // const [text, setText] = useState<string | undefined>(undefined)

  // three stage
  const [focus, setFocus] = useState<boolean>(false)
  const [disMove, setDisMove] = useState<boolean>(false)
  const [updateZoom, setUpdateZoom] = useState<boolean>(false)
  const [cameraPos, setCameraPos] = useState({ x: "175", y: "1" })

  const fetchAllLandToPlot = async () => {
    setOpen()
    if (isSuccess && allLandData) {
      const newData: ILandMap[] = allLandData.map((item: ILandMap) => {
        item.color = colorThree.land
        return item
      })
      setAllLand(newData)
      setDisable(!disable)
      setClose()
    }
  }

  const handleCloseCardLandMap = async () => {
    setCurrentLand(null)
    setShowCardLand(false)
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (isLoading || loadingStatus) {
        setOpen()
      }
    }
    setClose()

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

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

  // handle click on map
  useMemo(() => {
    if (currentLand) {
      setCameraPos(currentLand.position)
      setShowCardLand(true)
      setFocus(!focus)
      setUpdateZoom(true)
      router.push(
        {
          query: { x: currentLand.position.x, y: currentLand.position.y }
        },
        undefined,
        { shallow: true }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLand])

  useMemo(() => {
    if (allLand && allLand.length > 0 && router.query) {
      if (router.query.x && router.query.y) {
        const landByXY = allLand.find(
          (element) =>
            element.position.x === router.query.x &&
            element.position.y === router.query.y
        )
        if (landByXY) {
          setCurrentLand(landByXY)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, allLand])

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
      <div>
        {currentLand && (
          <div className="card-land-map-panel animate__fadeInRight">
            <AnimatePresence
              exitBeforeEnter
              initial={false}
            >
              {showCardLand && (
                <motion.div
                  variants={containerVariants}
                  initial="exit"
                  animate="enter"
                  exit="exit"
                  className="relative flex h-full flex-col items-center justify-center"
                >
                  <CardLandMap
                    land={currentLand}
                    onClose={handleCloseCardLandMap}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <MapInfo />
    </div>
  )
}

export default FullMap

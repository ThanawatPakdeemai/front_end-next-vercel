import React, { Suspense, useEffect, useMemo, useState } from "react"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import useGetAllLand from "@feature/land/containers/hooks/useGetAllLand"
import { cameraSetting, colorThree } from "@constants/map"
import { ILandMap } from "@feature/land/interfaces/ILandService"
import useLoadingStore from "@stores/loading"
import { calculatePosition } from "@utils/map"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { Typography } from "@mui/material"
import MenuButtonExpandMobile from "@feature/page/marketplace/mobilescreen/MenuButtonExpandMobile"
import useMarketFilterStore from "@stores/marketFilter"
import Helper from "@utils/helper"
import SwipeableEdgeDrawer from "@feature/marketplace/components/organisms/DrawerMobileFilter"
import BoxElement from "../molecules/BoxElement"
import CameraController from "../molecules/CameraController"
import MapScene from "../molecules/MapScene"
import CardLandMap from "./CardLandMap"
import MapInfo from "../molecules/MapInfo"

const containerVariants = {
  initial: { x: "100vw", opacity: 0 },
  enter: { x: 0, opacity: 1, duration: 0.5, ease: "easeInOut" },
  exit: { x: 0, opacity: 0, duration: 0.5, ease: "easeInOut" }
}

const FullMap = () => {
  // hook
  const { setOpen, setClose } = useLoadingStore()
  const router = useRouter()
  const { filterType, search } = useMarketFilterStore()
  const { getValueFromTKey } = Helper
  const filterCheck = filterType.nft_land

  const tokenId = getValueFromTKey(search, "nft_token") as string
  const sellerId = getValueFromTKey(search, "seller_id") as string

  // state
  const { allLand: allLandData, isSuccess, isLoading } = useGetAllLand()
  const [currentLand, setCurrentLand] = useState<ILandMap | null>(null)
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true)
  const [disable, setDisable] = useState<boolean>(true)
  const [allLand, setAllLand] = useState<ILandMap[]>()
  const [showCardLand, setShowCardLand] = useState<boolean>(false)
  // const [text, setText] = useState<string | undefined>(undefined)

  const [expanded, setExpanded] = useState<boolean>(false)

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }

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

  useMemo(() => {
    if (allLand && allLand.length > 0) {
      const filteredLand = allLand
      if (filterCheck && filterCheck.length > 0) {
        filteredLand.filter((item: ILandMap) => {
          const landFilter = filterCheck.find(
            (element: string) => item.type === element
          )
          if (landFilter) {
            if (search.length > 0) {
              if (item.color) {
                item.color = colorThree.land
              } else {
                item.color = null
              }
            } else {
              item.color = colorThree.land
            }
          } else {
            item.color = null
          }
          return item
        })
      }
      if (tokenId) {
        let landSelected: ILandMap | null = null
        filteredLand.map((item: ILandMap) => {
          if (tokenId === item.land_id) {
            if (filterCheck.length > 0) {
              if (item.color) {
                item.color = colorThree.currentLand
                landSelected = item
              } else {
                item.color = null
              }
            } else {
              item.color = colorThree.currentLand
              landSelected = item
            }
          } else {
            item.color = null
          }
          return item
        })
        landSelected ? setCurrentLand(landSelected) : setCurrentLand(null)
      }
      if (sellerId) {
        filteredLand.filter((item: ILandMap) => {
          if (sellerId === item.wallet_address) {
            if (filterCheck.length > 0) {
              if (item.color) {
                item.color = colorThree.owned
              } else {
                item.color = null
              }
            } else {
              item.color = colorThree.owned
            }
          } else {
            item.color = null
          }
          return item
        })
      }
      if (filterCheck.length <= 0 && search.length <= 0) {
        filteredLand.map((item: ILandMap) => {
          item.color = colorThree.land
          return item
        })
        setCurrentLand(null)
        router.query.x = undefined
        router.query.y = undefined
        setFocus(false)
        setUpdateZoom(false)
      }
      setAllLand(filteredLand)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLand, filterCheck, search.length])

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
    <div className="map-content relative flex h-full w-full flex-col bg-[#0165B6]">
      <div className="absolute top-6 z-10 mt-6 flex h-[200px] w-full justify-center sm:hidden">
        <div className="grid max-w-[400px] justify-center gap-4">
          <div className="flex h-[40px] gap-2">
            <div className="flex !w-[315px] items-center justify-between rounded-lg bg-neutral-800 px-[15px]">
              <Typography className="text-sm uppercase text-white-default">
                NAKAVERSE MAP
              </Typography>
            </div>
            <div className="h-[40pc] w-[40px]">
              <motion.div
                transition={{ type: "spring", stiffness: 100 }}
                animate={{
                  rotate: expanded ? 0 : 180
                }}
                className={`mr-1 grid h-[40px] !w-[40px] content-center justify-items-center rounded-[8px] border p-[7px] ${
                  expanded
                    ? `bg-error-main`
                    : `border-neutral-700 bg-neutral-780`
                }`}
              >
                <MenuButtonExpandMobile
                  isOpen={expanded}
                  onClick={handleOnExpandClick}
                  strokeWidth="2"
                  color="#F1F4F4"
                  transition={{
                    ease: "easeOut",
                    duration: 0.2,
                    stiffness: 10,
                    bounce: 5
                  }}
                  width="20"
                  height="10"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <SwipeableEdgeDrawer open={expanded} />
      {/* <ModalCustom
        open={expanded}
        onClose={handleOnExpandClick}
        className="m-auto gap-3 rounded-[34px] p-[10px] max-[420px]:w-[370px]"
        width={515}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2 uppercase">
            <ModalHeader
              handleClose={handleOnExpandClick}
              title="Filter"
            />
          </div>
          <div className="grid h-[500px] w-full justify-items-center overflow-y-auto">
            <FilterBox />
          </div>
        </Stack>
      </ModalCustom> */}
      {/* ---------- map ---------- */}
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
          {allLandData && allLandData.length > 0 && <MapScene />}
          {isLoading && <MapScene />}
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
        </Suspense>
      </Canvas>
      {/* ---------- card ---------- */}
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
      {/* ---------- info ---------- */}
      <MapInfo />
    </div>
  )
}

export default FullMap

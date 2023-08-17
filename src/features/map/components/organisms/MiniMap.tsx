import { Suspense, useState, useCallback, useEffect } from "react"
import * as three from "three"
import { Canvas } from "@react-three/fiber"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import { cameraSetting, colorMap, colorThree } from "@constants/map"
import { calculatePosition } from "@utils/map"
import { ILandMap } from "@feature/land/interfaces/ILandService"

const GpsFixedIcon = dynamic(() => import("@mui/icons-material/GpsFixed"), {
  suspense: true,
  ssr: false
})
const AddBoxOutlinedIcon = dynamic(
  () => import("@mui/icons-material/AddBoxOutlined"),
  {
    suspense: true,
    ssr: false
  }
)
const IndeterminateCheckBoxOutlinedIcon = dynamic(
  () => import("@mui/icons-material/IndeterminateCheckBoxOutlined"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const CameraController = dynamic(
  () => import("../molecules/CameraController"),
  {
    suspense: true,
    ssr: false
  }
)
const MapScene = dynamic(() => import("../molecules/MapScene"), {
  suspense: true,
  ssr: false
})
const BoxElement = dynamic(() => import("../molecules/BoxElement"), {
  suspense: true,
  ssr: false
})

interface IMinimap {
  pos: {
    x: string
    y: string
  }
  ownerList?: ILandMap[]
  notOwnerList?: ILandMap[]
  currentLand?: ILandMap | null
  setCurrentLand?: (_value: ILandMap | null) => void
  className?: string
}

const MiniMap = ({
  pos,
  className,
  ownerList,
  notOwnerList,
  currentLand,
  setCurrentLand
}: IMinimap) => {
  const [focus, setFocus] = useState<boolean>(false)
  const [updateZoom, setUpdateZoom] = useState<boolean>(false)
  const [dollyState, setDollyState] = useState<number>(cameraSetting.doll)
  const [disMove, setDisMove] = useState<boolean>(false)
  const [showbBtn, setShowBtn] = useState<boolean>(false)
  const router = useRouter()

  const handleCenter = useCallback(() => {
    setFocus((prevFocus) => !prevFocus)
  }, [])

  const handleZoomIn = useCallback(() => {
    setUpdateZoom(true)
    setDollyState(cameraSetting.doll)
  }, [])

  const handleZoomOut = useCallback(() => {
    setUpdateZoom(true)
    setDollyState(-cameraSetting.doll)
  }, [])

  const buttonsControl = [
    {
      id: "id-center",
      onClick: handleCenter,
      icon: <GpsFixedIcon htmlColor="#E1E2E2" />
    },
    {
      id: "id-zoom-in",
      onClick: handleZoomIn,
      icon: <AddBoxOutlinedIcon htmlColor="#E1E2E2" />
    },
    {
      id: "id-zoom-out",
      onClick: handleZoomOut,
      icon: <IndeterminateCheckBoxOutlinedIcon htmlColor="#E1E2E2" />
    }
  ]

  useEffect(() => {
    let load = false

    if (!load) {
      setFocus((prevFocus) => !prevFocus)
      setDollyState(cameraSetting.doll)
      setUpdateZoom(true)
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos])

  return (
    <div
      className={`relative flex ${
        router.asPath.includes("my-land") ? "h-screen" : "h-full"
      }  w-full flex-row sm:h-full sm:w-full ${className}`}
    >
      <Canvas
        gl={{ antialias: true, toneMapping: three.NoToneMapping }}
        linear
        camera={{ position: [0, 0, cameraSetting.minDis] }}
        onCreated={() =>
          setTimeout(() => {
            setShowBtn(true)
          }, 1000)
        }
      >
        <CameraController
          focus={focus}
          setFocus={setFocus}
          dollyState={
            pos.x !== "175" && pos.y !== "1" ? dollyState : -cameraSetting.doll
          }
          updated={updateZoom}
          setUpdated={setUpdateZoom}
          dismove={disMove}
          setDismove={setDisMove}
          setting={cameraSetting}
          pos={calculatePosition(pos)}
        />
        <Suspense fallback={null}>
          <MapScene />
          {ownerList && ownerList.length > 0 ? (
            ownerList.map((_ele, _index) => (
              <BoxElement
                key={_ele._id}
                pos={calculatePosition(_ele.position)}
                color={_ele.color ? _ele.color : colorThree.disable}
                land={_ele}
                currentLand={currentLand}
                setCurrentLand={setCurrentLand}
              />
            ))
          ) : (
            <BoxElement
              pos={calculatePosition(pos)}
              color={colorMap.currentLand}
            />
          )}
          {notOwnerList &&
            notOwnerList.length > 0 &&
            notOwnerList.map((element, _index) => (
              <BoxElement
                key={element._id}
                pos={calculatePosition(element.position)}
                color={colorThree.disable}
                land={element}
              />
            ))}
        </Suspense>
      </Canvas>
      {showbBtn && (
        <Box
          component="div"
          className={
            router.asPath.includes("my-land")
              ? "bottom-[10px] w-full flex-row justify-center gap-6"
              : "bottom-0 right-[10px] h-full flex-col justify-around"
          }
          sx={{
            position: "absolute",
            display: "flex"
          }}
        >
          {buttonsControl.map(({ onClick, icon, id }) => (
            <ButtonIcon
              key={id}
              onClick={onClick}
              className="map-button"
              icon={icon}
            />
          ))}
        </Box>
      )}
    </div>
  )
}

export default MiniMap

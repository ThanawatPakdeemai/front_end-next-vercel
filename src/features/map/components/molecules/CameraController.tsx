import { useFrame, useThree } from "@react-three/fiber"
import { useMemo } from "react"
import * as THREE from "three"
import { cameraSetting } from "@constants/map"
// eslint-disable-next-line import/no-extraneous-dependencies
import CameraControls from "camera-controls"

CameraControls.install({ THREE })

interface IControlsProps {
  focus: boolean
  setFocus: (_value: boolean) => void
  dollyState: number
  updated: boolean
  setUpdated: (_value: boolean) => void
  dismove: boolean
  setDismove: (_value: boolean) => void
  pos: {
    px: number
    py: number
  }
  setting: {
    maxDis: number
    minDis: number
    doll: number
  }
  full?: boolean
}

const CameraController = ({
  focus,
  setFocus,
  dollyState,
  updated,
  setUpdated,
  // dismove,
  // setDismove,
  pos,
  setting,
  full
}: IControlsProps) => {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)

  const controls = useMemo(
    () => new CameraControls(camera, gl.domElement),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  controls.mouseButtons.left = CameraControls.ACTION.TRUCK
  controls.mouseButtons.middle = CameraControls.ACTION.NONE
  controls.mouseButtons.right = CameraControls.ACTION.TRUCK
  controls.touches.one = CameraControls.ACTION.TOUCH_TRUCK
  controls.touches.two = CameraControls.ACTION.TOUCH_DOLLY_TRUCK
  controls.touches.three = CameraControls.ACTION.NONE
  controls.minDistance = full ? setting.minDis * 3 : setting.minDis
  controls.maxDistance = full ? setting.maxDis * 6 : setting.maxDis
  controls.verticalDragToForward = false

  useMemo(() => {
    controls.moveTo(pos.px, pos.py, 1, true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state, delta) => {
    controls.rotate(0, 0, true)
    if (focus) {
      controls.moveTo(pos.px, pos.py, 1, true)
      setFocus(false)
    }
    if (updated) {
      if (full) {
        controls.dollyTo(cameraSetting.minDis * 2, true)
      } else {
        controls.dolly(dollyState, true)
      }
      setUpdated(false)
    }
    state.camera.updateProjectionMatrix()

    controls.update(delta)
  })

  return null
}

export default CameraController

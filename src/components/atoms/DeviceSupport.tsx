import React from "react"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProp {
  type: string
  support: boolean
}

const DeviceSupport = ({ type, support }: IProp) => {
  /**
   * @description check device support
   * @returns icon name
   */
  const checkDeviceSupport = (_type: string): string => {
    if (_type === "mobile" && support) {
      return "icon-Phone-Notch"
    }
    if (_type === "desktop" && support) {
      return "icon-Screen"
    }
    if (_type === "safari" && support) {
      return "icon-safari"
    }
    if (_type === "chrome" && support) {
      return "icon-chrome"
    }
    if (_type === "firefox" && support) {
      return "icon-firefox"
    }
    if (_type === "opera" && support) {
      return "icon-opera"
    }
    if (_type === "edge" && support) {
      return "icon-edge"
    }
    return ""
  }

  return support ? (
    <Icomoon
      className={`mt-[-5px] text-[150%] text-green-lemon ${checkDeviceSupport(
        type
      )}`}
    />
  ) : null
}

export default DeviceSupport

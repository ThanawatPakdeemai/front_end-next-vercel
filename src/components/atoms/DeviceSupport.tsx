import React from "react"
import { Image } from "@components/atoms/image/index"

interface IProp {
  type: string
  support: boolean
}

const DeviceSupport = ({ type, support }: IProp) => {
  const phoneSupport = support
    ? "/assets/icons/social_icon/phoneNotchSuccess.svg"
    : "/assets/icons/social_icon/phoneNotch.svg"
  const desktopSupport = support
    ? "/assets/icons/social_icon/desktopSuccess.svg"
    : "/assets/icons/social_icon/desktop.svg"
  return (
    <>
      {type === "desktop" ? (
        <Image
          id="1"
          key="1"
          src={desktopSupport}
          width={12}
          height={20}
          alt="desktop"
        />
      ) : (
        <Image
          id="2"
          key="2"
          src={phoneSupport}
          width={12}
          height={20}
          alt="mobile"
        />
      )}
    </>
  )
}

export default DeviceSupport

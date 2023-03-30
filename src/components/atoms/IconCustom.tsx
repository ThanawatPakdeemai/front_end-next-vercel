/* eslint-disable no-nested-ternary */
import ChromeIcon from "@components/icons/HowToPlayIcon/ChromeIcon"
import DesktopIcon from "@components/icons/HowToPlayIcon/DesktopIcon"
import EdgeIcon from "@components/icons/HowToPlayIcon/EdgeIcon"
import FirefoxIcon from "@components/icons/HowToPlayIcon/FirefoxIcon"
import MobileIcon from "@components/icons/HowToPlayIcon/MobileIcon"
import OperaIcon from "@components/icons/HowToPlayIcon/OperaIcon"
import SafariIcon from "@components/icons/HowToPlayIcon/SafariIcon"
import React from "react"

export interface IIconCustoms {
  icon_key: string
  support: boolean
}

const IconCustoms = (props: IIconCustoms) => {
  const { icon_key, support } = props

  return (
    <>
      {support ? (
        <>
          {icon_key === "edge" ? (
            <EdgeIcon color={support && "#A0ED61"} />
          ) : icon_key === "firefox" ? (
            <FirefoxIcon color={support && "#A0ED61"} />
          ) : icon_key === "chorm" || icon_key === "chrome" ? (
            <ChromeIcon color={support && "#A0ED61"} />
          ) : icon_key === "safari" ? (
            <SafariIcon color={support && "#A0ED61"} />
          ) : icon_key === "opera" ? (
            <OperaIcon color={support && "#A0ED61"} />
          ) : icon_key === "mobile" ? (
            <MobileIcon color={support && "#A0ED61"} />
          ) : icon_key === "desktop" ? (
            <DesktopIcon color={support && "#A0ED61"} />
          ) : null}
        </>
      ) : null}
    </>
  )
}
export default IconCustoms

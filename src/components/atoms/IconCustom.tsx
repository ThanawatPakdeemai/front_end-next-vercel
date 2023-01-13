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
  name: string
  support: boolean
}

const IconCustoms = (props: IIconCustoms) => {
  const { icon_key, support } = props

  return (
    <>
      {support ? (
        <>
          {icon_key === "edge" ? (
            <EdgeIcon />
          ) : icon_key === "firefox" ? (
            <FirefoxIcon />
          ) : icon_key === "chorm" || icon_key === "chrome" ? (
            <ChromeIcon />
          ) : icon_key === "safari" ? (
            <SafariIcon />
          ) : icon_key === "opera" ? (
            <OperaIcon />
          ) : icon_key === "mobile" ? (
            <MobileIcon />
          ) : icon_key === "desktop" ? (
            <DesktopIcon />
          ) : null}
        </>
      ) : null}
    </>
  )
}
export default IconCustoms

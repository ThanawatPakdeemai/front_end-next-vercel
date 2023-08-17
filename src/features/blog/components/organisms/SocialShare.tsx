import React from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton
} from "react-share"
import dynamic from "next/dynamic"
import { isMobile } from "@hooks/useGlobal"

const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
  ssr: false
})
const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

export interface ISocialShareProps {
  shareTitle: string
  shareURL: string
  shareHeading?: string
  hideTwitter?: boolean
  hideFacebook?: boolean
  hideTelegram?: boolean
  variant?: "large" | "small"
}

const SocialShare = ({
  shareHeading = "Share :",
  shareTitle,
  shareURL,
  hideTwitter = false,
  hideFacebook = false,
  hideTelegram = false,
  variant = "small"
}: ISocialShareProps) => {
  const classes =
    variant === "large"
      ? "m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-error-main border-opacity-40"
      : "flex h-[40px] w-[40px] items-center justify-center !fill-white-default"

  const fillColor = variant === "large" ? "#F42728" : "#ffffff"

  return (
    <div className="mx-12 flex items-center">
      {!isMobile && (
        <>
          {shareHeading && (
            <Typography className="mr-4 font-neue-machina text-default text-neutral-100">
              {shareHeading}
            </Typography>
          )}
        </>
      )}
      <div className="flex text-sm">
        {!hideTwitter && (
          <TwitterShareButton
            url={shareTitle}
            title={shareURL}
            hashtags={["nakamoto"]}
          >
            <ButtonIcon
              whileHover="hover"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 4
              }}
              icon={<Icomoon className={`icon-twitter text-[${fillColor}]`} />}
              className={classes}
            />
          </TwitterShareButton>
        )}

        {!hideFacebook && (
          <FacebookShareButton
            url={shareTitle}
            quote={shareURL}
            hashtag="#nakamoto"
          >
            <ButtonIcon
              whileHover="hover"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 4
              }}
              icon={<Icomoon className={`icon-Facebook text-[${fillColor}]`} />}
              className={classes}
            />
          </FacebookShareButton>
        )}

        {!hideTelegram && (
          <TelegramShareButton
            url={shareTitle}
            title={shareURL}
          >
            <ButtonIcon
              whileHover="hover"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 4
              }}
              icon={<Icomoon className={`icon-telegram text-[${fillColor}]`} />}
              className={classes}
            />
          </TelegramShareButton>
        )}
      </div>
    </div>
  )
}

export default SocialShare

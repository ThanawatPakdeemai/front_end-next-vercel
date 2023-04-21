import React from "react"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton
} from "react-share"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"
import TelegramIcon from "@components/icons/SocialIcon/TelegramIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import { Typography } from "@mui/material"

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
      {shareHeading && (
        <Typography className="mr-4 font-neue-machina text-default text-neutral-100">
          {shareHeading}
        </Typography>
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
              icon={<TwitterIcon fill={fillColor} />}
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
              icon={<FacebookIcon fill={fillColor} />}
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
              icon={<TelegramIcon fill={fillColor} />}
              className={classes}
            />
          </TelegramShareButton>
        )}
      </div>
    </div>
  )
}

export default SocialShare

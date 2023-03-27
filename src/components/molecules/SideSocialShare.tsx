import ButtonIcon from "@components/atoms/button/ButtonIcon"
import CONFIGS from "@configs/index"
// import { SOCIAL_SHARE } from "@configs/socialShare"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import { Typography } from "@mui/material"
import Helper from "@utils/helper"
import { useRouter } from "next/router"
import React from "react"
import { v4 as uuidv4 } from "uuid"
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton
} from "react-share"
import LinkIcon from "@components/icons/LinkIcon"
import TelegramIcon from "@components/icons/SocialIcon/TelegramIcon"
import TwitterIcon from "@components/icons/SocialIcon/TwitterIcon"
import FacebookIcon from "@components/icons/SocialIcon/FacebookIcon"

interface IProp {
  hidden?: string
}

const SideSocialShare = ({ hidden }: IProp) => {
  const router = useRouter()
  const { successToast } = useToast()
  const classStyle =
    "my-2 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-red-card/20"

  return (
    <div className={`${hidden} sticky top-[202px]`}>
      <div className="absolute top-0 right-[-10%] rounded-[18px] border border-neutral-800 px-2 ">
        <div className="flex flex-col items-center">
          <Typography
            sx={{
              textOrientation: "sideways",
              writingMode: "vertical-lr"
            }}
            className="my-6 font-bold text-red-card"
          >
            SHARE PLAYER CARD
          </Typography>
          <div className="grid">
            <TelegramShareButton
              url={CONFIGS.BASE_URL.FRONTEND + router.asPath}
              title="My Profile"
              key={uuidv4()}
            >
              <ButtonIcon
                whileHover="hover"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 4
                }}
                icon={<TelegramIcon fill="#F42728" />}
                className={classStyle}
              />
            </TelegramShareButton>
            <TwitterShareButton
              url={CONFIGS.BASE_URL.FRONTEND + router.asPath}
              title="My Profile"
              hashtags={["nakamoto"]}
              key={uuidv4()}
            >
              <ButtonIcon
                whileHover="hover"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 4
                }}
                icon={<TwitterIcon fill="#F42728" />}
                className={classStyle}
              />
            </TwitterShareButton>
            <FacebookShareButton
              url={CONFIGS.BASE_URL.FRONTEND + router.asPath}
              quote="My Profile"
              hashtag="#nakamoto"
              key={uuidv4()}
            >
              <ButtonIcon
                whileHover="hover"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 4
                }}
                icon={<FacebookIcon fill="#F42728" />}
                className={classStyle}
              />
            </FacebookShareButton>

            <ButtonIcon
              whileHover="hover"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 4
              }}
              icon={
                <LinkIcon
                  stroke="#F42728"
                  className="!rotate-[-17deg] !text-error-main"
                />
              }
              onClick={() => {
                Helper.copyClipboard(CONFIGS.BASE_URL.FRONTEND + router.asPath)
                successToast(MESSAGES.copy)
              }}
              className={classStyle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideSocialShare

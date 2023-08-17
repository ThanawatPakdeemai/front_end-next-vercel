import { Typography } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { v4 as uuidv4 } from "uuid"
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton
} from "react-share"
import { useTranslation } from "react-i18next"

import dynamic from "next/dynamic"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import CONFIGS from "@configs/index"

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

interface IProp {
  hidden?: string
}

const SideSocialShare = ({ hidden }: IProp) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { successToast } = useToast()
  const classStyle =
    "my-2 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-red-card/20 text-[#F42728]"

  return (
    <div className={`${hidden} sticky top-[202px]`}>
      <div className="absolute right-[-10%] top-0 rounded-[18px] border border-neutral-800 px-2 ">
        <div className="flex flex-col items-center">
          <Typography
            sx={{
              textOrientation: "sideways",
              writingMode: "vertical-lr"
            }}
            className="my-6 font-bold uppercase text-red-card"
          >
            {t("share_player_card")}
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
                icon={<Icomoon className="icon-telegram" />}
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
                icon={<Icomoon className="icon-twitter" />}
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
                icon={<Icomoon className="icon-Facebook" />}
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
              icon={<Icomoon className="icon-Link" />}
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

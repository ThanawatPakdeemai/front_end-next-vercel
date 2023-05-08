import React, { useState } from "react"
import ShareIcon from "@components/icons/HowToPlayIcon/ShareIcon"
import { Box, Button, Stack } from "@mui/material"
import { useTranslation } from "react-i18next"
import usetournament from "@feature/tournament/containers/hooks/usetournament"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import { iconmotion } from "@components/organisms/Footer"
import { useRouter } from "next/router"
import { useToast } from "@feature/toast/containers"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import useShareToEarn from "@feature/game/containers/hooks/useShareToEarn"
import Helper from "@utils/helper"
import { ELocalKey } from "@interfaces/ILocal"
import { MESSAGES } from "@constants/messages"
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined"
import LinkIcon from "@components/icons/LinkIcon"
import ButtonIcon from "./button/ButtonIcon"

interface IProps {
  id: string
}

const ShareToEarn = (props: IProps) => {
  const router = useRouter()
  const { successToast, errorToast } = useToast()
  const { stateProfile } = useGlobal()
  const { handleOpen, handleClose, openForm } = usetournament()
  const { mutateShareToEarn } = useShareToEarn()
  const { t } = useTranslation()

  const uniqueId = Math.random().toString(36).substring(2, 9)
  const uniqueIdLocal = Helper.getLocalStorage(ELocalKey.shareToEarnCode)

  const linkUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${router.asPath}?af${uniqueIdLocal}`

  const [showCopy, setShowCopy] = useState(false)

  const onCloseModalCustom = () => {
    handleClose()
    setShowCopy(false)
  }

  const handleShareToEarnLink = (
    _playerId: string,
    _gameId: string,
    _codeId: string
  ) => {
    mutateShareToEarn({
      player_id: _playerId,
      game_id: _gameId,
      code: _codeId
    })
      .then((_res) => {
        if (_res) {
          Helper.setLocalStorage({
            key: ELocalKey.shareToEarnCode,
            value: _codeId
          })
          successToast(MESSAGES.share_success)
          setShowCopy(true)
        }
      })
      .catch(() => {
        errorToast(MESSAGES.share_not_success)
      })
  }

  return (
    <>
      {isMobile ? (
        <ShareIcon onClick={handleOpen} />
      ) : (
        <div className="flex items-center justify-end ">
          <Button
            className="md flex !min-w-[6.25rem] flex-[1_1_150px] items-center justify-center text-sm text-neutral-400 md:flex-none"
            onClick={() => handleOpen()}
          >
            <ShareIcon
              color="#FFFFFF"
              className="mr-2"
            />
            {t("share")}
          </Button>
        </div>
      )}
      <ModalCustom
        open={openForm}
        onClose={onCloseModalCustom}
        className="m-auto gap-3 rounded-[34px] p-[10px] max-[420px]:w-[370px]"
        width={515}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2 uppercase">
            <ModalHeader
              handleClose={onCloseModalCustom}
              title={t("share")}
            />
          </div>
          <Box
            component="div"
            className={`hide-scroll flex  w-full flex-col overflow-y-scroll ${
              showCopy ? "h-[220px]" : "h-[115px]"
            }`}
          >
            <div className="mx-auto my-0 text-center">
              {stateProfile && (
                <ButtonIcon
                  variants={iconmotion}
                  whileHover="hover"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 4
                  }}
                  icon={<LinkIcon className="rotate-[140deg]" />}
                  className="m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                  onClick={() =>
                    handleShareToEarnLink(stateProfile.id, props?.id, uniqueId)
                  }
                />
              )}
            </div>
            <p className="mt-5 text-sm">{t("share_desc")}</p>
            <div className="my-4 flex flex-col items-center justify-center text-center">
              {showCopy && (
                <div className="my-4 flex w-full items-center justify-center border-t-2 border-[#252525] pt-2 text-center ">
                  <p className="text-sm">{Helper.textWithDots(linkUrl, 25)}</p>
                  <ButtonIcon
                    onClick={() => {
                      Helper.copyClipboard(linkUrl)
                      successToast("Copy success!")
                    }}
                    className=" m-1 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                    icon={<ContentCopyOutlinedIcon />}
                  />
                </div>
              )}
            </div>
          </Box>
        </Stack>
      </ModalCustom>
      <ModalCustom
        open={openForm}
        onClose={onCloseModalCustom}
        className="m-auto gap-3 rounded-[34px] p-[10px] max-[420px]:w-[370px]"
        width={515}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2 uppercase">
            <ModalHeader
              handleClose={onCloseModalCustom}
              title={t("share")}
            />
          </div>
          <Box
            component="div"
            className={`hide-scroll flex  w-full flex-col overflow-y-scroll ${
              showCopy ? "h-[220px]" : "h-[115px]"
            }`}
          >
            <div className="mx-auto my-0 text-center">
              {stateProfile && (
                <ButtonIcon
                  variants={iconmotion}
                  whileHover="hover"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 4
                  }}
                  icon={<LinkIcon className="rotate-[140deg]" />}
                  className="m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                  onClick={() =>
                    handleShareToEarnLink(stateProfile.id, props?.id, uniqueId)
                  }
                />
              )}
            </div>
            <p className="mt-5 text-sm">{t("share_desc")}</p>
            <div className="my-4 flex flex-col items-center justify-center text-center">
              {showCopy && (
                <div className="my-4 flex w-full items-center justify-center border-t-2 border-[#252525] pt-2 text-center ">
                  <p className="text-sm">{Helper.textWithDots(linkUrl, 25)}</p>
                  <ButtonIcon
                    onClick={() => {
                      Helper.copyClipboard(linkUrl)
                      successToast("Copy success!")
                    }}
                    className=" m-1 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                    icon={<ContentCopyOutlinedIcon />}
                  />
                </div>
              )}
            </div>
          </Box>
        </Stack>
      </ModalCustom>
    </>
  )
}

export default ShareToEarn

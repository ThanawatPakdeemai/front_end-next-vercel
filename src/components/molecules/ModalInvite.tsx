/* eslint-disable max-len */
import ButtonClose from "@components/atoms/button/ButtonClose"
import ButtonLink from "@components/atoms/button/ButtonLink"
import CopyIcon from "@components/icons/CopyIcon"
import LinkIcon from "@components/icons/LinkIcon"
import { Box, Typography } from "@mui/material"
import React, { useState } from "react"
// import ButtonToggleIcon from "./gameSlide/ButtonToggleIcon"
import PlusOutlineIcon from "@components/icons/PlusOutlineIcon"
import { useRouter } from "next/router"
import CONFIGS from "@configs/index"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import { ModalCustom } from "./Modal/ModalCustom"

const ModalInvite = () => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const { successToast } = useToast()
  // eslint-disable-next-line no-unused-vars
  const handleOpen = () => {
    setOpen(true)
  }
  const urlInvite = `${CONFIGS.BASE_URL.FRONTEND}${router.asPath}`
  const handleClose = () => setOpen(false)

  // const location = useRouter()
  // const searchParams = new URLSearchParams(location.pathname)
  // const lang = searchParams.get("lang")

  // const link =
  //   `${baseUrl.baseSite}/${gameObject.path}/roomLists/${
  //     gameObject.play_to_earn ? "" : item_size
  //   }?search=${code}` +
  //   `${lang !== "en" && lang !== null ? `&lang=${lang}` : ""}`

  return (
    <>
      {/* <ButtonToggleIcon
        handleClick={handleOpen}
        startIcon=""
        text="Invite"
        className="btn-rainbow-theme z-[2] h-[50px] w-[156px] bg-secondary-main font-bold capitalize text-white-primary"
        type="button"
      /> */}
      <Typography
        onClick={() => {
          handleOpen()
        }}
      >
        <PlusOutlineIcon className="mr-[15px] cursor-pointer" />
      </Typography>
      <ModalCustom
        open={open}
        onClose={handleClose}
        width={353}
      >
        <div className="flex w-full flex-col gap-y-[20px]">
          <Box
            component="div"
            className="flex items-center rounded-lg bg-neutral-800 pr-[7px]"
            sx={{ height: "54px" }}
          >
            <div className="flex flex-1 flex-row items-center">
              <Typography className="pl-[22px] uppercase text-neutral-300">
                Invite
              </Typography>
            </div>
            <ButtonClose onClick={handleClose} />
          </Box>
          <div>
            <Typography className="mb-2 text-[10px] uppercase text-black-default">
              Invite Link
            </Typography>
            <Box
              component="div"
              className="flex items-center overflow-hidden rounded-lg bg-neutral-800 pr-[7px]"
              sx={{ height: "40px" }}
            >
              <div className="mx-[16px] my-[10px] flex  flex-row">
                <LinkIcon />
                <Typography className=" ml-[10px] w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-default">
                  <span>{urlInvite}</span>
                  {/* <span>{`${`${link.substring(22, 55)}...`}`}</span> */}
                </Typography>
              </div>
            </Box>
          </div>
          <div className="flex w-full justify-center rounded-2xl  border border-black-200">
            <ButtonLink
              className="h-[40px] w-full text-sm"
              href=""
              onClick={() => {
                Helper.copyClipboard(urlInvite)
                successToast(MESSAGES.copy_text_success)
              }}
              text="Copy Link"
              size="medium"
              variant="contained"
              icon={<CopyIcon />}
            />
          </div>
        </div>
      </ModalCustom>
    </>
  )
}
export default ModalInvite

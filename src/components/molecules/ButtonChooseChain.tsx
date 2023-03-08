import ButtonIcon from "@components/atoms/button/ButtonIcon"
import React, { useState } from "react"
import SyncAltIcon from "@mui/icons-material/SyncAlt"
import { CHAIN_SUPPORT } from "@configs/chain"
import { Box, Typography } from "@mui/material"
import CircleNakaIcon from "@components/icons/CircleNakaIcon"
import ButtonClose from "@components/atoms/button/ButtonClose"
import { TokenSupport } from "@feature/wallet/containers/hooks/useWalletContoller"
import TabMenu from "./TabMenu"
import { ModalCustom } from "./Modal/ModalCustom"

const iconmotion = {
  hover: {
    scale: 1.2,
    rotate: 17,
    ease: "easeIn",
    transition: {
      duration: 0.4,
      stiffness: 500,
      type: "spring"
    }
  }
}

interface IButtonChooseChain {
  currentChain: TokenSupport
}

const ButtonChooseChain = ({ currentChain }: IButtonChooseChain) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box
        component="button"
        sx={{
          boxShadow:
            "0px 1px 1px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.05), inset 0px -1px 1px rgba(0, 0, 0, 0.25)"
        }}
        className="mb-[5px] flex items-center justify-between rounded-sm bg-neutral-700 p-1"
        onClick={handleOpen}
      >
        <div className="flex h-[40px] flex-1 items-center rounded-lg border border-neutral-700 bg-neutral-900 px-3">
          {CHAIN_SUPPORT.find((item) => item.link === currentChain)?.icon}
          <p className="ml-6 text-sm font-bold text-white-primary">
            {CHAIN_SUPPORT.find((item) => item.link === currentChain)?.title}
          </p>
        </div>
        <ButtonIcon
          variants={iconmotion}
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 4 }}
          icon={
            <SyncAltIcon className="h-[20px] w-[20px] rotate-90 text-white-primary" />
          }
          className="ml-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900"
        />
      </Box>
      <ModalCustom
        open={open}
        onClose={handleClose}
        className="gap-3 rounded-[34px] p-[10px]"
        width={400}
      >
        <>
          <Box
            className="flex items-center rounded-lg bg-neutral-800 pl-5"
            sx={{ height: "54px" }}
          >
            <div className="flex flex-1 flex-row items-center">
              <CircleNakaIcon />
              <Typography className="pl-[15px] uppercase text-neutral-300">
                Sellect Chain
              </Typography>
            </div>
            <ButtonClose onClick={handleClose} />
          </Box>
          {CHAIN_SUPPORT.map((ele) => (
            <Box
              key={ele.title}
              onClick={handleClose}
            >
              <TabMenu
                icon={ele.icon}
                text={ele.title}
                link={`/wallet?token=${ele.link}`}
                className="mt-4 p-2"
                selected={ele.link === currentChain}
              />
            </Box>
          ))}
        </>
      </ModalCustom>
    </>
  )
}

export default ButtonChooseChain

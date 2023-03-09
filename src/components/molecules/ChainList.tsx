import React, { useState } from "react"
import { CHAIN_SUPPORT, IChainList } from "@configs/chain"
import { Box } from "@mui/material"
import TabMenu from "./TabMenu"
import { ModalCustom } from "./Modal/ModalCustom"
import TokenListItem from "./TokenListItem"

interface IButtonChooseChain {
  currentChain: IChainList
}

const ChainList = ({ currentChain }: IButtonChooseChain) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <TokenListItem
        icon={
          CHAIN_SUPPORT.find((item) => item.link === currentChain.link)?.icon
        }
        text={
          CHAIN_SUPPORT.find((item) => item.link === currentChain.link)?.title
        }
        handleClick={handleOpen}
        shadow
      />
      <ModalCustom
        open={open}
        onClose={handleClose}
        className="gap-3 rounded-[34px] p-[10px]"
        width={400}
        title="Choose Chain"
      >
        <>
          {CHAIN_SUPPORT.map((ele) => (
            <Box
              key={ele.title}
              onClick={handleClose}
            >
              <TabMenu
                icon={ele.icon}
                text={ele.title}
                link={`wallet/?token=${ele.link}`}
                className="mt-4 p-2"
                selected={ele.link === currentChain.link}
              />
            </Box>
          ))}
        </>
      </ModalCustom>
    </>
  )
}

export default ChainList

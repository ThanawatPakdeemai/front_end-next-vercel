import React, { useState } from "react"
import { CHAIN_SUPPORT, IChainList } from "@configs/chain"
import { Box } from "@mui/material"
import useChainSupportStore from "@stores/chainSupport"
import { useWeb3Provider } from "@providers/Web3Provider"
import TabMenu from "./TabMenu"
import { ModalCustom } from "./Modal/ModalCustom"
import TokenListItem from "./TokenListItem"

interface IButtonChooseChain {
  currentTabChainSelected: IChainList
}

const ChainList = ({ currentTabChainSelected }: IButtonChooseChain) => {
  const { setCurrentChainConnected } = useChainSupportStore()
  const { switchNetwork } = useWeb3Provider()
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onSelectedChain = (_selectedItem: IChainList) => {
    setCurrentChainConnected(_selectedItem.chainId)
    if (switchNetwork) {
      switchNetwork(_selectedItem.chainId)
    }
  }

  return (
    <>
      <TokenListItem
        icon={
          CHAIN_SUPPORT.find(
            (item) => item.link === currentTabChainSelected.link
          )?.icon
        }
        title="Chain"
        text={
          CHAIN_SUPPORT.find(
            (item) => item.link === currentTabChainSelected.link
          )?.title
        }
        handleClick={handleOpen}
        shadow
        widthBalance="w-full"
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
                handleClick={() => onSelectedChain(ele)}
                icon={ele.icon}
                text={ele.title}
                className="mt-4 p-2"
                selected={ele.link === currentTabChainSelected.link}
              />
            </Box>
          ))}
        </>
      </ModalCustom>
    </>
  )
}

export default ChainList

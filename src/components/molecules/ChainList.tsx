import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { CHAIN_SUPPORT, IChainList } from "@configs/chain"
import useChainSupportStore from "@stores/chainSupport"
import { useWeb3Provider } from "@providers/Web3Provider"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"

const TabMenu = dynamic(() => import("@components/molecules/TabMenu"))
const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom")
)
const TokenListItem = dynamic(
  () => import("@components/molecules/TokenListItem")
)

const ChainList = () => {
  const { setCurrentChainConnected, currentChainSelected } =
    useChainSupportStore()
  const { setTabChainList, tabChainList } = useWalletContoller()
  const { switchNetwork } = useWeb3Provider()
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onSelectedChain = (_selectedItem: IChainList) => {
    setCurrentChainConnected(_selectedItem.chainId)
    setTabChainList(_selectedItem)
    if (switchNetwork) {
      switchNetwork(_selectedItem.chainId)
    }
  }

  /**
   * @description Set type tab by router.query
   */
  useEffect(() => {
    let load = false

    if (!load) {
      const _currentChain = CHAIN_SUPPORT.find(
        (item) => item.chainId === currentChainSelected
      )
      if (_currentChain) {
        setTabChainList(_currentChain as IChainList)
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChainSelected])

  return (
    <>
      <TokenListItem
        icon={
          CHAIN_SUPPORT.find((item) => item.chainId === tabChainList.chainId)
            ?.icon
        }
        title="Chain"
        text={
          CHAIN_SUPPORT.find((item) => item.chainId === tabChainList.chainId)
            ?.title
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
              component="div"
              key={ele.title}
              onClick={handleClose}
            >
              <TabMenu
                handleClick={() => onSelectedChain(ele)}
                icon={ele.icon}
                text={ele.title}
                className="mt-4 p-2"
                selected={ele.chainId === tabChainList.chainId}
              />
            </Box>
          ))}
        </>
      </ModalCustom>
    </>
  )
}

export default ChainList

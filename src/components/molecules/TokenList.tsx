import React, { ReactNode, useState } from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import { IChainList } from "@configs/chain"
import useChainSupportStore from "@stores/chainSupport"

const ModalCustom = dynamic(() => import("./Modal/ModalCustom"), {
  suspense: true,
  ssr: false
})
const TabMenu = dynamic(() => import("./TabMenu"), {
  suspense: true,
  ssr: false
})
const TokenListItem = dynamic(() => import("./TokenListItem"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface ITokenList {
  dataList: ITokenContract[]
  currentTabChainSelected: IChainList
  currentTokenSelected: string
  displayBalance?: boolean
  widthBalance?: string
}

const TokenList = ({
  dataList,
  currentTabChainSelected,
  currentTokenSelected,
  displayBalance = false,
  widthBalance = "w-[40px]"
}: ITokenList) => {
  const { setCurrentTokenSelected } = useChainSupportStore()

  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSelectToken = (token: ITokenContract) => {
    setCurrentTokenSelected(token)
  }

  /**
   * @description get token icon
   * @returns {ReactNode}
   */
  const tokenIcon = (): ReactNode => {
    if (currentTabChainSelected && currentTabChainSelected.link === "NAKA") {
      return <Icomoon className="icon-Naka text-error-main" />
    }
    return <Icomoon className="icon-busd" />
  }

  /**
   * @description handle select token
   * @returns {string | "N/A"}
   */
  const handleDisplayToken = (): string | "N/A" => {
    if (dataList.find((item) => item.symbol === currentTokenSelected)?.symbol) {
      return (
        dataList.find((item) => item.symbol === currentTokenSelected)?.symbol ||
        "N/A"
      )
    }
    return "N/A"
  }

  const handleDisplayBalance = () => {
    if (
      dataList.find((item) => item.symbol === currentTokenSelected)
        ?.balanceVault.text
    ) {
      return dataList.find((item) => item.symbol === currentTokenSelected)
        ?.balanceVault.text
    }
    return "N/A"
  }

  const handleDisplayTokenName = (): string | "" | undefined => {
    if (dataList.find((item) => item.symbol === currentTokenSelected)?.symbol) {
      return dataList.find((item) => item.symbol === currentTokenSelected)
        ?.symbol
    }
    return ""
  }

  return (
    <>
      <TokenListItem
        icon={tokenIcon()}
        text={`${
          displayBalance ? handleDisplayBalance() : handleDisplayToken()
        }`}
        title={handleDisplayTokenName()}
        handleClick={handleOpen}
        shadow
        widthBalance={widthBalance}
      />
      <ModalCustom
        open={open}
        onClose={handleClose}
        title="Select Asset"
        className="z-[99999] w-full gap-3 rounded-[34px] p-[10px] md:w-auto"
        width={400}
      >
        <>
          {dataList.map((token) => (
            <Box
              component="div"
              key={token.address}
              onClick={handleClose}
            >
              <TabMenu
                icon={tokenIcon()}
                text={token.tokenName}
                className="mt-4 p-2"
                handleClick={() => handleSelectToken(token)}
              />
            </Box>
          ))}
        </>
      </ModalCustom>
    </>
  )
}

export default TokenList

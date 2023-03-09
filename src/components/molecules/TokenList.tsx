import React, { ReactNode, useState } from "react"
import { Box } from "@mui/material"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import { IChainList } from "@configs/chain"
import { ModalCustom } from "./Modal/ModalCustom"
import TabMenu from "./TabMenu"
import TokenListItem from "./TokenListItem"

interface ITokenList {
  dataList: ITokenContract[]
  currentChain: IChainList
  currentTokenSelected: string
  displayBalance?: boolean
}

const TokenList = ({
  dataList,
  currentChain,
  currentTokenSelected,
  displayBalance = false
}: ITokenList) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  /**
   * @description get token icon
   * @returns {ReactNode}
   */
  const tokenIcon = (): ReactNode => {
    if (currentChain.link === "NAKA") {
      return <INaka />
    }
    return <IBusd />
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

  return (
    <>
      <TokenListItem
        icon={tokenIcon()}
        text={`${
          displayBalance ? handleDisplayBalance() : handleDisplayToken()
        }`}
        handleClick={handleOpen}
        shadow
      />
      <ModalCustom
        open={open}
        onClose={handleClose}
        title="Select Chain"
        className="gap-3 rounded-[34px] p-[10px]"
        width={400}
      >
        <>
          {dataList.map((token) => (
            <Box
              key={token.address}
              onClick={handleClose}
            >
              <TabMenu
                icon={tokenIcon()}
                text={token.tokenName}
                link={`?token=${token.symbol}`}
                className="mt-4 p-2"
              />
            </Box>
          ))}
        </>
      </ModalCustom>
    </>
  )
}

export default TokenList

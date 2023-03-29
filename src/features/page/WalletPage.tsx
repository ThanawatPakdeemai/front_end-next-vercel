import Gas from "@components/molecules/Gas"
import React, { useEffect } from "react"
import MetamaskWallet from "@components/molecules/balance/MetamaskWallet"
import useProfileStore from "@stores/profileStore"
import TransactionTable from "@feature/transaction/components/molecules/TransactionTable"
import useGlobal from "@hooks/useGlobal"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import CONFIGS from "@configs/index"
import { useRouter } from "next/router"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useSwitchNetwork from "@hooks/useSwitchNetwork"
import WalletContent from "@feature/wallet/components/organisms/WalletContent"
import ChainList from "@components/molecules/ChainList"
import TokenList from "@components/molecules/TokenList"
import { CHAIN_SUPPORT, IChainList } from "@configs/chain"
import { useWeb3Provider } from "@providers/Web3Provider"
import Helper from "@utils/helper"
import useChainSupportStore from "@stores/chainSupport"

export default function WalletPage() {
  const { hydrated } = useGlobal()
  const {
    value,
    setDisabled,
    handleConnectWallet,
    tabChainList,
    setTabChainList
  } = useWalletContoller()
  const { handleSwitchNetwork, setIsWrongNetwork, isWrongNetwork } =
    useSwitchNetwork()
  const {
    isConnected,
    chainId,
    handleDisconnectWallet,
    handleConnectWithMetamask,
    address
  } = useWeb3Provider()

  const router = useRouter()
  const { token } = router.query
  const { profile } = useProfileStore()
  const { chainSupport, currentChainSelected, currentTokenSelected } =
    useChainSupportStore()

  /**
   * @description check disabled button
   * @returns {boolean}
   */
  const isDisabledButton = (): boolean => {
    if (value === 0) return true
    if (value <= (currentTokenSelected as ITokenContract).balanceWallet.digit)
      return false
    return true
  }

  /**
   * @description set disabled button
   */
  useEffect(() => {
    let load = false

    if (!isConnected) return
    if (!load) setDisabled(isDisabledButton())

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, tabChainList, isConnected])

  /**
   * @description Set type tab by router.query
   */
  useEffect(() => {
    let load = false

    if (!load) {
      const _currentChain = CHAIN_SUPPORT.find(
        (item) => item.chainId === chainId
      )
      if (_currentChain) {
        setTabChainList(_currentChain as IChainList)
      }

      if (!isConnected) return
      if (token === "NAKA") {
        // setType("NAKA")
        const _chainTarget = CHAIN_SUPPORT.find((item) => item.link === "NAKA")
        setTabChainList(_chainTarget as IChainList)
        setIsWrongNetwork(chainId !== CONFIGS.CHAIN.CHAIN_ID_HEX)
        router.push("?token=NAKA")
      } else if (token === "BNB") {
        // setType("BNB")
        const _chainTarget = CHAIN_SUPPORT.find((item) => item.link === "BNB")
        setTabChainList(_chainTarget as IChainList)
        setIsWrongNetwork(chainId !== CONFIGS.CHAIN.CHAIN_ID_HEX_BNB)
        router.push("?token=BNB")
      }
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, chainId, tabChainList])

  return hydrated ? (
    <>
      <div className="mt-2 w-full gap-2 sm:flex md:mt-0 xl:max-w-[570px] xl:justify-between">
        <div className="md:min-w-[327px]">
          <ChainList currentTabChainSelected={tabChainList as IChainList} />
        </div>
        <div className="md:min-w-[224px]">
          {isConnected && (
            <TokenList
              dataList={chainSupport}
              currentTabChainSelected={
                CHAIN_SUPPORT.find(
                  (item) => item.chainId === currentChainSelected
                ) as IChainList
              }
              currentTokenSelected={
                currentTokenSelected?.symbol || chainSupport[0]?.symbol
              }
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 lg:flex-nowrap">
        <div className="flex flex-1 flex-wrap justify-center gap-4 lg:max-w-[570px] xl:w-full xl:justify-end">
          <div className="my-2 h-full flex-[1_1_calc(100%-200px)] items-center justify-center rounded-default bg-neutral-800 p-2 md:my-0 md:min-h-[360px] md:p-0 xl:w-[570px]">
            <WalletContent
              handleConnectWithMetamask={handleConnectWithMetamask}
              isWrongNetwork={isWrongNetwork}
              type={(tabChainList as IChainList).link}
              handleSwitchNetwork={
                tabChainList?.link === "NAKA"
                  ? () =>
                      handleSwitchNetwork(CONFIGS.CHAIN.CHAIN_ID_HEX as string)
                  : () =>
                      handleSwitchNetwork(
                        CONFIGS.CHAIN.CHAIN_ID_HEX_BNB as string
                      )
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 rounded-default bg-neutral-800">
          <Gas type={tabChainList?.link} />
        </div>
        <MetamaskWallet
          handleConnectWallet={handleConnectWallet}
          handleOnDisconnectWallet={handleDisconnectWallet}
          blockExplorerUrls={
            Helper.getNetwork?.(chainId as string)
              ?.blockExplorerUrls as string[]
          }
          chainSupport={chainSupport}
          currentTokenSelected={(token as string) || chainSupport[0]?.symbol}
          currentChainSelected={tabChainList as IChainList}
          address={address}
        />
      </div>
      <TransactionTable profile={profile.data} />
    </>
  ) : (
    <></>
  )
}

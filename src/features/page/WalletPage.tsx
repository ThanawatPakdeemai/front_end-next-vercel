import React, { useEffect } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import CONFIGS from "@configs/index"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useSwitchNetwork from "@hooks/useSwitchNetwork"
import { CHAIN_SUPPORT, IChainList } from "@configs/chain"
import { useWeb3Provider } from "@providers/Web3Provider"
import Helper from "@utils/helper"
import useChainSupportStore from "@stores/chainSupport"

const Gas = dynamic(() => import("@components/molecules/Gas"), {
  suspense: true,
  ssr: false
})
const MetamaskWallet = dynamic(
  () => import("@components/molecules/balance/MetamaskWallet"),
  {
    suspense: true,
    ssr: false
  }
)
const TransactionTable = dynamic(
  () => import("@feature/transaction/components/molecules/TransactionTable"),
  {
    suspense: true,
    ssr: false
  }
)
const WalletContent = dynamic(
  () => import("@feature/wallet/components/organisms/WalletContent"),
  {
    suspense: true,
    ssr: false
  }
)
const ChainList = dynamic(() => import("@components/molecules/ChainList"), {
  suspense: true,
  ssr: false
})
const TokenList = dynamic(() => import("@components/molecules/TokenList"), {
  suspense: true,
  ssr: false
})

export default function WalletPage() {
  const { hydrated } = useGlobal()
  const { value, setDisabled, handleConnectWallet, tabChainList } =
    useWalletContoller()
  const { handleSwitchNetwork, isWrongNetwork } = useSwitchNetwork()
  const { isConnected, chainId, handleDisconnectWallet, address } =
    useWeb3Provider()

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
    if (
      Number(value) <=
      Number((currentTokenSelected as ITokenContract).balanceWallet.digit)
    )
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
  }, [isConnected])

  return hydrated ? (
    <>
      <div className="mt-2 w-full gap-2 sm:flex md:mt-0 xl:max-w-[570px] xl:justify-between">
        <div className="md:min-w-[327px]">
          <ChainList />
        </div>
        {/* // TODO: Open after launch V2 */}
        <div className="md:min-w-[224px]">
          {isConnected && currentTokenSelected?.address !== "" && (
            <TokenList
              widthBalance="w-[calc(100%-70px)]"
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
        <div className="flex w-full flex-1 flex-wrap justify-center gap-4 lg:max-w-[570px] xl:w-full xl:justify-end">
          <div className="my-2 h-full flex-[1_1_calc(100%-200px)] items-center justify-center rounded-default bg-neutral-800 p-2 md:my-0 md:min-h-[360px] md:p-0 xl:w-[570px]">
            <WalletContent
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
        <div className="flex w-full flex-col gap-1 rounded-default bg-neutral-800 md:w-auto">
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

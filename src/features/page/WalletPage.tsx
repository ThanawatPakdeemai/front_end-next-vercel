import RightMenuWallet from "@components/molecules/rightMenu/RightMenuWallet"
import Gas from "@components/molecules/Gas"
import React, { useEffect } from "react"
import MetamaskWallet from "@components/molecules/balance/MetamaskWallet"
import useProfileStore from "@stores/profileStore"
import TransactionTable from "@feature/transaction/components/molecules/TransactionTable"
import useGlobal from "@hooks/useGlobal"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import WalletHeader from "@feature/wallet/components/molecules/WalletHeader"
import WalletBody from "@feature/wallet/components/molecules/WalletBody"
import WalletFooter from "@feature/wallet/components/molecules/WalletFooter"
import CONFIGS from "@configs/index"
import { useRouter } from "next/router"
import useChainSupport from "@stores/chainSupport"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useSwitchNetwork from "@hooks/useSwitchNetwork"
import WalletContent from "@feature/wallet/components/organisms/WalletContent"
import ChainList from "@components/molecules/ChainList"
import TokenList from "@components/molecules/TokenList"
import { CHAIN_SUPPORT, IChainList } from "@configs/chain"

export default function WalletPage() {
  const { hydrated } = useGlobal()
  const {
    value,
    openWithDraw,
    openDeposit,
    disabled,
    setDisabled,
    setValue,
    handleOpen,
    handleClose,
    onSubmit,
    onClickMaxValue,
    handleConnectWallet,
    currentChainSelected,
    tabChainList,
    setTabChainList
  } = useWalletContoller()
  const {
    handleSwitchNetwork,
    address,
    chainId,
    handleDisconnectWallet,
    loading,
    setIsWrongNetwork,
    isWrongNetwork,
    signer,
    getNetwork,
    handleConnectWithMetamask,
    statusWalletConnected
  } = useSwitchNetwork()

  const router = useRouter()
  const { token } = router.query
  const { profile } = useProfileStore()
  const { chainSupport } = useChainSupport()

  /**
   * @description check disabled button
   * @returns {boolean}
   */
  const isDisabledButton = (): boolean => {
    if (value === 0) return true
    if (value <= (currentChainSelected as ITokenContract).balanceWallet.digit)
      return false
    return true
  }

  const renderWallets = () => {
    const tokenParam = chainSupport.find((item) => item.symbol === token)
    return (
      <div
        key={((tokenParam as ITokenContract) || chainSupport[0]).address}
        className="w-full md:m-2 xl:max-w-[380px]"
      >
        <WalletHeader
          tokenName={((tokenParam as ITokenContract) || chainSupport[0]).symbol}
        />
        <WalletBody
          tokenSymbol={
            ((tokenParam as ITokenContract) || chainSupport[0]).symbol
          }
          className={
            tabChainList?.link === "NAKA"
              ? "text-red-default"
              : "text-binance-default"
          }
          balance={
            ((tokenParam as ITokenContract) || chainSupport[0]).balanceVault
          }
          contractAddress={
            ((tokenParam as ITokenContract) || chainSupport[0]).address
          }
        />
        <div className="flex w-full justify-end gap-1 sm:mb-4">
          <RightMenuWallet
            title="withdraw"
            titleHeader="Withdraw to metamask"
            open={openWithDraw}
            value={value}
            setValue={setValue}
            handleOpen={() =>
              handleOpen(
                "withdraw",
                (tokenParam as ITokenContract) || chainSupport[0]
              )
            }
            handleClose={() => handleClose("withdraw")}
            onSubmit={() => onSubmit("withdraw")}
            onClickMaxValue={onClickMaxValue}
            disabled={disabled}
            setDisabled={setDisabled}
            currentChainSelected={
              (currentChainSelected as ITokenContract) || chainSupport[0]
            }
            method="withdraw"
          />
          <RightMenuWallet
            title="Deposit"
            titleHeader="deposit from metamask"
            open={openDeposit}
            value={value}
            setValue={setValue}
            setDisabled={setDisabled}
            handleOpen={() =>
              handleOpen(
                "deposit",
                (tokenParam as ITokenContract) || chainSupport[0]
              )
            }
            handleClose={() => handleClose("deposit")}
            onSubmit={() => onSubmit("deposit")}
            onClickMaxValue={onClickMaxValue}
            disabled={disabled}
            currentChainSelected={
              (currentChainSelected as ITokenContract) || chainSupport[0]
            }
            method="deposit"
          />
        </div>
        <WalletFooter
          address={((tokenParam as ITokenContract) || chainSupport[0]).address}
        />
      </div>
    )
  }

  /**
   * @description set disabled button
   */
  useEffect(() => {
    if (!statusWalletConnected.responseStatus) return
    setDisabled(isDisabledButton())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, tabChainList, statusWalletConnected])

  /**
   * @description Set type tab by router.query
   */
  useEffect(() => {
    const _currentChain = CHAIN_SUPPORT.find((item) => item.chainId === chainId)
    if (_currentChain) {
      setTabChainList(_currentChain as IChainList)
    }

    if (!statusWalletConnected.responseStatus) return
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, chainId, tabChainList])

  return hydrated ? (
    <>
      <div className="mt-2 w-full gap-2 sm:flex md:mt-0 xl:max-w-[570px] xl:justify-between">
        <div className="md:min-w-[327px]">
          <ChainList currentTabChainSelected={tabChainList as IChainList} />
        </div>
        <div className="md:min-w-[224px]">
          {chainId === tabChainList?.chainId && (
            <TokenList
              dataList={chainSupport}
              currentTabChainSelected={tabChainList as IChainList}
              currentTokenSelected={
                (token as string) || chainSupport[0]?.symbol
              }
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 lg:flex-nowrap">
        <div className="flex flex-1 flex-wrap justify-center gap-4 lg:max-w-[570px] xl:w-full xl:justify-end">
          <div className="my-2 h-full flex-[1_1_calc(100%-200px)] items-center justify-center rounded-default bg-neutral-800 p-2 md:my-0 md:min-h-[360px] md:p-0 xl:w-[570px]">
            <WalletContent
              chainSupport={chainSupport}
              loading={loading as boolean}
              address={address as string}
              signer={signer}
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
              renderWallets={renderWallets}
              statusWalletConnected={statusWalletConnected}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 rounded-default bg-neutral-800">
          <Gas type={tabChainList?.link} />
        </div>
        <MetamaskWallet
          isConnected={!!address}
          handleConnectWallet={handleConnectWallet}
          handleOnDisconnectWallet={handleDisconnectWallet}
          blockExplorerUrls={
            getNetwork?.(chainId as string)?.blockExplorerUrls as string[]
          }
          chainSupport={chainSupport}
          currentTokenSelected={(token as string) || chainSupport[0]?.symbol}
          currentChainSelected={tabChainList as IChainList}
        />
      </div>
      <TransactionTable profile={profile.data} />
    </>
  ) : (
    <></>
  )
}

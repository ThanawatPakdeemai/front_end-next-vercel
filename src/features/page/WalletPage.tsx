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
        className="md:col-span-5 md:m-2"
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
        <div className="mb-4 flex w-full justify-end">
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
            titleHeader="diposit from metamask"
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
  }, [value, tabChainList])

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
  }, [token, chainId, setTabChainList])

  return hydrated ? (
    <>
      <div className="flex w-full flex-wrap justify-center gap-4 md:justify-end lg:mx-2 xl:grid xl:grid-cols-12">
        <div className="h-full w-full justify-center md:col-span-8 md:flex md:justify-between">
          <ChainList currentChain={tabChainList as IChainList} />
          {chainId === tabChainList?.chainId && (
            <TokenList
              dataList={chainSupport}
              currentChain={tabChainList as IChainList}
              currentTokenSelected={
                (token as string) || chainSupport[0]?.symbol
              }
            />
          )}
        </div>
        <div className="my-2 h-full min-h-[360px] w-full max-w-full flex-[1_1_calc(100%-200px)] items-center justify-center rounded-default bg-neutral-800 p-2 md:col-span-6 md:my-0 md:max-w-md md:gap-1 md:p-0 lg:max-w-full">
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
        <div className="col-span-2 h-full w-full items-center justify-center gap-1 rounded-default bg-neutral-800">
          <Gas type={tabChainList?.link} />
        </div>
        <div className="col-span-4 w-full gap-1">
          <div className="w-full">
            <MetamaskWallet
              isConnected={!!address}
              handleConnectWallet={handleConnectWallet}
              handleOnDisconnectWallet={handleDisconnectWallet}
              blockExplorerURL={
                getNetwork?.(chainId as string).blockExplorerUrls[0]
              }
              chainName={getNetwork?.(chainId as string).chainName as string}
              chainSupport={chainSupport}
              chainId={chainId as string}
            />
          </div>
        </div>
      </div>
      <TransactionTable profile={profile.data} />
    </>
  ) : (
    <></>
  )
}

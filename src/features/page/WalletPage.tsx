import RightMenuWallet from "@components/molecules/rightMenu/RightMenuWallet"
import Gas from "@components/molecules/Gas"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import React, { useEffect } from "react"
import MetamaskWallet from "@components/molecules/balance/MetamaskWallet"
import useProfileStore from "@stores/profileStore"
import TransactionTable from "@feature/transaction/components/molecules/TransactionTable"
import useGlobal from "@hooks/useGlobal"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import WalletHeader from "@feature/wallet/components/molecules/WalletHeader"
import WalletBody from "@feature/wallet/components/molecules/WalletBody"
import WalletFooter from "@feature/wallet/components/molecules/WalletFooter"
import WalletLightAnimation from "@feature/wallet/components/molecules/WalletLightAnimation"
import CONFIGS from "@configs/index"
import { useRouter } from "next/router"
import useChainSupport from "@stores/chainSupport"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import SwitchChain from "@components/atoms/SwitchChain"
import useSwitchNetwork from "@hooks/useSwitchNetwork"
import SkeletionWallet from "@components/atoms/skeleton/SkeletonWallet"

export default function WalletPage() {
  const { hydrated, getNetwork } = useGlobal()
  const {
    type,
    value,
    openWithDraw,
    openDeposit,
    disabled,
    setDisabled,
    setType,
    setValue,
    handleOpen,
    handleClose,
    onSubmit,
    onClickMaxValue,
    handleConnectWallet,
    currentChainSelected
  } = useWalletContoller()
  const router = useRouter()
  const { token } = router.query
  const { profile } = useProfileStore()
  const { chainSupport } = useChainSupport()
  const {
    handleSwitchNetwork,
    address,
    chainId,
    handleDisconnectWallet,
    loading,
    setIsWrongNetwork,
    isWrongNetwork
  } = useSwitchNetwork()

  /**
   * @description check disabled button
   * @returns {boolean}
   */
  // const isDisabledButton = (): boolean => {
  //   if (value === 0) return true
  //   if (value <= chainSupport[0].balanceWallet.digit) return false
  //   return true
  // }

  const renderWallets = () => {
    if (!chainSupport || chainSupport.length === 0) {
      return <></>
    }

    return chainSupport.map((chain) => (
      <div
        key={chain.address}
        className="col-span-5 m-2"
      >
        <WalletHeader tokenName={chain.symbol} />
        <WalletBody
          tokenSymbol={chain.symbol}
          className={type === "NAKA" ? " text-NAKA " : "text-BUSD"}
          balance={chain.balanceVault}
        />
        <div className="mb-4 flex w-full justify-end">
          <RightMenuWallet
            title="withdraw"
            titleHeader="Withdraw to metamask"
            open={openWithDraw}
            value={value}
            setValue={setValue}
            handleOpen={() => handleOpen("withdraw", chain)}
            handleClose={() => handleClose("withdraw")}
            onSubmit={() => onSubmit("withdraw")}
            onClickMaxValue={onClickMaxValue}
            disabled={disabled}
            setDisabled={setDisabled}
            currentChainSelected={currentChainSelected as ITokenContract}
            method="withdraw"
          />
          <RightMenuWallet
            title="Deposit"
            titleHeader="diposit from metamask"
            open={openDeposit}
            value={value}
            setValue={setValue}
            setDisabled={setDisabled}
            handleOpen={() => handleOpen("deposit", chain)}
            handleClose={() => handleClose("deposit")}
            onSubmit={() => onSubmit("deposit")}
            onClickMaxValue={onClickMaxValue}
            disabled={disabled}
            currentChainSelected={currentChainSelected as ITokenContract}
            method="deposit"
          />
        </div>
        <WalletFooter address={chain.address} />
      </div>
    ))
  }

  /**
   * @description set disabled button
   */
  // useEffect(() => {
  //   setDisabled(isDisabledButton())
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value, type])

  /**
   * @description Set type tab by router.query
   */
  useEffect(() => {
    if (token === "NAKA") {
      setType("NAKA")
      router.push("/wallet?token=NAKA")
    } else if (token === "BNB") {
      setType("BNB")
      router.push("/wallet?token=BNB")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return hydrated ? (
    <>
      <div className="mx-2 grid w-full grid-cols-12 gap-4">
        <div className="col-span-8 flex h-full w-full justify-between">
          <div className="items-center uppercase">
            <p className="text-lg text-neutral-400">MY Wallet</p>
            <p className="text-xs text-neutral-600">
              Wallet manager for nakamoto.games world
            </p>
          </div>
          <div className="flex rounded-sm bg-neutral-700 p-2">
            <button
              type="button"
              className={`flex h-[50px] w-[130px] items-center rounded-sm
              ${
                type === "NAKA"
                  ? "bg-black-100 text-white-default"
                  : "bg-neutral-800 text-black-default"
              } p-4`}
              onClick={() => {
                setType("NAKA")
                router.push("/wallet?token=NAKA")
                setIsWrongNetwork(chainId !== CONFIGS.CHAIN.CHAIN_ID_HEX)
              }}
            >
              <div className="pr-2">
                <INaka />
              </div>
              <p className="m-auto">NAKA</p>
            </button>
            <button
              type="button"
              className={`ml-2 flex h-[50px] w-[130px] items-center rounded-sm ${
                type === "BNB"
                  ? "bg-black-100 text-white-default"
                  : "bg-neutral-800 text-neutral-500"
              } p-4`}
              onClick={() => {
                setType("BNB")
                router.push("/wallet?token=BNB")
                setIsWrongNetwork(chainId !== CONFIGS.CHAIN.CHAIN_ID_HEX_BNB)
              }}
            >
              <div className=" pr-2">
                <IBusd />
              </div>
              <p className="m-auto">BNB</p>
            </button>
          </div>
        </div>
        <div className="col-span-6 h-full w-full items-center justify-center gap-1 rounded-default bg-neutral-800">
          {loading ? (
            <SkeletionWallet />
          ) : (
            <div className="relative mx-2 grid w-full grid-cols-7 gap-1">
              {isWrongNetwork ? (
                <div className="col-span-5 m-2 flex flex-col items-center justify-center">
                  <SwitchChain
                    chainName={
                      type === "NAKA" ? "Polygon" : "Binance Smart Chain"
                    }
                    handleClick={
                      type === "NAKA"
                        ? () =>
                            handleSwitchNetwork(
                              CONFIGS.CHAIN.CHAIN_ID_HEX as string
                            )
                        : () =>
                            handleSwitchNetwork(
                              CONFIGS.CHAIN.CHAIN_ID_HEX_BNB as string
                            )
                    }
                    variant="full"
                  />
                </div>
              ) : (
                renderWallets()
              )}
              <WalletLightAnimation />
            </div>
          )}
        </div>
        <div className="col-span-2 h-full w-full items-center justify-center gap-1 rounded-default bg-neutral-800">
          <Gas />
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
              chainName={getNetwork?.(chainId as string).chainName}
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

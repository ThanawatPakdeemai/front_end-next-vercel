import RightMenuWallet from "@components/molecules/rightMenu/RightMenuWallet"
import Gas from "@components/molecules/Gas"
import INaka from "@components/icons/Naka"
import IBusd from "@components/icons/Busd"
import ISubtract from "@components/icons/Subtract"
import React from "react"
import MetamaskWallet from "@components/molecules/balance/MetamaskWallet"
import useProfileStore from "@stores/profileStore"
import { useWeb3Provider } from "@providers/index"
import TransactionTable from "@feature/transaction/components/molecules/TransactionTable"
import useGlobal from "@hooks/useGlobal"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import WalletHeader from "@feature/wallet/components/molecules/WalletHeader"
import WalletBody from "@feature/wallet/components/molecules/WalletBody"
import useAllBalances, { IBalanceDisplay } from "@hooks/useAllBalances"
import WalletFooter from "@feature/wallet/components/molecules/WalletFooter"
import WalletLightAnimation from "@feature/wallet/components/molecules/WalletLightAnimation"
import CONFIGS from "@configs/index"

// type Method = "deposit" | "withdraw"

export default function WalletPage() {
  const { hydrated } = useGlobal()
  const {
    type,
    value,
    openWithDraw,
    openDeposit,
    disabled,
    setDisabled,
    setType,
    setValue,
    getNetwork,
    handleOpen,
    handleClose,
    onSubmit,
    onClickMaxValue,
    handleConnectWallet
  } = useWalletContoller()
  const { address, handleDisconnectWallet, chainId } = useWeb3Provider()
  const { walletBalance, busdVaultBalance, nakaVaultBalance } = useAllBalances()
  const { profile } = useProfileStore()

  /**
   * @description get token symbol
   */
  const getTokenSymbol = () =>
    type === "NAKA" ? (
      <ISubtract
        width="40"
        height="40"
      />
    ) : (
      <IBusd
        width="35"
        height="40"
        className="mr-2"
      />
    )

  /**
   * @description get token name
   * @returns {string}
   */
  const getTokenName = (): string => (type === "NAKA" ? "NAKA" : "BUSD")

  /**
   * @description get token balance
   * @returns {IBalanceDisplay}
   */
  const getVaultBalance = (): IBalanceDisplay =>
    type === "NAKA" ? nakaVaultBalance : busdVaultBalance

  /**
   * @description get token contract
   * @returns {string}
   */
  const getContractAddress = (): string =>
    type === "NAKA"
      ? CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT
      : CONFIGS.CONTRACT_ADDRESS.BALANCE_VAULT_BINANCE

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
              onClick={() => setType("NAKA")}
            >
              <div className="pr-2">
                <INaka />
              </div>
              <p className="m-auto">NAKA</p>
            </button>
            <button
              type="button"
              className={`ml-2 flex h-[50px] w-[130px] items-center rounded-sm ${
                type === "BUSD"
                  ? "bg-black-100 text-white-default"
                  : "bg-neutral-800 text-neutral-500"
              } p-4`}
              onClick={() => setType("BUSD")}
            >
              <div className=" pr-2">
                <IBusd />
              </div>
              <p className="m-auto">BNB</p>
            </button>
          </div>
        </div>
        <div className="col-span-6 h-full w-full items-center justify-center gap-1 rounded-default bg-neutral-800">
          <div className="relative mx-2 grid w-full grid-cols-7 gap-1">
            <div className="col-span-5 m-2">
              <WalletHeader tokenName={getTokenName()} />
              <WalletBody
                tokenName={getTokenName()}
                tokenSymbol={getTokenSymbol()}
                className={type === "NAKA" ? " text-NAKA " : "text-BUSD"}
                balance={getVaultBalance()}
              />
              <div className="mb-4 flex w-full justify-end">
                <RightMenuWallet
                  title="withdraw"
                  titleHeader="Withdraw to metamask"
                  subtTitle={`your ${getTokenName()} storage`}
                  open={openWithDraw}
                  value={value}
                  balance={getVaultBalance()}
                  tokenName={getTokenName()}
                  setValue={setValue}
                  handleOpen={() => handleOpen("withdraw")}
                  handleClose={() => handleClose("withdraw")}
                  onSubmit={() => onSubmit("withdraw", getContractAddress())}
                  onClickMaxValue={onClickMaxValue}
                  disabled={disabled || value === 0}
                  setDisabled={setDisabled}
                />
                <RightMenuWallet
                  title="Deposit"
                  titleHeader="diposit from metamask"
                  subtTitle={`your ${
                    getNetwork(chainId as string).nativeCurrency.name
                  } in matamask`}
                  open={openDeposit}
                  value={value}
                  balance={walletBalance}
                  tokenName={getTokenName()}
                  setValue={setValue}
                  setDisabled={setDisabled}
                  handleOpen={() => handleOpen("deposit")}
                  handleClose={() => handleClose("deposit")}
                  onSubmit={() => onSubmit("deposit", getContractAddress())}
                  onClickMaxValue={onClickMaxValue}
                  disabled={disabled || value === 0}
                />
              </div>
              <WalletFooter address={address as string} />
            </div>

            <WalletLightAnimation />
          </div>
        </div>
        <div className="col-span-2 h-full w-full items-center justify-center gap-1 rounded-default bg-neutral-800">
          <Gas />
        </div>
        <div className="col-span-4 h-full w-full items-center justify-center gap-1">
          <MetamaskWallet
            isConnected={!!address}
            handleConnectWallet={handleConnectWallet}
            handleOnDisconnectWallet={handleDisconnectWallet}
            address={address}
            balance={walletBalance} // nakaBalance
            tokenName={getNetwork(chainId as string).nativeCurrency.name}
            chainName={getNetwork(chainId as string).chainName}
            blockExplorerURL={
              getNetwork(chainId as string).blockExplorerUrls[0]
            }
          />
        </div>
      </div>
      <TransactionTable profile={profile.data} />
    </>
  ) : (
    <></>
  )
}

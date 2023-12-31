import {
  Chip,
  Divider,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material"
import React, { memo, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import CONFIGS from "@configs/index"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import { IPunkMetaData } from "@feature/nakapunk/interfaces/INakapunkService"
import { useToast } from "@feature/toast/containers"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import useMutateAvatarReef from "@feature/avatarReef/containers/hook/useMutateAvatarReef"
import { MESSAGES } from "@constants/messages"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"

const GotNaKAPunk = dynamic(
  () => import("@components/molecules/Inventory/GotNaKAPunk"),
  {
    suspense: true,
    ssr: false
  }
)
const CardContentDetails = dynamic(
  () => import("@feature/marketplace/components/organisms/CardContentDetails"),
  {
    suspense: true,
    ssr: false
  }
)
const RightDetailsMarketplace = dynamic(
  () =>
    import("@feature/marketplace/components/organisms/RightDetailsMarketplace"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonLink = dynamic(
  () => import("@components/atoms/button/ButtonLink"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const RightMenuNotLogIn = dynamic(
  () => import("@components/molecules/rightMenu/RightMenuNotLogIn"),
  {
    suspense: true,
    ssr: false
  }
)
const RedemptionCode = dynamic(
  () => import("@components/molecules/RedemptionCode"),
  {
    suspense: true,
    ssr: false
  }
)
const Breadcrumb = dynamic(() => import("@components/molecules/Breadcrumb"), {
  suspense: true,
  ssr: false
})

const MarketplaceReefAvatar = () => {
  const [evm, setEVM] = useState<string>("")
  const { marketType } = useGlobal()
  const { onCheckAllowance } = useGlobalMarket()
  const {
    priceAvatarReef,
    redeemAvatarReefData,
    purchAvatarReefData,
    mutatePurchaseAvatarReef
  } = useMutateAvatarReef()
  const { setOpen, setClose } = useLoadingStore()
  const { isLogin, profile } = useProfileStore()
  const { successToast, errorToast } = useToast()
  const [priceNP, setPriceNP] = useState<number>(0)
  const [metaData, setMetaData] = useState<IPunkMetaData[]>([])
  const { marketAmount } = useMarketplaceProvider()
  const count = marketAmount || 1

  const handleMintNFTAvatar = async () => {
    if (evm && priceNP > 0) {
      setOpen(MESSAGES.transaction_processing_order)
      const _checkAllowance = await onCheckAllowance({
        _type: "nft_avatar",
        _seller: "system",
        _price: priceNP * count
      })
      if (!_checkAllowance.allowStatus) {
        setClose()
        return
      }
      await mutatePurchaseAvatarReef({
        _addrs: evm,
        _qty: count,
        _chain: "reef"
      })
        .then(() => {
          successToast("Mint success")
        })
        .catch((_error) => {
          errorToast("Transaction fail")
        })
        .finally(() => {
          setTimeout(() => setClose(), 1000)
        })
    } else {
      // toast
      errorToast("EVM Address is required!")
    }
  }

  useEffect(() => {
    let load = false
    if (!load) {
      if (purchAvatarReefData) {
        setMetaData(purchAvatarReefData.data.meta_data)
      }
    }
    return () => {
      load = true
    }
  }, [purchAvatarReefData])

  useEffect(() => {
    let load = false
    if (!load) {
      if (redeemAvatarReefData) {
        setMetaData(redeemAvatarReefData.data.meta_data)
      }
    }
    return () => {
      load = true
    }
  }, [redeemAvatarReefData])

  useEffect(() => {
    let load = false
    if (!load) {
      if (priceAvatarReef) {
        setPriceNP(priceAvatarReef.data)
      }
    }
    return () => {
      load = true
    }
  }, [priceAvatarReef])

  return (
    <>
      <Breadcrumb />
      <div className="flex w-full max-w-[1368px] flex-col justify-center gap-x-4 gap-y-[30px] px-5 sm:flex-row sm:gap-x-12 sm:px-0 xl:gap-x-[120px]">
        <div className="hidden sm:block">
          <CardContentDetails
            detail="Avatar Reef"
            image={
              !purchAvatarReefData ? "/images/temp-nakapunk.webp" : undefined
            }
            alt="avatar-reef"
            txHash={purchAvatarReefData?.data.transaction_hash}
            meta_data={metaData || undefined}
          >
            <div>
              {purchAvatarReefData ? (
                <div>
                  {metaData && profile && profile.data && (
                    <div>
                      {metaData && metaData.length > 0 && (
                        <div className="flex items-center px-8 pt-6">
                          <Chip
                            label="congrats!"
                            variant="filled"
                            color="success"
                            size="small"
                            className="cursor-pointer uppercase"
                          />
                          <Typography className="ml-4 text-sm uppercase text-white-primary">
                            you got {metaData.length} Avatar Reef
                          </Typography>
                        </div>
                      )}
                      <div
                        className={
                          metaData &&
                          "custom-scroll max-h-[100px] overflow-y-scroll"
                        }
                      >
                        {metaData.map((_data) => (
                          <GotNaKAPunk
                            key={uuidv4()}
                            address={String(profile.data?.address)}
                            token_id={_data.NFT_token}
                          />
                        ))}
                      </div>
                      {metaData && metaData.length > 0 && (
                        <a
                          href={`${CONFIGS.CHAIN.POLYGON_SCAN}/tx/${purchAvatarReefData.data.transaction_hash}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Typography
                            variant="button"
                            className="cursor-pointer px-8 text-xs uppercase text-purple-primary"
                          >
                            view transaction
                          </Typography>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ) : undefined}
            </div>
          </CardContentDetails>
        </div>
        <div className="flex flex-col gap-y-4">
          <RightDetailsMarketplace
            type={marketType as TNFTType}
            title="avatar mystery box"
            method="mint"
            price={priceNP}
            count={{
              helperText: `1 NFT = ${priceNP} NAKA`,
              label: "Quantity",
              min: 1,
              max: 10,
              count: 1
            }}
            image="/images/temp-nakapunk.webp"
            showListMintItem={
              purchAvatarReefData ? (
                <div>
                  {metaData && profile && profile.data && (
                    <div>
                      {metaData && metaData.length > 0 && (
                        <div className="flex items-center px-8 pt-6">
                          <Chip
                            label="congrats!"
                            variant="filled"
                            color="success"
                            size="small"
                            className="cursor-pointer uppercase"
                          />
                          <Typography className="ml-4 text-sm uppercase text-white-primary">
                            you got {metaData.length} Avatar Reef
                          </Typography>
                        </div>
                      )}
                      <div
                        className={
                          metaData &&
                          "custom-scroll max-h-[100px] overflow-y-scroll"
                        }
                      >
                        {metaData.map((_data) => (
                          <GotNaKAPunk
                            key={uuidv4()}
                            address={String(profile.data?.address)}
                            token_id={_data.NFT_token}
                          />
                        ))}
                      </div>
                      {metaData && metaData.length > 0 && (
                        <a
                          href={`${CONFIGS.CHAIN.POLYGON_SCAN}/tx/${purchAvatarReefData.data.transaction_hash}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Typography
                            variant="button"
                            className="cursor-pointer px-8 text-xs uppercase text-purple-primary"
                          >
                            view transaction
                          </Typography>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ) : undefined
            }
          >
            <div className="flex w-full flex-col gap-y-1 py-2">
              <Typography
                className={`text-sm font-bold uppercase ${
                  evm ? "text-neutral-400" : "text-error-main"
                } `}
              >
                evm address *
              </Typography>
              <TextField
                className="mr-4 w-full"
                required
                type="text"
                value={evm}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    width: "100%"
                  }
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // e.target.value = e.target.value.replace(/[^A-Za-z0-9]/gi, "")
                  setEVM(e.target.value)
                }}
                id="username-create"
                placeholder="Ex. 0x0000000000000"
                size="medium"
                InputProps={{
                  style: {
                    fontFamily: "neueMachina",
                    backgroundColor: "#232329",
                    borderColor: "#18181C"
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icomoon className="icon-Ticket" />
                    </InputAdornment>
                  ),
                  inputProps: {
                    pattern: "[a-zA-Z0-9]"
                  }
                }}
              />
              <Divider className="mt-1 !block border-[1px] border-neutral-800" />
            </div>
            <div className="flex justify-between">
              <Typography className="text-xs uppercase text-neutral-500">
                Create unique digital asset ownership token.
              </Typography>
              {isLogin ? (
                <ButtonLink
                  text="Mint now"
                  type="button"
                  size="medium"
                  variant="contained"
                  textColor="text-primary-main"
                  className="!min-h-10 !h-10 !w-[232px] !bg-green-lemon"
                  arrowColor="text-primary-main"
                  icon={<Icomoon className="icon-Magic-Stick" />}
                  onClick={handleMintNFTAvatar}
                />
              ) : (
                <RightMenuNotLogIn />
              )}
            </div>
          </RightDetailsMarketplace>
          <RedemptionCode
            type="nft_avatar"
            evmAddress={evm}
          />
        </div>
      </div>
    </>
  )
}

export default memo(MarketplaceReefAvatar)

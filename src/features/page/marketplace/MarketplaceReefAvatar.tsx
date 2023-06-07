import GotNaKAPunk from "@components/molecules/Inventory/GotNaKAPunk"
import CONFIGS from "@configs/index"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import { IPunkMetaData } from "@feature/nakapunk/interfaces/INakapunkService"
import { useToast } from "@feature/toast/containers"
import {
  Chip,
  Divider,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material"
import useCountStore from "@stores/countComponant"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import React, { memo, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import useGlobal from "@hooks/useGlobal"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import ButtonLink from "@components/atoms/button/ButtonLink"
import WandIcon from "@components/icons/WandIcon"
import RightMenuNotLogIn from "@components/molecules/rightMenu/RightMenuNotLogIn"
import CouponIcon from "@components/icons/CouponIcon"
import Helper from "@utils/helper"
import useMutateAvatarReef from "@feature/avatarReef/containers/hook/useMutateAvatarReef"
import RedemptionCode from "@components/molecules/RedemptionCode"
import Breadcrumb from "@components/molecules/Breadcrumb"

const MarketplaceReefAvatar = () => {
  const [evm, setEVM] = useState<string>("")
  const { marketType } = useGlobal()
  const { onCheckAllowance } = useGlobalMarket()
  const {
    priceAvatarReef,
    redeemAvatarReefData,
    mutateRedeemAvatarReef,
    purchAvatarReefData,
    mutatePurchaseAvatarReef
  } = useMutateAvatarReef()
  const { count } = useCountStore()
  const { setOpen, setClose } = useLoadingStore()
  const { isLogin, profile } = useProfileStore()
  const { successToast, errorToast } = useToast()
  const [priceNP, setPriceNP] = useState<number>(0)
  const [metaData, setMetaData] = useState<IPunkMetaData[]>([])
  const { WeiToNumber } = Helper

  const handleRedeem = (_coupon: string) => {
    if (evm) {
      setOpen()
      mutateRedeemAvatarReef({ _evmAddrs: evm, _code: _coupon })
        .then((_) => {
          successToast("redeem success")
        })
        .catch((_) => {
          errorToast("redeem fail")
        })
        .finally(() => {
          setTimeout(() => setClose(), 1000)
        })
    } else {
      errorToast("EVM Address is required!")
    }
  }

  const handleMintNFTAvatar = async () => {
    if (evm) {
      setOpen()
      const _checkAllowance = await onCheckAllowance({
        _type: marketType || "nft_avatar",
        _seller: "user",
        _price: priceNP * count
      })
      if (_checkAllowance.allowStatus) {
        mutatePurchaseAvatarReef({ _addrs: evm, _qty: count, _chain: "reef" })
          .then(() => {
            successToast("Mint success")
          })
          .catch((_error) => {
            errorToast("Transection fail")
          })
          .finally(() => {
            setTimeout(() => setClose(), 1000)
          })
      }
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
      <div className="flex w-full flex-col justify-center gap-y-[30px] px-5 sm:flex-row sm:gap-x-[120px] sm:px-0">
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
        <div className="flex flex-col gap-y-4">
          <RightDetailsMarketplace
            type={marketType as TNFTType}
            title="avatar mystery box"
            method="mint"
            price={priceNP * count}
            count={{
              helperText: `1 NFT = ${priceNP} NAKA`,
              label: "Quantity",
              min: 1,
              max: 10,
              count: 1
            }}
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
                      <CouponIcon />
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
                  icon={<WandIcon />}
                  onClick={handleMintNFTAvatar}
                />
              ) : (
                <RightMenuNotLogIn />
              )}
            </div>
          </RightDetailsMarketplace>
          <RedemptionCode onRedeem={handleRedeem} />
        </div>
      </div>
    </>
  )
}

export default memo(MarketplaceReefAvatar)

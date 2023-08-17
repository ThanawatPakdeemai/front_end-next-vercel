import { Chip, Typography, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import useGetPriceNakaPunk from "@feature/nakapunk/containers/hooks/useGetPriceNakapunk"
import usePurchaseNakapunk from "@feature/nakapunk/containers/hooks/usePurchaseNakapunk"
import { useToast } from "@feature/toast/containers"
// import useCountStore from "@stores/countComponant"
import useLoadingStore from "@stores/loading"
import { IPunkMetaData } from "@feature/nakapunk/interfaces/INakapunkService"
import useProfileStore from "@stores/profileStore"
import CONFIGS from "@configs/index"
import useGlobal from "@hooks/useGlobal"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import { MESSAGES } from "@constants/messages"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"

const Breadcrumb = dynamic(() => import("@components/molecules/Breadcrumb"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
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
const RightMenuNotLogIn = dynamic(
  () => import("@components/molecules/rightMenu/RightMenuNotLogIn"),
  {
    suspense: true,
    ssr: false
  }
)
const GotNaKAPunk = dynamic(
  () => import("@components/molecules/Inventory/GotNaKAPunk"),
  {
    suspense: true,
    ssr: false
  }
)

const MarketplaceNakaPunk = () => {
  const [priceNP, setPriceNP] = useState<number>(0)
  const [metaData, setMetaData] = useState<IPunkMetaData[]>([])
  const { marketType } = useGlobal()
  const { priceNakaPunk } = useGetPriceNakaPunk()
  const { resNakapunk, mutatePurchaseNakapunk } = usePurchaseNakapunk()
  // const { count } = useCountStore()
  const { marketAmount } = useMarketplaceProvider()
  const { setOpen, setClose } = useLoadingStore()
  const { isLogin, profile } = useProfileStore()
  const { successToast, errorToast } = useToast()
  const { onCheckAllowance } = useGlobalMarket()
  const _count = marketAmount || 1
  const handleMintNakapunk = async () => {
    if (priceNP > 0) {
      setOpen(MESSAGES.transaction_processing_order)
      const _checkAllowance = await onCheckAllowance({
        _type: "nft_naka_punk",
        _seller: "system",
        _price: priceNP * _count
      })
      if (!_checkAllowance.allowStatus) {
        setClose()
        return
      }
      await mutatePurchaseNakapunk({ _qty: _count })
        .then(() => {
          successToast("Mint success")
        })
        .catch((_error) => {
          errorToast("Transaction fail")
        })
        .finally(() => setClose())
    }
  }

  useEffect(() => {
    let load = false
    if (!load) {
      if (resNakapunk) {
        setMetaData(resNakapunk.data.meta_data)
      }
    }
    return () => {
      load = true
    }
  }, [resNakapunk])

  useEffect(() => {
    let load = false

    if (!load) {
      if (priceNakaPunk) {
        setPriceNP(priceNakaPunk.data)
      }
    }

    return () => {
      load = true
    }
  }, [priceNakaPunk])

  return (
    <>
      <Breadcrumb />
      <div className="flex w-full max-w-[1368px] flex-col justify-center gap-x-4 gap-y-[30px] px-5 sm:flex-row sm:gap-x-12 sm:px-0 xl:gap-x-[120px]">
        <div className="hidden md:block">
          <CardContentDetails
            showDetails
            detail="THE NAKA PUNKS IS A NEXT-GENERATION NFT COLLECTION. IT NOT ONLY BRINGS A LIMITED COLLECTION OF UNIQUE PUNKLIKE CHARACTERS INTO A WORLD BUILT FOR THEM BUT ALSO INTEGRATES PRIVILEGES TO THE HOLDERS OF THESE NFTS. EACH PUNK WILL HAVE DISTINCT CHARACTERISTICS, STRENGTHS, AND WEAKNESSES, BESTOWING UNIQUE CAPABILITIES ON THEIR OWNERS AND WILL BE PARTICULARLY SUITABLE FOR CERTAIN ACTIVITIES WITHIN THE NAKAMOTO.GAMES AND NAKAVERSE."
            image={!resNakapunk ? "/images/temp-nakapunk.webp" : undefined}
            alt="naka-punk"
            txHash={resNakapunk?.data.transaction_hash}
            meta_data={resNakapunk ? metaData : undefined}
          >
            <div>
              {resNakapunk ? (
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
                            you got {metaData.length} NAKA Punks
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
                          href={`${CONFIGS.CHAIN.POLYGON_SCAN}/tx/${resNakapunk.data.transaction_hash}`}
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
        <RightDetailsMarketplace
          type={marketType as TNFTType}
          title="NAKA Punks mystery box"
          method="mint"
          price={priceNP}
          count={{
            helperText: `1 NFT = ${priceNP} NAKA`,
            label: "Quantity (Max : 10)",
            min: 1,
            max: 10,
            count: 1
          }}
          redemption
          image="/images/temp-nakapunk.webp"
          showListMintItem={
            resNakapunk ? (
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
                          you got {metaData.length} NAKA Punks
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
                        href={`${CONFIGS.CHAIN.POLYGON_SCAN}/tx/${resNakapunk.data.transaction_hash}`}
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
          <div className="flex justify-between">
            <Typography className="text-xs uppercase text-neutral-500">
              Create unique digital asset ownership token.
            </Typography>
            {isLogin ? (
              <Button
                type="submit"
                variant="contained"
                className="h-10 w-full !bg-green-lemon capitalize !text-primary-main"
                startIcon={<Icomoon className="icon-Magic-Stick" />}
                sx={{
                  maxWidth: 232
                }}
                onClick={handleMintNakapunk}
              >
                Mint now
              </Button>
            ) : (
              <RightMenuNotLogIn />
            )}
          </div>
        </RightDetailsMarketplace>
      </div>
    </>
  )
}

export default MarketplaceNakaPunk

import ButtonLink from "@components/atoms/button/ButtonLink"
import WandIcon from "@components/icons/WandIcon"
import CardWriterDetails from "@components/molecules/Inventory/CardWriterDetails"
import CONFIGS from "@configs/index"
import CardContentDetails from "@feature/marketplace/components/organisms/CardContentDetails"
import RightDetailsMarketplace from "@feature/marketplace/components/organisms/RightDetailsMarketplace"
import useGetPriceNakaPunk from "@feature/nakapunk/containers/hooks/useGetPriceNakapunk"
import usePurchaseNakapunk from "@feature/nakapunk/containers/hooks/usePurchaseNakapunk"
import { useToast } from "@feature/toast/containers"
import useMarketplace from "@hooks/useMarketplace"
import { Chip, Typography } from "@mui/material"
import useCountStore from "@stores/countComponant"
import useLoadingStore from "@stores/loading"
import React, { useEffect, useState } from "react"
import { IPunkMetaData } from "@feature/nakapunk/interfaces/INakapunkService"
import useProfileStore from "@stores/profileStore"
import RightMenuNotLogIn from "@components/molecules/rightMenu/RightMenuNotLogIn"
import GotNaKAPunk from "@components/molecules/Inventory/GotNaKAPunk"
import { v4 as uuidv4 } from "uuid"

const MarketplaceNakaPunk = () => {
  const [priceNP, setPriceNP] = useState<number>(0)
  const [metaData, setMetaData] = useState<IPunkMetaData[]>([])
  const { type } = useMarketplace()
  const { priceNakaPunk } = useGetPriceNakaPunk()
  const { resNakapunk, mutatePurchaseNakapunk } = usePurchaseNakapunk()
  const { count } = useCountStore()
  const { setOpen, setClose } = useLoadingStore()
  const { isLogin, profile } = useProfileStore()
  const { successToast, errorToast } = useToast()

  const handleMintNakapunk = async () => {
    setOpen()
    mutatePurchaseNakapunk({ _qty: count })
      .then(() => {
        setClose()
        successToast("Mint success")
      })
      .catch((_error) => {
        setClose()
        errorToast(_error.message)
      })
  }

  useEffect(() => {
    if (resNakapunk) {
      setMetaData(resNakapunk.data.meta_data)
    }
  }, [resNakapunk])

  useEffect(() => {
    if (priceNakaPunk) {
      setPriceNP(priceNakaPunk.data)
    }
  }, [priceNakaPunk])

  return (
    <div className="flex w-full gap-x-[120px]">
      <CardContentDetails
        detail="NAKA Punk"
        image={!resNakapunk ? "/images/temp-nakapunk.webp" : undefined}
        alt="naka-punk"
        meta_data={metaData}
      >
        <div>
          <div className="grid grid-cols-2 px-8 py-6">
            <CardWriterDetails
              name="nakamoto.games"
              link={CONFIGS.CONTRACT_ADDRESS.NAKA}
            />
          </div>
          <div>
            <div className="flex items-center">
              <Chip
                label="congrats!"
                variant="filled"
                color="success"
                size="small"
                className="cursor-pointer uppercase"
              />
            </div>
            {metaData && profile && profile.data && (
              <div>
                <Typography className="ml-4 text-sm uppercase text-white-primary">
                  you got naka punk
                </Typography>
                {metaData.map((_data) => (
                  <GotNaKAPunk
                    key={uuidv4()}
                    address={String(profile.data?.address)}
                    token_id={_data.NFT_token}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContentDetails>
      <RightDetailsMarketplace
        type={type}
        title="NAKA Punk mystery box"
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
              onClick={handleMintNakapunk}
            />
          ) : (
            <RightMenuNotLogIn />
          )}
        </div>
      </RightDetailsMarketplace>
    </div>
  )
}

export default MarketplaceNakaPunk

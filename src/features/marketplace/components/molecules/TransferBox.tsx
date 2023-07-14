import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button
} from "@mui/material"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useMemo } from "react"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"
import useNFTLand from "@feature/land/containers/hooks/useNFTLand"
import useNFTBuilding from "@feature/building/containers/hooks/useNFTBuilding"
import useNFTPunk from "@feature/nakapunk/containers/hooks/useNFTPunk"
import useNFTArcGame from "@feature/game/marketplace/containers/hooks/useNFTArcGame"
import NumpadIcon from "@components/icons/NumpadIcon"
import CountItem from "@components/molecules/CountItem"
import { useInventoryProvider } from "@providers/InventoryProvider"
import Helper from "@utils/helper"
import { addressPattern } from "@constants/regex"

interface IProp {
  _tokenId: string
  _nftToken: string
  _maxAmount?: number
}

const TransferBox = ({ _tokenId, _nftToken, _maxAmount }: IProp) => {
  const [expanded, setExpanded] = React.useState<string | false>()
  const [address, setAddress] = React.useState<string>("")
  const MIN_AMOUNT = useMemo(() => {
    let _min: number = 0
    if (_nftToken === "game_item" || _nftToken === "nft_material") {
      if (_maxAmount && _maxAmount > 0) {
        _min = 1
      }
    } else {
      _min = 1
    }
    return _min
  }, [_nftToken, _maxAmount])
  const MAX_AMOUNT: number = _maxAmount || 1
  const [transAmount, setTransAmount] = React.useState<number>(MIN_AMOUNT)
  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()
  const { marketType } = useGlobal()
  const { onTransferLand } = useNFTLand()
  const { onTransferBuilding } = useNFTBuilding()
  const { onTransferPunk } = useNFTPunk()
  const { onTransferArcGame } = useNFTArcGame()
  const { onTransferMaterial } = useInventoryProvider()
  const { convertNFTTypeToTType } = Helper

  const onDecreaseAmount = () => {
    if (transAmount && transAmount <= MIN_AMOUNT) {
      setTransAmount(MIN_AMOUNT)
    } else {
      setTransAmount((prev: number) => prev - 1)
    }
  }

  const onIncreaseAmount = () => {
    if (transAmount && transAmount >= MAX_AMOUNT) {
      setTransAmount(MAX_AMOUNT)
    } else {
      setTransAmount((prev: number) => prev + 1)
    }
  }

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  const handleOnTransfer = useCallback(async () => {
    if (marketType && profile) {
      switch (marketType) {
        case "nft_material":
          if (onTransferMaterial)
            await onTransferMaterial(address, _nftToken, transAmount)
          break
        case "nft_land":
          await onTransferLand(profile?.address, address, _nftToken, _tokenId)
          break
        case "nft_building":
          await onTransferBuilding(
            profile?.address,
            address,
            _nftToken,
            _tokenId
          )
          break
        case "nft_game":
          await onTransferArcGame(
            profile?.address,
            address,
            _nftToken,
            _tokenId
          )
          break
        case "nft_naka_punk":
          await onTransferPunk(
            profile?.address,
            address,
            _nftToken,
            _tokenId
          ).catch(() => {})
          break
        default:
          break
      }
      if (marketType !== "nft_material")
        setTimeout(
          () =>
            router.replace(
              `/marketplace/inventory/${convertNFTTypeToTType(marketType)}`,
              undefined,
              { shallow: true }
            ),
          1000
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_nftToken, address, marketType, transAmount])

  useEffect(() => {
    let load = false
    if (
      !load &&
      marketType &&
      marketType === "nft_material" &&
      _maxAmount &&
      _maxAmount <= 0
    )
      setTimeout(
        () =>
          router.replace(
            `/marketplace/inventory/${convertNFTTypeToTType(marketType)}`,
            undefined,
            { shallow: true }
          ),
        1000
      )
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_maxAmount, marketType])

  return (
    <Accordion
      expanded={expanded === "transfer"}
      onChange={handleChange("transfer")}
      className="w-full rounded-md border-neutral-800 bg-primary-main px-[10px]"
      sx={{
        backgroundImage: "none"
      }}
    >
      <AccordionSummary
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <div className="flex w-full items-center justify-between">
          <Typography className="uppercase text-neutral-300">
            Transfer ownership
          </Typography>

          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-lg border-[1px] border-solid border-neutral-700 bg-neutral-800">
            <div
              className={`flex items-center justify-center ${
                expanded === "panel1"
                  ? "rotate-45 transition-all duration-300"
                  : "rotate-0 transition-all duration-300"
              }`}
            >
              <PlusIcon />
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex w-full flex-col items-center gap-y-5">
          <TextField
            required
            className="!w-full"
            type="text"
            value={address}
            variant="outlined"
            id="username-create"
            helperText="Transfer to (Address)"
            placeholder="0x0000000000000"
            size="medium"
            onChange={(e) => {
              setAddress(e.target.value)
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                paddingLeft: 1
              }
            }}
          />
          {marketType === "game_item" || marketType === "nft_material" ? (
            <CountItem
              endIcon={<NumpadIcon />}
              helperText={`Total Amount: ${MAX_AMOUNT}`}
              label="transfer amount"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              count={transAmount}
              setItemCount={setTransAmount}
              _minusItem={onDecreaseAmount}
              _addItem={onIncreaseAmount}
            />
          ) : null}
          <Button
            disabled={
              !profile ||
              !address ||
              (["game_item", "nft_material"].includes(String(marketType)) &&
                transAmount <= 0) ||
              !addressPattern.test(address) ||
              profile.address.toLowerCase() === address.toLowerCase()
            }
            sx={{ fontFamily: "neueMachina" }}
            color="success"
            className="w-1/3 text-sm font-bold text-primary-main"
            variant="contained"
            size="medium"
            onClick={handleOnTransfer}
          >
            Transfer
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default TransferBox

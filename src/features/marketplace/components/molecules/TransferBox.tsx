import { useRouter } from "next/router"
import React, { useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"
import useNFTLand from "@feature/land/containers/hooks/useNFTLand"
import useNFTBuilding from "@feature/building/containers/hooks/useNFTBuilding"
import useNFTPunk from "@feature/nakapunk/containers/hooks/useNFTPunk"
import useNFTArcGame from "@feature/game/marketplace/containers/hooks/useNFTArcGame"
import { useInventoryProvider } from "@providers/InventoryProvider"
import Helper from "@utils/helper"
import { useToast } from "@feature/toast/containers"
import { useWeb3Provider } from "@providers/Web3Provider"
import { MESSAGES } from "@constants/messages"

const Accordion = dynamic(() => import("@mui/material/Accordion"), {
  suspense: true,
  ssr: false
})
const AccordionSummary = dynamic(
  () => import("@mui/material/AccordionSummary"),
  {
    suspense: true,
    ssr: false
  }
)
const AccordionDetails = dynamic(
  () => import("@mui/material/AccordionDetails"),
  {
    suspense: true,
    ssr: false
  }
)
const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
  ssr: false
})
const TextField = dynamic(() => import("@mui/material/TextField"), {
  suspense: true,
  ssr: false
})
const Button = dynamic(() => import("@mui/material/Button"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const AmountItem = dynamic(() => import("@components/molecules/AmountItem"), {
  suspense: true,
  ssr: false
})

interface IProp {
  _tokenId: string
  _nftToken: string
  _maxAmount?: number
}

const TransferBox = ({ _tokenId, _nftToken, _maxAmount }: IProp) => {
  const { address: connectAddrs } = useWeb3Provider()
  const [expanded, setExpanded] = React.useState<string | false>()
  const [address, setAddress] = React.useState<string>("")
  const [maxAmount, setMaxAmount] = React.useState<number>(_maxAmount || 1)
  const [clearAmount, setClearAmount] = React.useState<boolean>(false)
  const [transAmount, setTransAmount] = React.useState<number>(0)
  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()
  const { marketType } = useGlobal()
  const { onTransferLand } = useNFTLand()
  const { onTransferBuilding } = useNFTBuilding()
  const { onTransferPunk } = useNFTPunk()
  const { onTransferArcGame } = useNFTArcGame()
  const { onTransferMaterial } = useInventoryProvider()
  const { convertNFTTypeToTType } = Helper
  const { errorToast } = useToast()

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  const handleOnTransfer = useCallback(async () => {
    if (!profile) return errorToast(MESSAGES.please_login)
    if (!connectAddrs) return errorToast(MESSAGES.please_connect_wallet)
    if (!address) return errorToast("transfer address is required!")
    if (profile.address.toLowerCase() === address.toLowerCase())
      return errorToast(
        "Your wallet address and transfer address must not be the same."
      )
    if (
      (marketType === "nft_material" || marketType === "game_item") &&
      transAmount <= 0
    )
      return errorToast("transfer amount must be more than 0.")
    let _status: boolean = false
    if (marketType) {
      switch (marketType) {
        case "nft_material":
          if (onTransferMaterial)
            _status = await onTransferMaterial(address, _nftToken, transAmount)
          break
        case "nft_land":
          _status = await onTransferLand(
            profile?.address,
            address,
            _nftToken,
            _tokenId
          )
          break
        case "nft_building":
          _status = await onTransferBuilding(
            profile?.address,
            address,
            _nftToken,
            _tokenId
          )
          break
        case "nft_game":
          _status = await onTransferArcGame(
            profile?.address,
            address,
            _nftToken,
            _tokenId
          )
          break
        case "nft_naka_punk":
          _status = await onTransferPunk(
            profile?.address,
            address,
            _nftToken,
            _tokenId
          )
          break
        default:
          break
      }
      if (_status) {
        setAddress("")
        setMaxAmount(maxAmount - transAmount)
        setClearAmount((prev: boolean) => !prev)
        setTransAmount(0)
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
              <Icomoon className="icon-Plus1" />
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex w-full flex-col items-center gap-y-5">
          <TextField
            required
            type="text"
            value={address}
            variant="outlined"
            id="username-create"
            helperText={
              <span className={address.length < 2 ? "text-error-main" : ""}>
                Transfer to (Address)
              </span>
            }
            placeholder="0x0000000000000"
            size="medium"
            onChange={(e) => {
              setAddress(e.target.value)
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                paddingLeft: 1,
                border: address.length < 2 ? "1px solid #F42728" : ""
              },
              "& .MuiOutlinedInput-root:hover": {
                border: address.length < 2 ? "1px solid #F42728" : ""
              }
            }}
            autoComplete="off"
            spellCheck="false"
            className="!w-ful"
          />
          {marketType === "game_item" || marketType === "nft_material" ? (
            <AmountItem
              setValue={setTransAmount}
              helperText={`Total Amount: ${maxAmount}`}
              label="transfer amount"
              max={maxAmount}
              resetValue={clearAmount}
            />
          ) : null}
          <Button
            sx={{ fontFamily: "neueMachina" }}
            color="success"
            className="w-1/3 text-sm font-bold text-primary-main"
            variant="contained"
            size="medium"
            onClick={handleOnTransfer}
            aria-label="transfer"
          >
            Transfer
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default TransferBox

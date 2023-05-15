import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button
} from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"
import useNFTLand from "@feature/land/containers/hooks/useNFTLand"
import useNFTBuilding from "@feature/building/containers/hooks/useNFTBuilding"
import useNFTPunk from "@feature/nakapunk/containers/hooks/useNFTPunk"
import useNFTArcGame from "@feature/game/marketplace/containers/hooks/useNFTArcGame"

interface IProp {
  _tokenId: string
}

const TransferBox = ({ _tokenId }: IProp) => {
  const [expanded, setExpanded] = React.useState<string | false>()
  const [address, setAddress] = React.useState<string>("")

  const profile = useProfileStore((state) => state.profile.data)
  const router = useRouter()
  const { marketType } = useGlobal()
  const { onTransferLand } = useNFTLand()
  const { onTransferBuilding } = useNFTBuilding()
  const { onTransferPunk } = useNFTPunk()
  const { onTransferArcGame } = useNFTArcGame()

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  const handleOnTransfer = () => {
    const allFunction = {
      nft_land: onTransferLand,
      nft_building: onTransferBuilding,
      nft_naka_punk: onTransferPunk,
      nft_game: onTransferArcGame
    }

    const transferFunction = marketType && allFunction[marketType]
    if (transferFunction) {
      transferFunction(address, _tokenId)
        .then(() => router.push("/marketplace/inventory"))
        .catch(() => console.error("Something went wrong"))
    }
  }

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
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            disabled={!profile}
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

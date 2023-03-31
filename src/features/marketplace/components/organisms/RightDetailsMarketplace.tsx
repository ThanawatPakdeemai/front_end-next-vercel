import React from "react"
import { useRouter } from "next/router"
import ButtonClose from "@components/atoms/button/ButtonClose"
import CopyButton from "@components/atoms/CopyButton"
import {
  Accordion,
  AccordionDetails,
  Alert,
  Button,
  Chip,
  Divider,
  InputAdornment,
  styled,
  TextField,
  Typography
} from "@mui/material"
// import MuiAccordionDetails from "@mui/material/AccordionDetails"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import Helper from "@utils/helper"
import { Image } from "@components/atoms/image"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import CONFIGS from "@configs/index"
import MuiAccordionSummary, {
  AccordionSummaryProps
} from "@mui/material/AccordionSummary"
import CouponIcon from "@components/icons/CouponIcon"
import useGetCoupon from "@feature/coupon/containers/hook/useGetCoupon"
import { useToast } from "@feature/toast/containers"
import { motion } from "framer-motion"
import useProfileStore from "@stores/profileStore"
import { MESSAGES } from "@constants/messages"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import TextfieldDetailContent from "../molecules/TextfieldDetailContent"
import ChipsLink from "../molecules/ChipsLink"

interface ICharacterCoupon {
  couponLength: number
  disableCoupon: boolean
}

interface IProp {
  type: TNFTType
  id?: string
  token?: string | number
  title?: string
  method?: "buy" | "mint"
  position?: {
    x: string
    y: string
  }
  itemAmount?: number
  price?: number
  qrCode?: string
  durability?: string
  count?: {
    helperText?: string
    label?: string
    min: number
    max: number
    count: number
  }
  children?: React.ReactNode
  redemption?: boolean
  sellingType?: {
    title?: string
    color?:
      | "default"
      | "info"
      | "primary"
      | "secondary"
      | "error"
      | "success"
      | "warning"
  }
}

const RightDetailsMarketplace = ({
  type,
  id,
  token,
  title,
  method,
  position,
  itemAmount,
  price,
  qrCode,
  durability,
  count,
  children,
  redemption,
  sellingType
}: IProp) => {
  const router = useRouter()
  const profile = useProfileStore((state) => state.profile.data)
  const { shortenString } = Helper
  const getPathnameType = router.pathname.split("/")[2]
  const [expanded, setExpanded] = React.useState<string | false>("")
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }
  const handleType = () => {
    const pathMap = {
      building: "building",
      game: "game assets",
      material: "material",
      "naka-punk": "nft",
      "arcade-game": "arcade game",
      default: "land"
    }
    return pathMap[getPathnameType] || pathMap["default"]
  }

  const [coupon, setCoupon] = React.useState<string>("")
  const [characterCoupon, setCharacterCoupon] =
    React.useState<ICharacterCoupon>({
      couponLength: 0,
      disableCoupon: true
    })
  const { errorToast, successToast } = useToast()
  const { getRedeemCode } = useGetCoupon()

  const handleClick = () => {
    if (coupon) {
      getRedeemCode(coupon)
        .then((res) => {
          successToast(res.message)
        })
        .catch((error) => {
          errorToast(error.message)
        })
    }
    setCoupon("")
    setCharacterCoupon({
      couponLength: 0,
      disableCoupon: true
    })
  }

  const isCharactersCoupon = (_CharactersCoupon: string) => {
    if (_CharactersCoupon.length < 6) {
      setCharacterCoupon({
        couponLength: _CharactersCoupon.length,
        disableCoupon: true
      })
    } else {
      setCharacterCoupon({
        couponLength: _CharactersCoupon.length,
        disableCoupon: false
      })
    }
    setCoupon(_CharactersCoupon)
  }

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} />
  ))(() => ({
    flexDirection: "row-reverse",
    borderRadius: "20px",
    "& .MuiAccordionSummary-content": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "10px 0"
    },
    "& .Mui-expanded": {
      margin: "0px 0px 0px 0px !important"
    }
  }))

  return (
    <div className="flex w-full flex-col gap-y-5">
      {token && (
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-[6px]">
            <Chip
              label={`TOKEN ID : ${shortenString(String(token))}`}
              size="small"
              variant="outlined"
            />
            <CopyButton
              text={token as string}
              className="!bg-neutral-780"
            />
          </div>
          <ButtonClose
            onClick={() => router.back()}
            insideClassName="!bg-error-main hover:bg-error-main"
          />
        </div>
      )}
      <Typography className="text-[46px] font-bold uppercase text-neutral-300">
        {title}
      </Typography>
      <div className="w-ful flex flex-col gap-y-6 rounded-3xl border-neutral-800 bg-neutral-780 py-7 px-[42px] uppercase">
        <div className="flex items-center gap-5">
          <Typography className="text-neutral-300">{method}</Typography>
          <Chip
            label={handleType()}
            size="small"
            color="info"
          />
          {sellingType && (
            <Chip
              label={sellingType.title}
              variant="filled"
              size="small"
              className="cursor-pointer uppercase"
              color={sellingType.color || "info"}
            />
          )}
        </div>
        <Divider className="!block border-[1px] border-neutral-800" />
        <TextfieldDetailContent
          type={type}
          position={position}
          itemAmount={itemAmount}
          price={price}
          count={count}
        />
        {qrCode && id && (
          <>
            <div className="flex h-[158px] w-full gap-1 rounded-lg bg-primary-main p-1">
              <div className="w-3/4">map</div>
              <div className="relative flex w-1/4 items-center justify-center rounded bg-neutral-800">
                <Image
                  src={qrCode}
                  alt={`QRCode ${token}`}
                  width={80}
                  height={80}
                />
                <a
                  href={`${CONFIGS.BASE_URL.NAKAVERSE}/nft-land/${id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Chip
                    className="absolute bottom-0 right-0 cursor-pointer"
                    label="LAND INFO"
                    color="primary"
                    size="small"
                    deleteIcon={
                      <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />
                    }
                    onDelete={() => null}
                  />
                </a>
              </div>
            </div>
            <ChipsLink id={id} />
          </>
        )}
        {durability && (
          <Typography className="text-[46px] font-bold uppercase text-neutral-300">
            {durability}
          </Typography>
        )}
        <Divider className="!block border-[1px] border-neutral-800" />

        <div>{children}</div>
      </div>
      {redemption && (
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className="static rounded-md border-neutral-800 bg-neutral-780 px-[26px]"
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography className="text-neutral-300">
              REDEMPTION CODE
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
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-row items-center">
              <TextField
                className="mr-4 w-2/3"
                required
                type="text"
                value={coupon}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    width: "100%"
                  }
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z0-9]/gi, "")
                  isCharactersCoupon(e.target.value)
                }}
                id="username-create"
                placeholder="Ex. naka12345"
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
              <Button
                disabled={!profile || characterCoupon.disableCoupon}
                sx={{ fontFamily: "neueMachina" }}
                color="secondary"
                className="btn-rainbow-theme w-1/3 text-sm"
                variant="contained"
                size="large"
                type="submit"
                onClick={handleClick}
              >
                Redeem
              </Button>
            </div>
            {characterCoupon.disableCoupon &&
              characterCoupon.couponLength > 0 && (
                <motion.div
                  initial={{ opacity: 0, marginBottom: 0 }}
                  animate={{
                    opacity: 1,
                    marginTop: 10
                  }}
                >
                  <Alert
                    severity="warning"
                    className="rounded-lg"
                  >
                    The coupon must contain at least 6 characters.
                  </Alert>
                </motion.div>
              )}
            {!profile && (
              <Alert
                className="mt-3 !rounded-sm text-primary-main"
                variant="filled"
                severity="error"
              >
                {MESSAGES.please_login}
              </Alert>
            )}
          </AccordionDetails>
        </Accordion>
      )}
      <div className="flex flex-row items-center" />
    </div>
  )
}

export default RightDetailsMarketplace

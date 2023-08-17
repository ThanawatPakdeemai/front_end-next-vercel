import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Alert
} from "@mui/material"
import { motion } from "framer-motion"
import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import dynamic from "next/dynamic"
import useRedeem from "@feature/marketplace/hooks/useRedeem"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import { MESSAGES } from "@constants/messages"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface ICharacterCoupon {
  couponLength: number
  disableCoupon: boolean
}

interface IProp {
  onRedeem?: (_coupon: string) => void
  type: TNFTType
  token?: string
  evmAddress?: string
}

const RedemptionCode = ({ type, token, evmAddress }: IProp) => {
  const { setOpen, setClose } = useLoadingStore()
  const { onSubmitRedeemByType } = useRedeem()
  const [expanded, setExpanded] = React.useState<string | false>("")
  const [coupon, setCoupon] = React.useState<string>("")
  const [characterCoupon, setCharacterCoupon] =
    React.useState<ICharacterCoupon>({
      couponLength: 0,
      disableCoupon: true
    })
  const { profile } = useProfileStore()

  const { t } = useTranslation()

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
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

  const handleClick = async () => {
    // if (onRedeem) {
    //   await onRedeem(coupon)
    // }
    setOpen()
    if (profile.data)
      onSubmitRedeemByType({
        type,
        code: coupon,
        playerId: profile.data.id,
        token,
        addrs: evmAddress
      })
    setCoupon("")
    setCharacterCoupon({
      couponLength: 0,
      disableCoupon: true
    })
    setClose()
  }

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      className="static mt-4 rounded-md border-neutral-800 bg-neutral-780 px-[26px]"
      sx={{
        backgroundImage: "none"
      }}
    >
      <AccordionSummary
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <div className="relative flex h-10 w-full items-center justify-between">
          <Typography className="flex-1 text-[14px] text-neutral-300 sm:text-lg">
            REDEMPTION CODE
          </Typography>
          <Link
            href="https://files.naka.im/pdf/HowtoRedeem.pdf"
            target="_blank"
          >
            <Typography className="z-50 mr-6 font-neue-machina text-xs uppercase text-secondary-main">
              How to redeem
            </Typography>
          </Link>
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
        <div className="flex flex-row items-center">
          <TextField
            className="mr-4 w-2/3"
            required
            type="text"
            value={coupon}
            sx={{
              "& .MuiOutlinedInput-root": {
                width: "100%"
              },
              "& input": {
                color: "#70727B"
              }
            }}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.replace(/[^A-Za-z0-9]/gi, "")
              isCharactersCoupon(e.target.value)
            }}
            id="redeem-field"
            placeholder="e.g. naka12345"
            size="medium"
            InputProps={{
              style: {
                fontFamily: "neueMachina",
                borderColor: "#232329"
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
          <Button
            disabled={!profile || characterCoupon.disableCoupon}
            sx={{ fontFamily: "neueMachina" }}
            color="secondary"
            className="btn-rainbow-theme !h-10 !min-w-[80px] text-sm sm:!min-w-[180px]"
            variant="contained"
            size="large"
            type="submit"
            onClick={handleClick}
          >
            Redeem
          </Button>
        </div>
        {characterCoupon.disableCoupon && characterCoupon.couponLength > 0 && (
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
              {t("coupon_warning")}
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
  )
}

export default memo(RedemptionCode)

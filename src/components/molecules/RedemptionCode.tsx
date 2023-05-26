import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import CouponIcon from "@components/icons/CouponIcon"
import { MESSAGES } from "@constants/messages"
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
import useProfileStore from "@stores/profileStore"
import { motion } from "framer-motion"
import React, { memo } from "react"
import { useTranslation } from "react-i18next"
import { useToast } from "@feature/toast/containers"
import useGetCoupon from "@feature/coupon/containers/hook/useGetCoupon"

interface ICharacterCoupon {
  couponLength: number
  disableCoupon: boolean
}

const RedemptionCode = () => {
  const [expanded, setExpanded] = React.useState<string | false>("")
  const [coupon, setCoupon] = React.useState<string>("")
  const [characterCoupon, setCharacterCoupon] =
    React.useState<ICharacterCoupon>({
      couponLength: 0,
      disableCoupon: true
    })
  const { profile } = useProfileStore()
  const { getRedeemCode } = useGetCoupon()
  const { errorToast, successToast } = useToast()

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
    if (coupon) {
      await getRedeemCode(coupon)
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
          <Typography className="text-neutral-300">REDEMPTION CODE</Typography>
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

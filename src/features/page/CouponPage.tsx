import React, { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import useGetCoupon from "@feature/coupon/containers/hook/useGetCoupon"
import { useToast } from "@feature/toast/containers"
import useProfileStore from "@stores/profileStore"
import { MESSAGES } from "@constants/messages"

const Alert = dynamic(() => import("@mui/material/Alert"), {
  suspense: true,
  ssr: false
})
const Button = dynamic(() => import("@mui/material/Button"), {
  suspense: true,
  ssr: false
})
const InputAdornment = dynamic(() => import("@mui/material/InputAdornment"), {
  suspense: true,
  ssr: false
})
const TextField = dynamic(() => import("@mui/material/TextField"), {
  suspense: true,
  ssr: false
})
const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface ICharacterCoupon {
  couponLength: number
  disableCoupon: boolean
}

const CouponPage = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const [coupon, setCoupon] = useState<string>("")
  const [characterCoupon, setCharacterCoupon] = useState<ICharacterCoupon>({
    couponLength: 0,
    disableCoupon: true
  })
  const { errorToast, successImageToast } = useToast()
  const { getRedeemCode } = useGetCoupon()

  const { t } = useTranslation()

  const handleClick = () => {
    if (coupon) {
      getRedeemCode(coupon)
        .then((res) => {
          if (res.status) {
            successImageToast(
              res.data[0].item_name,
              res.data[0].image,
              res.data[0].item_size,
              res.data[0].collect_qty
            )
          }
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

  return (
    <div className="relative z-10 w-[calc(100%)] px-[10%]">
      <div className="grid max-w-[678px] rounded-lg border border-neutral-800 bg-neutral-780 md:grid-cols-2 lg:grid-cols-2">
        <div className="p-12 sm:p-11 lg:p-11">
          <Typography className="text-sm">{}</Typography>
          <Typography className="mb-[10px] mt-[20px] font-neue-machina text-xs uppercase text-neutral-500">
            {t("coupon_code")}
          </Typography>
          <TextField
            className="mb-5 w-full"
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
                  <Icomoon className="icon-Ticket" />
                </InputAdornment>
              ),
              inputProps: {
                pattern: "[a-zA-Z0-9]"
              }
            }}
          />
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
                  {t("coupon_warning")}
                </Alert>
              </motion.div>
            )}

          <Button
            disabled={!profile || characterCoupon.disableCoupon}
            sx={{ fontFamily: "neueMachina" }}
            color="secondary"
            className="btn-rainbow-theme mt-[20px] w-full text-sm"
            variant="contained"
            size="large"
            type="submit"
            onClick={handleClick}
          >
            {t("redeem")}
          </Button>
          {!profile && (
            <Alert
              className="mt-3 !rounded-sm text-primary-main"
              variant="filled"
              severity="error"
            >
              {t(MESSAGES.please_login)}
            </Alert>
          )}
        </div>
        <div className="flex justify-center pb-12 sm:p-8">
          <Image
            src="/images/coupon.svg"
            alt="coupon"
            width={220}
            height={220}
          />
        </div>
      </div>
    </div>
  )
}

export default CouponPage

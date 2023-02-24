import { Button, InputAdornment, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import CouponIcon from "@components/icons/CouponIcon"
import { Image } from "@components/atoms/image"
import useGetCoupon from "@feature/coupon/containers/hook/useGetCoupon"
import { useToast } from "@feature/toast/containers"

const CouponPage = () => {
  const [coupon, setCoupon] = useState<string>("")
  const { errorToast, successToast } = useToast()
  const { getRedeemCode } = useGetCoupon()

  const handleClick = (event) => {
    if (coupon) {
      getRedeemCode(coupon)
        .then((res) => {
          successToast(res.message)
        })
        .catch((error) => {
          errorToast(error.message)
        })
    }
    setCoupon(event.target.value)
  }
  return (
    <div className="relative z-10 w-[calc(100%)] px-[10%]">
      <div className="grid max-w-[678px] rounded-lg border border-neutral-800 bg-neutral-780 md:grid-cols-2 lg:grid-cols-2">
        <div className="p-12 sm:p-11 lg:p-11">
          <Typography className="text-sm">
            REDEEM AND START HAVING FUN!
          </Typography>
          <Typography className="mt-[20px] mb-[10px] font-neue-machina text-xs uppercase text-neutral-500">
            enter coupon code
          </Typography>
          <TextField
            className="mb-5 w-full"
            required
            type="text"
            sx={{
              "& .MuiOutlinedInput-root": {
                width: "100%"
              }
            }}
            value={coupon}
            onChange={(event) => {
              let { value } = event.target
              value = value.replace(/[^A-Za-z0-9]/gi, "")
              setCoupon(value)
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
              )
            }}
          />
          <Button
            sx={{ fontFamily: "neueMachina" }}
            color="secondary"
            className="btn-rainbow-theme mt-[20px] w-full text-sm"
            variant="contained"
            size="large"
            type="submit"
            onClick={handleClick}
          >
            Redeem
          </Button>
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

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
    <div className="grid w-3/4 grid-cols-2 rounded-lg border border-neutral-700 bg-neutral-800">
      <div className="p-14">
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
      <div className="flex justify-center">
        <Image
          src="/images/coupon.svg"
          alt="coupon"
          width={220}
          height={220}
        />
      </div>
    </div>
  )
}

export default CouponPage

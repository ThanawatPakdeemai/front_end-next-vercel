import { Button, InputAdornment, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import CouponIcon from "@components/icons/CouponIcon"
import Image from "next/image"
// import useGetCoupon from "@feature/coupon/containers/hook/useGetCoupon"

const CouponPage = () => {
  const [coupon, setCoupon] = useState<string>("")
  // const { useGetCouponRedeem, refetch } = useGetCoupon(coupon)
  // const { useGetCouponRedeem } = useGetCoupon()

  const handleClick = (event) => {
    setCoupon(event.target.value)
    // refetch()
    // event.preventDefault()

    // eslint-disable-next-line no-console
    console.log("handleClick 👉️", coupon)
    // console.log("useGetCouponRedeem 👉️", useGetCouponRedeem?.message)
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

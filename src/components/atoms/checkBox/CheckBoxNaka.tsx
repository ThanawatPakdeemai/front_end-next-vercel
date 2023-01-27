/* eslint-disable jsx-a11y/label-has-associated-control */

import { Box, Checkbox, Typography } from "@mui/material"
import React, { memo } from "react"

interface IProp {
  value: boolean
  onHandle: (_event?: React.ChangeEvent<HTMLInputElement>) => void
  text?: string
  className?: string
}
const CheckBoxNaka = ({ value, onHandle, text, className }: IProp) => (
  <>
    <label className={`${className} flex`}>
      <Checkbox
        id="subscribe"
        defaultChecked={value}
        onChange={onHandle}
        icon={
          <Box className=" h-[20px] w-[20px]  rounded-[6px] border-2 border-neutral-600  ">
            <Box className=" m-[2px] h-[12px] w-[12px]  rounded-[2px]  bg-neutral-700" />
          </Box>
        }
        color="secondary"
        checkedIcon={
          <Box className=" h-[20px] w-[20px]  rounded-[6px] border-2 border-neutral-600  ">
            <Box className=" m-[2px] h-[12px] w-[12px]  rounded-[2px] bg-secondary-main" />
          </Box>
        }
      />
      <Typography className="cursor-pointer font-neue-machina text-sm text-neutral-500">
        {text ?? ""}
      </Typography>
    </label>
  </>
)
export default memo(CheckBoxNaka)

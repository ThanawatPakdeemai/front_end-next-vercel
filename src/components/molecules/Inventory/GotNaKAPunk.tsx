import ButtonIcon from "@components/atoms/button/ButtonIcon"
import CopyMiniIcon from "@components/icons/Referral/CoopyMiniIcon"
import { Chip, Typography } from "@mui/material"
import React from "react"

interface IProp {
  address: string
  token_id: string
}

const GotNaKAPunk = ({ address, token_id }: IProp) => (
  <div>
    <div className="my-[21px] grid grid-cols-2">
      <div className="flex items-center">
        <Typography className="mr-2 text-xs uppercase text-white-primary">
          address :
        </Typography>
        <Chip
          label={address}
          variant="outlined"
          size="small"
          className="max-w-[113px] cursor-pointer uppercase"
        />
        <ButtonIcon
          onClick={() => {}}
          className="ml-2 flex !h-[25px] !w-[25px] items-center justify-center rounded-[4px] border border-neutral-700 bg-neutral-900"
          icon={<CopyMiniIcon />}
        />
      </div>
      <div className="flex items-center">
        <Typography className="mr-2 text-xs uppercase text-white-primary">
          token id :
        </Typography>
        <Chip
          label={token_id}
          variant="outlined"
          size="small"
          className="max-w-[113px] cursor-pointer uppercase"
        />
        <ButtonIcon
          onClick={() => {}}
          className="ml-2 flex !h-[25px] !w-[25px] items-center justify-center rounded-[4px] border border-neutral-700 bg-neutral-900"
          icon={<CopyMiniIcon />}
        />
      </div>
    </div>
    <Typography
      variant="button"
      onClick={() => {}}
      className="cursor-pointer text-xs uppercase text-purple-primary"
    >
      view transaction
    </Typography>
  </div>
)

export default GotNaKAPunk

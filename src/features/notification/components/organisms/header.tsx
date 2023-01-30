import React, { memo } from "react"
import { Chip } from "@mui/material"
import { ButtonAllAsRead } from "../molecules/buttonAllAsRead"

interface IProps {
  unread: number
}
const Header = ({ unread }: IProps) => (
  <div className="mb-8 flex justify-between">
    <h1 className="py-2 text-2xl uppercase">noticfications</h1>
    <div className="flex gap-4">
      <Chip
        label={`unread ${unread}`}
        size="small"
        color="error"
        className="my-3 font-bold uppercase "
      />
      <ButtonAllAsRead />
    </div>
  </div>
)
export default memo(Header)

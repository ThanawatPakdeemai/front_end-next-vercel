import { Typography } from "@mui/material"
import React from "react"

interface IEventMessagesProp {
  messages: string
}
const EventMessages = ({ messages }: IEventMessagesProp) => (
  <div className="rounded-md border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 font-neue-machina-bold md:my-2  md:px-16 md:py-8 md:text-center md:text-base">
    <Typography className=" text-green-default font-dogicapixel-bold text-center text-[15px] uppercase">
      {messages}
    </Typography>
  </div>
)

export default EventMessages

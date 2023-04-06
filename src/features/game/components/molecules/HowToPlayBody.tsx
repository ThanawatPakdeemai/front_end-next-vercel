import { Typography } from "@mui/material"
import React from "react"

interface IProps {
  text: string
}

const HowToPlayBody = ({ text }: IProps) => (
  <div
    id="game--how-to-play"
    className="mb-4 flex gap-10"
  >
    <Typography
      className="mb-0"
      variant="body1"
      dangerouslySetInnerHTML={{
        __html: text
      }}
    />
  </div>
)

export default HowToPlayBody

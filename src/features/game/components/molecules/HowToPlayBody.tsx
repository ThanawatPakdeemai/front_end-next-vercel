import React from "react"
import { Box } from "@mui/material"

interface IProps {
  text: string
}

const HowToPlayBody = ({ text }: IProps) => (
  <div
    id="game--how-to-play"
    className="mb-4 flex gap-10"
  >
    <Box
      className="wysiwyg mb-0"
      component="div"
      dangerouslySetInnerHTML={{
        __html: text
      }}
    />
  </div>
)

export default HowToPlayBody

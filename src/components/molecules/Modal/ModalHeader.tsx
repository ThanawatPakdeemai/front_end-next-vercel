import ButtonClose from "@components/atoms/button/ButtonClose"
import { Box, Divider, Typography } from "@mui/material"
import React, { ReactNode, memo } from "react"
import { useTranslation } from "react-i18next"

interface IProp {
  handleClose: () => void
  title: string | ReactNode
  bg?: string
}
const ModalHeader = ({ handleClose, title, bg }: IProp) => {
  const { t } = useTranslation()

  return (
    <>
      <Box className={`flex items-center justify-between ${bg}`}>
        <Typography className="text-lg text-neutral-300">
          {t(title as string)}
        </Typography>
        <div
          className={`${
            title === "Buy Assets"
              ? "rounded-xl border border-neutral-700 py-2 "
              : ""
          }`}
        >
          <ButtonClose onClick={() => handleClose()} />
        </div>
      </Box>
      {title === "Buy Assets" ? <></> : <Divider />}
    </>
  )
}
export default memo(ModalHeader)

import React from "react"
import { Box, Typography } from "@mui/material"
interface Props {
  title: string
  children: React.ReactNode
}

const ModalWithHeaderTemplate = ({ title, children }: Props) => {
  return (
    <Box
      component="div"
      className="categories-list flex flex-col p-[8px_24px_36px]"
      sx={{
        width: "100%",
        maxHeight: "calc(100vh - 240px)",
        h2: {
          padding: "30px 0",
          borderBottom: "1px solid #35383F"
        }
      }}
    >
      {title && (
        <h2 className="py-[30px] text-center font-urbanist text-[24px] font-bold text-warning-100">
          {title}
        </h2>
      )}

      <Box
        component="div"
        className="flex flex-col"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0px",
          "button + button": {
            borderTop: "1px solid #35383F"
          }
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default ModalWithHeaderTemplate

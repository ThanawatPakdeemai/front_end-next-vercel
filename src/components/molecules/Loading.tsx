import { isMobile } from "@hooks/useGlobal"
import Preload from "@mobile/components/atoms/Preload"
import { Backdrop, Typography } from "@mui/material"
import useLoadingStore from "@stores/loading"
import React from "react"

const Loading = () => {
  const { open, message } = useLoadingStore()

  const renderLoading = () => {
    if (isMobile) {
      return <Preload />
    }
    return (
      <div>
        <Backdrop
          className="flex flex-col gap-10"
          sx={{
            color: "#fff",
            zIndex: 99999,
            backgroundColor: "rgba(0, 0, 0, 0.8)"
          }}
          open={open}
        >
          <div className="lds-grid">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <Typography className="font-neue-machina uppercase">
            {message}
          </Typography>
        </Backdrop>
      </div>
    )
  }

  return renderLoading()
}

export default Loading

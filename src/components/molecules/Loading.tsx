import { Backdrop, Typography } from "@mui/material"
import useLoadingStore from "@stores/loading"
import React from "react"

const Loading = () => {
  const { open, message } = useLoadingStore()
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

export default Loading

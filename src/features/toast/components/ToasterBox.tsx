import React from "react"
import { Toaster, DefaultToastOptions } from "react-hot-toast"

const toastOptions: DefaultToastOptions = {
  duration: 5000,
  style: {
    maxWidth: "564px",
    width: "max-content",
    background: "transparent",
    borderRadius: "8px",
    padding: 0,
    margin: 0,
    boxShadow: "0 0 0 0px"
  }
}

const ToasterBox = () => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={toastOptions}
  />
)

export default ToasterBox

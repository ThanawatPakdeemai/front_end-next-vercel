import React from "react"
import type { ThemeOptions } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"

import { theme } from "@src/styles/themes/darkTheme"

import "../styles/globals.css"
import "../styles/css/common.css"
import "../styles/fonts.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
  const customTheme = createTheme(theme as ThemeOptions)
  return (
    <ThemeProvider theme={customTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

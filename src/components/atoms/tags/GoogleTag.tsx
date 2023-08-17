/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-curly-brace-presence */
import Script from "next/script"
import React from "react"

export const GA_MEASUREMENT_ID = "GTM-PGN7G2V"

const GoogleTag = () => (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
    />
    <Script id="google-analytics">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', ${GA_MEASUREMENT_ID});
        `}
    </Script>
  </>
)

export default GoogleTag

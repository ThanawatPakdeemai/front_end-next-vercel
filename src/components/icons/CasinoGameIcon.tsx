import React from "react"

const CasinoGameIcon = ({
  width = 24,
  height = 24,
  className,
  stroke
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11 5.32356C11.3263 5.27511 11.6602 5.25 12 5.25C12.3398 5.25 12.6737 5.27511 13 5.32356M11 5.32356V2.04938M11 5.32356C8.07259 5.7583 5.7583 8.07259 5.32356 11M11 2.04938C11.3289 2.01672 11.6625 2 12 2C12.3375 2 12.6711 2.01672 13 2.04938M11 2.04938C6.27558 2.51844 2.51844 6.27558 2.04938 11M13 2.04938V5.32356M13 2.04938C17.7244 2.51844 21.4816 6.27558 21.9506 11M13 5.32356C15.9274 5.7583 18.2417 8.07259 18.6764 11M5.32356 11C5.27511 11.3263 5.25 11.6602 5.25 12C5.25 12.3398 5.27511 12.6737 5.32356 13M5.32356 11H2.04938M2.04938 11C2.01672 11.3289 2 11.6625 2 12C2 12.3375 2.01672 12.6711 2.04938 13M5.32356 13H2.04938M5.32356 13C5.7583 15.9274 8.07259 18.2417 11 18.6764M2.04938 13C2.51844 17.7244 6.27558 21.4816 11 21.9506M11 18.6764C11.3263 18.7249 11.6602 18.75 12 18.75C12.3398 18.75 12.6737 18.7249 13 18.6764M11 18.6764V21.9506M11 21.9506C11.3289 21.9833 11.6625 22 12 22C12.3375 22 12.6711 21.9833 13 21.9506M13 18.6764V21.9506M13 18.6764C15.9274 18.2417 18.2417 15.9274 18.6764 13M13 21.9506C17.7244 21.4816 21.4816 17.7244 21.9506 13M18.6764 11C18.7249 11.3263 18.75 11.6602 18.75 12C18.75 12.3398 18.7249 12.6737 18.6764 13M18.6764 11H21.9506M21.9506 11C21.9833 11.3289 22 11.6625 22 12C22 12.3375 21.9833 12.6711 21.9506 13M18.6764 13H21.9506"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <path
      d="M11.5 9.5H8.5V11.5H9.5C10.3284 11.5 11 12.1716 11 13C11 13.8284 10.3284 14.5 9.5 14.5H8M13 11V13C13 13.8284 13.6716 14.5 14.5 14.5C15.3284 14.5 16 13.8284 16 13V11C16 10.1716 15.3284 9.5 14.5 9.5C13.6716 9.5 13 10.1716 13 11Z"
      stroke={stroke}
    />
  </svg>
)

export default CasinoGameIcon
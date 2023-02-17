import React from "react"

const WalletIcon = ({
  width = 24,
  height = 24,
  stroke = "#E1E2E2"
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 13H10C9.44772 13 9 12.5523 9 12V6C9 5.44772 9.44772 5 10 5H17M17 13C17.5523 13 18 12.5523 18 12V6C18 5.44772 17.5523 5 17 5M17 13V16C17 16.5523 16.5523 17 16 17H2C1.44772 17 1 16.5523 1 16V2C1 1.44772 1.44772 1 2 1H16C16.5523 1 17 1.44772 17 2V5"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default WalletIcon

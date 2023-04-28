import React from "react"

const ShootingGameIcon = ({
  width = 25,
  height = 24,
  className,
  stroke = "#E1E2E2"
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.625 8.62499L21 12L17.625 15.375M8.625 17.625L12 21L15.375 17.625M8.625 6.375L12 3L15.375 6.375M6.37501 8.62499L3.00001 12L6.37501 15.375"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default ShootingGameIcon

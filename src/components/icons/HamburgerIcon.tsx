import React from "react"

const HamburgerIcon = ({
  fill = "#F42728",
  width = 12,
  height = 12,
  className
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="3"
      y="4"
      width="6"
      height="1"
      fill={fill}
    />
    <rect
      x="3"
      y="7"
      width="6"
      height="1"
      fill={fill}
    />
  </svg>
)

export default HamburgerIcon

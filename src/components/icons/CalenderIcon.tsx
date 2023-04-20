import React from "react"

function CalenderIcon({
  width = 20,
  height = 21,
  stroke = "#70727B"
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 7.95V4C19 3.44772 18.5523 3 18 3H15M19 7.95H1M19 7.95V19C19 19.5523 18.5523 20 18 20H2C1.44772 20 1 19.5523 1 19V7.95M1 7.95V4C1 3.44772 1.44772 3 2 3H5M5 3V0M5 3H15M15 3V0M16 17H11V13H16V17Z"
        stroke={stroke}
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default CalenderIcon

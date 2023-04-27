import React from "react"

function CalendarSolidIcon({
  width = 24,
  height = 24,
  stroke = "#E1E2E2"
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
        d="M21 8.95V5C21 4.44772 20.5523 4 20 4H17M21 8.95H3M21 8.95V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V8.95M3 8.95V5C3 4.44772 3.44772 4 4 4H7M7 4V1M7 4H17M17 4V1M16.5 11.5L11 17L8 14"
        stroke={stroke}
        stroke-width="1.2"
      />
    </svg>
  )
}

export default CalendarSolidIcon

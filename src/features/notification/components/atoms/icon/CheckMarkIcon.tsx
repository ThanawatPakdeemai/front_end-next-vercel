import React from "react"

function CheckMarkIcon({
  width = 24,
  height = 24
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="9.4"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
      <path
        d="M7 12L10.4375 15L17 8.5"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default CheckMarkIcon

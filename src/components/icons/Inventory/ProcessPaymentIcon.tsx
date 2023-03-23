import React from "react"

function ProcessPaymentIcon({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 17V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V15M2 17V5C2 4.44772 2.44772 4 3 4H21C21.5523 4 22 4.44772 22 5V15M2 17L7 12M22 15L18 11M16 11L13 14M11 14L9 12"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
      <circle
        cx="17"
        cy="10"
        r="1.4"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
      <circle
        cx="12"
        cy="15"
        r="1.4"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
      <circle
        cx="8"
        cy="11"
        r="1.4"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default ProcessPaymentIcon

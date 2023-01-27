import * as React from "react"

const CheckMarkIcon = ({
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
    <circle
      cx={12}
      cy={12}
      r={9.4}
      stroke={stroke || "#E1E2E2"}
      strokeWidth={1.2}
    />
    <path
      d="M7 12L10.4375 15L17 8.5"
      stroke={stroke || "#E1E2E2"}
      strokeWidth={1.2}
    />
  </svg>
)
export default CheckMarkIcon

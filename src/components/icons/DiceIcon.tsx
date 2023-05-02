import React from "react"

const DiceIcon = ({
  width = 24,
  height = 24,
  className,
  stroke = "#E1E2E2"
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
      x="4"
      y="4"
      width="16"
      height="16"
      rx="1"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <circle
      cx="12"
      cy="12"
      r="1.5"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <circle
      cx="16.5"
      cy="16.5"
      r="1.5"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <circle
      cx="7.5"
      cy="16.5"
      r="1.5"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <circle
      cx="16.5"
      cy="7.5"
      r="1.5"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <circle
      cx="7.5"
      cy="7.5"
      r="1.5"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default DiceIcon

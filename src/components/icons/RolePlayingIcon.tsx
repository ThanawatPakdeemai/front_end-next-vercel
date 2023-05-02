import React from "react"

const RolePlayingIcon = ({
  width = 24,
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
      d="M2 1V4M2 23V20M22 1V4M22 23V20M2 4H6M2 4V8M6 4V2H18V4M6 4V8M2 8H6M2 8V12M6 8V12M2 12H6M2 12V16M6 12V16M2 16H6M2 16V20M6 16V20M2 20H6M6 20V22H18V20M18 4H22M18 4V8M22 4V8M18 8H22M18 8V12M22 8V12M18 12H22M18 12V16M22 12V16M18 16H22M18 16V20M22 16V20M18 20H22"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default RolePlayingIcon

import * as React from "react"

const FlagIcon = ({
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
    <path
      d="M4 23V13M4 13V3H12L13 5H20V15H13L12 13H4Z"
      stroke={stroke || "#70727B"}
      strokeWidth={1.2}
    />
  </svg>
)

export default FlagIcon

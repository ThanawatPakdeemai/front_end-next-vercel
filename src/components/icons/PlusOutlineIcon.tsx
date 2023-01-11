import React from "react"

const PlusOutlineIcon = ({
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
      d="M17 12H12M7 12H12M12 12V7M12 12V17M4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21Z"
      stroke={stroke || "#E1E2E2"}
      strokeWidth={1.2}
    />
  </svg>
)
export default PlusOutlineIcon

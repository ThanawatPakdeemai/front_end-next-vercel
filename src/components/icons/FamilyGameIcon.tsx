import React from "react"

const FamilyGameIcon = ({
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
    <path
      d="M3.44853 11.4L12 2.84853L20.5515 11.4H20H19.4V12V21.4H14.1V15V14.4H13.5H10.5H9.9V15V21.4H4.6V12V11.4H4H3.44853Z"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default FamilyGameIcon

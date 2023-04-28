import React from "react"

const SimulativeGameIcon = ({
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
    <mask
      id="mask0_10019_40586"
      maskUnits="userSpaceOnUse"
      x="3"
      y="7"
      width="14"
      height="14"
    >
      <path
        d="M3 21V7H4.86667V19.1333H17V21H3Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_10019_40586)">
      <rect
        x="3.6"
        y="7.6"
        width="12.8"
        height="12.8"
        rx="1.4"
        stroke={stroke}
        strokeWidth="1.2"
      />
    </g>
    <path
      d="M7.6 5C7.6 4.2268 8.2268 3.6 9 3.6H19C19.7732 3.6 20.4 4.2268 20.4 5V15C20.4 15.7732 19.7732 16.4 19 16.4H9C8.2268 16.4 7.6 15.7732 7.6 15V5Z"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default SimulativeGameIcon

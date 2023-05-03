import React from "react"

const WordGameIcon = ({
  width = 25,
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
      d="M22.3555 13L16.8555 18.5L13.8555 15.5"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <mask
      id="mask0_10019_40619"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="25"
      height="16"
    >
      <path
        d="M0.855469 0H24.8555V13H10.8555V16H0.855469V0Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_10019_40619)">
      <path
        d="M17.8555 17L15.9805 12M7.85547 17L9.73047 12M9.73047 12L12.3555 5H13.3555L15.9805 12M9.73047 12H15.9805"
        stroke={stroke}
        strokeWidth="1.2"
      />
    </g>
  </svg>
)

export default WordGameIcon

import React from "react"

const BoardGameIcon = ({
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
    <g clipPath="url(#clip0_10019_40549)">
      <path
        d="M1.40521 22.595V1.40527H22.595V22.595H1.40521Z"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M22 3H18M14 3H10M18 7H14M10 5H14M6 3H2M10 7H6M6 5H2M22 11H18M18 13H22M14 11H10M18 15H14M6 11H2M10 15H6M14 13H10M6 13H2M18 9H14M10 9H6M22 19H18M14 19H10M6 19H2M18 17H14M10 17H6M6 21H2M10 21H14M18 21H22M18 5H22"
        stroke={stroke}
        strokeWidth="2"
      />
    </g>
    <defs>
      <clipPath id="clip0_10019_40549">
        <rect
          width="24"
          height="24"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
)

export default BoardGameIcon

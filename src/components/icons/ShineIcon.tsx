import React from "react"

const ShineIcon = ({
  width = 16,
  height = 16,
  fill
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_11130_63986)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.57144 0L7.42857 0V6.62045L2.74721 1.93908L1.93909 2.74721L6.62045 7.42857H0L0 8.57144H6.62044L1.93909 13.2528L2.74721 14.0609L7.42857 9.37952V16H8.57144V9.37952L13.2528 14.0609L14.0609 13.2528L9.37952 8.57144H16V7.42857H9.37952L14.0609 2.7472L13.2528 1.93908L8.57144 6.62044V0Z"
        fill={"#70727B" || fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_11130_63986">
        <rect
          width="16"
          height="16"
          fill={"white" || fill}
        />
      </clipPath>
    </defs>
  </svg>
)
export default ShineIcon

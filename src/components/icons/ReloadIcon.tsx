import * as React from "react"
import { SVGProps } from "react"

const ReloadIcon = ({
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
    <mask
      id="mask0_127_4201"
      style={{
        maskType: "alpha"
      }}
      maskUnits="userSpaceOnUse"
      x={2}
      y={3}
      width={20}
      height={19}
    >
      <path
        d="M18 10H22V3H2V22H22V12H18V10Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_127_4201)">
      <path
        d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C14.3894 4 16.5341 5.04751 18 6.70835"
        stroke={stroke || "#E1E2E2"}
        strokeWidth={1.2}
      />
    </g>
    <path
      d="M20.4 4.44853V9.4H15.4485L20.4 4.44853Z"
      stroke={stroke || "#E1E2E2"}
      strokeWidth={1.2}
    />
  </svg>
)
export default ReloadIcon

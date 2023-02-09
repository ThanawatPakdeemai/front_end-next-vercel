import * as React from "react"
import { SVGProps } from "react"

const CloudIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_6685_36764"
      style={{
        maskType: "alpha"
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={23}
    >
      <path
        d="M13.5 12H6L0 23V0H24V23H13.5V12Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_6685_36764)">
      <path
        d="M15.6637 8.95554L15.4387 8.39932L15.6637 8.95554C16.23 8.72644 16.8495 8.6 17.5 8.6C20.2062 8.6 22.4 10.7938 22.4 13.5C22.4 16.2062 20.2062 18.4 17.5 18.4H8.5C4.68924 18.4 1.6 15.3108 1.6 11.5C1.6 7.68924 4.68924 4.6 8.5 4.6C11.2739 4.6 13.6668 6.23689 14.763 8.60005C14.9209 8.94053 15.3178 9.09546 15.6637 8.95554Z"
        stroke="#7B5BE6"
        strokeWidth={1.2}
      />
    </g>
    <path
      d="M11 18.4211C11 19.8454 9.88071 21 8.5 21C7.11929 21 6 19.8454 6 18.4211C6 16.9967 8.5 14 8.5 14C8.5 14 11 16.9967 11 18.4211Z"
      stroke="#7B5BE6"
      strokeWidth={1.2}
    />
    <path
      d="M20.2426 9.75736L22 8L20.2426 6.24264V3.75737H17.7573L16 2L14.2426 3.75737H11.7573V5.5"
      stroke="#7B5BE6"
      strokeWidth={1.2}
    />
  </svg>
)
export default CloudIcon

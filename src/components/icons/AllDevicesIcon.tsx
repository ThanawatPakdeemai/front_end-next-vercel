import React from "react"

function AllDevicesIcon({
  width = 24,
  height = 24
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 18L0 18"
        stroke="#70727B"
        strokeWidth="1.2"
      />
      <mask
        id="mask0_2626_1723"
        maskUnits="userSpaceOnUse"
        x="1"
        y="3"
        width="22"
        height="17"
      >
        <path
          d="M1 19.5V3H23V6.5H13.5V19.5H1Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_2626_1723)">
        <path
          d="M4 5H20C20.5523 5 21 5.44772 21 6V16C21 16.5523 20.5523 17 20 17H4C3.44772 17 3 16.5523 3 16V6C3 5.44772 3.44772 5 4 5Z"
          stroke="#70727B"
          strokeWidth="1.2"
        />
      </g>
      <path
        d="M21 20L17 20C16.4477 20 16 19.5523 16 19L16 10C16 9.44772 16.4477 9 17 9L18.4 9L19.6 9L21 9C21.5523 9 22 9.44771 22 10L22 19C22 19.5523 21.5523 20 21 20Z"
        stroke="#70727B"
        strokeWidth="1.2"
      />
    </svg>
  )
}
export default AllDevicesIcon

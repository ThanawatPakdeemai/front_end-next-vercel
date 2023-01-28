import React from "react"

function OverviewIcon({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_5663_9824"
        maskUnits="userSpaceOnUse"
        x="2"
        y="2"
        width="20"
        height="20"
      >
        <path
          d="M2 2L12 2L12 9.5L13.8505 10.1495L22 2L22 22L2 22L2 2Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_5663_9824)">
        <circle
          cx="12"
          cy="12"
          r="9.4"
          stroke="#E1E2E2"
          stroke-width="1.2"
        />
        <circle
          cx="12"
          cy="12"
          r="5.4"
          stroke="#E1E2E2"
          stroke-width="1.2"
        />
        <circle
          cx="12"
          cy="12"
          r="1.4"
          stroke="#E1E2E2"
          stroke-width="1.2"
        />
      </g>
      <path
        d="M12 11L12 2"
        stroke="#010101"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default OverviewIcon

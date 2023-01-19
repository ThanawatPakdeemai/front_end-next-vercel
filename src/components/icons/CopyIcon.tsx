import React from "react"

function CopyIcon({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_4763_12998"
        style={{
          maskType: "alpha"
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="11"
        width="24"
        height="12"
      >
        <path
          d="M12 19.5L0 11.5V23H24V11.5L12 19.5Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_4763_12998)">
        <path
          d="M3 15L12 9L21 15L12 21L3 15Z"
          stroke="#E1E2E2"
          stroke-width="1.2"
        />
      </g>
      <path
        d="M3 10L12 4L21 10L12 16L3 10Z"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default CopyIcon

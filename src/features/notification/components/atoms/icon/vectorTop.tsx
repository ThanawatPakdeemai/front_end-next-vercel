import React from "react"

function VectorTop({
  width = 6,
  height = 4,
  color
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.35352 2.35539L4.64641 3.0625L2.99996 1.41605L1.35352 3.0625L0.646409 2.35539L2.99996 0.00183984L5.35352 2.35539Z"
        fill={color}
      />
    </svg>
  )
}
export default VectorTop

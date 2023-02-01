import React from "react"

function VectorBottom({
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
        d="M0.646484 0.707107L1.35359 0L3.00004 1.64645L4.64648 0L5.35359 0.707107L3.00004 3.06066L0.646484 0.707107Z"
        fill={color}
      />
    </svg>
  )
}
export default VectorBottom

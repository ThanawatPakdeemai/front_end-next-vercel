import React from "react"

function Ellipse({
  width = 31,
  height = 31,
  fill = "#F42728",
  stroke = "#010101"
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.5"
        cy="15"
        r="10"
        fill={fill}
        stroke={stroke}
        strokeWidth="10"
      />
    </svg>
  )
}
export default Ellipse

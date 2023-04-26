import React from "react"

function SearchIcon({
  width = 24,
  height = 24,
  stroke,
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
      <path
        d="M14 14L20 20"
        stroke={stroke || "#70727B"}
        strokeWidth={1.2}
      />
      <circle
        cx={9.5}
        cy={9.5}
        r={5.9}
        stroke={stroke || "#70727B"}
        strokeWidth={1.2}
      />
    </svg>
  )
}

export default SearchIcon

import * as React from "react"

function ArrowDownIcon({
  width = 24,
  height = 24,
  fill,
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
        d="M12 3.82324V17.8232M12 17.8232L7 12.8232M12 17.8232L17 12.8232M4 19.8232H20"
        stroke={fill || "#010101"}
        strokeWidth={1.2}
      />
    </svg>
  )
}

export default ArrowDownIcon

import React from "react"

function DesktopIcon({
  width = 20,
  height = 17,
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
        d="M5 16H10M15 16H10M10 16V13M10 13H2C1.44772 13 1 12.5523 1 12V2C1 1.44772 1.44772 1 2 1H18C18.5523 1 19 1.44772 19 2V12C19 12.5523 18.5523 13 18 13H10Z"
        stroke="#A6A9AE"
        strokeWidth="1.2"
      />
    </svg>
  )
}
export default DesktopIcon

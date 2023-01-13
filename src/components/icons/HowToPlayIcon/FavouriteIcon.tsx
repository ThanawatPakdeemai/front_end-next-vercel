import React from "react"

function FavouriteIcon({
  width = 22,
  height = 19,
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
        d="M6 1C3.23858 1 1 3.23858 1 6C1 7.12561 1.07548 8.49265 2.35671 9.98741C3.63793 11.4822 11 18.0004 11 18.0004C11 18.0004 18.3621 11.4822 19.6433 9.98741C20.9245 8.49265 21 7.12561 21 6C21 3.23858 18.7614 1 16 1C13.2386 1 11 3.23858 11 6C11 3.23858 8.76142 1 6 1Z"
        stroke="#A6A9AE"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default FavouriteIcon

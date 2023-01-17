import React from "react"

function MessageIcon({
  width = 24,
  height = 24,
  className,
  stroke = "#A6A9AE"
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 5.5H16M14 9.5H4M1 13V2C1 1.44772 1.44772 1 2 1H18C18.5523 1 19 1.44772 19 2V13C19 13.5523 18.5523 14 18 14H4.75L1.16247 16.87C1.09699 16.9224 1 16.8758 1 16.7919V13Z"
        stroke={stroke}
        stroke-width="1.2"
      />
    </svg>
  )
}

export default MessageIcon

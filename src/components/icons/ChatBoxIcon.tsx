import React from "react"

function ChatBoxIcon({
  width = 24,
  height = 24,
  stroke = "#E1E2E2",
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M6 8.5H18M16 12.5H6M3 16V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V16C21 16.5523 20.5523 17 20 17H6.75L3.16247 19.87C3.09699 19.9224 3 19.8758 3 19.7919V16Z"
        stroke={stroke}
        stroke-width="1.2"
      />
    </svg>
  )
}

export default ChatBoxIcon

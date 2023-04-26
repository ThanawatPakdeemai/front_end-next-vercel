import React from "react"

function GameStoryIcon({
  width = 24,
  height = 24,
  className,
  stroke = "#E1E2E2"
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
        d="M4 23V15M4 2.5V5M4 5H19.7586C19.8477 5 19.8923 5.10771 19.8293 5.17071L15 10L19.8293 14.8293C19.8923 14.8923 19.8477 15 19.7586 15H4M4 5V15"
        stroke={stroke}
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default GameStoryIcon

import React from "react"

function PlayHistoryIcon({
  width = 24,
  height = 24
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <path
        d="M11.4 12V12.2485L11.5757 12.4243L15.5757 16.4243L16.4243 15.5757L12.6 11.7515V5H11.4V12ZM22.4 12C22.4 17.7438 17.7438 22.4 12 22.4C6.25624 22.4 1.6 17.7438 1.6 12C1.6 6.25624 6.25624 1.6 12 1.6C17.7438 1.6 22.4 6.25624 22.4 12Z"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}

export default PlayHistoryIcon

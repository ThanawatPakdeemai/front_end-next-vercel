import React from "react"

function PlugIcon({ width = 24, height = 24 }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <path
        d="M8.5 2V8M8.5 8H6.5C5.94772 8 5.5 8.44772 5.5 9V14L10.5 19V22H14.5V19L19.5 14V9C19.5 8.44772 19.0523 8 18.5 8H16.5M8.5 8H16.5M16.5 2V8"
        stroke="#E1E2E2"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default PlugIcon

import React from "react"

function RepeatIcon({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 3L18 6L15 9L15 3Z"
        fill="#E1E2E2"
      />
      <path
        d="M9 15L6 18L9 21L9 15Z"
        fill="#E1E2E2"
      />
      <path
        d="M16 6H4V15M8 18H20V9"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}

export default RepeatIcon

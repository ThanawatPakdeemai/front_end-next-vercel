import React from "react"

function DropdownIcon({
  width = 12,
  height = 12
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.82915 6.69195L9.00375 4L9.65454 4.75926L5.82915 8.03817L2.00375 4.75926L2.65454 4L5.82915 6.69195Z"
        fill="#E1E2E2"
      />
    </svg>
  )
}

export default DropdownIcon

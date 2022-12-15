import React from "react"

function IconArrowLeft({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11 6.5L5.5 12M5.5 12L11 17.5M5.5 12H20"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default IconArrowLeft

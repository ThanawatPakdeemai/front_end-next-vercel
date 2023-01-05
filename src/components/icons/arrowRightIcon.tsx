import React from "react"

function IconArrowRight({
  width = 24,
  height = 24,
  className,
  stroke
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
        d="M13 6.5L18.5 12M18.5 12L13 17.5M18.5 12H4"
        stroke={stroke || "#E1E2E2"}
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default IconArrowRight

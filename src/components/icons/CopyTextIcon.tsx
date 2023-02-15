import React from "react"

function CopyTextIcon({
  width = 12,
  height = 12,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2.5"
        y="4.5"
        width="5"
        height="5"
        stroke="#A6A9AE"
      />
      <path
        d="M9 3H5H4V2H10V8H9V7V3Z"
        fill="#A6A9AE"
      />
    </svg>
  )
}
export default CopyTextIcon

import React from "react"

function SortIcon({
  width = 18,
  height = 18,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.29 14.29L12 18.59l-4.29-4.3a1 1 0 00-1.42 1.42l5 5a1 1 0 001.42 0l5-5a1 1 0 00-1.42-1.42zM7.71 9.71L12 5.41l4.29 4.3a1 1 0 001.42 0 1 1 0 000-1.42l-5-5a1 1 0 00-1.42 0l-5 5a1 1 0 001.42 1.42z" />
    </svg>
  )
}

export default SortIcon

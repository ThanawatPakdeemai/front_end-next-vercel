import React from "react"

function FilterIcon({
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
      <path d="M7 11h10v2H7zM4 7h16v2H4zm6 8h4v2h-4z" />
    </svg>
  )
}

export default FilterIcon

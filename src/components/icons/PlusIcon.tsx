import React from "react"

function IconPlus({
  width = 16,
  height = 16,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0V16M16 8H0"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
    </svg>
  )
}

const IconPlusIcon = {
  Ori: IconPlus
}

export default IconPlusIcon

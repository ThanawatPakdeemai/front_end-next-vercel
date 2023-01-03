import React from "react"

function PlusIcon({ width = 24, height = 24 }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4V20M20 12H4"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default PlusIcon

import React from "react"

function Inventory({ width = 24, height = 24 }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8V20H20V8M4 8L7 4M4 8H7M20 8L17 4M20 8H17M7 4H17M7 4V8M17 4V8M17 8H7"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
      <path
        d="M12 16L12 11M12 16L13 15L11 15L12 16Z"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
    </svg>
  )
}
export default Inventory

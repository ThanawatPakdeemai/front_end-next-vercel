import React from "react"

function IconSwap({
  width = 24,
  // height = 24,
  stroke = "#E1E2E2",
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 16H4.5L6 17.5L7.5 16H6ZM6 16V8C6 6.34315 7.34315 5 9 5C10.6569 5 12 6.34315 12 8V15C12 16.6569 13.3431 18 15 18C16.6569 18 18 16.6569 18 15V7M18 7H16.5L18 5.5L19.5 7H18Z"
        stroke={stroke || "#E1E2E2"}
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default IconSwap

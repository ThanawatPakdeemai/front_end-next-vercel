import React from "react"

function Withdraw({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 21V7M12 7L17 12M12 7L7 12M20 5H4"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default Withdraw

import React from "react"

function TransactionIconMKP({
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
        d="M2 7H14M2 11H14M2 15H10M12.5 15L16 18.5L22 12.5"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default TransactionIconMKP

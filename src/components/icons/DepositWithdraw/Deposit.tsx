import React from "react"

function Deposit({
  width = 25,
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
        d="M12.5 3V17M12.5 17L7.5 12M12.5 17L17.5 12M4.5 19H20.5"
        stroke="#010101"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default Deposit

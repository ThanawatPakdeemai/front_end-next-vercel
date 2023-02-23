import React from "react"

function ILock({
  width = 12,
  height = 16,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 8V5C10 2.79086 8.20914 1 6 1V1C3.79086 1 2 2.79086 2 5V8M10 8H2M10 8H10.9C10.9552 8 11 8.04477 11 8.1V14C11 14.5523 10.5523 15 10 15H2C1.44772 15 1 14.5523 1 14V8.1C1 8.04477 1.04477 8 1.1 8H2"
        stroke="#70727B"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default ILock

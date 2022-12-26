import React from "react"

function IOpenNew({
  width = 18,
  height = 18,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19 1.5L10 10.5M19 1.5H11.5M19 1.5V9M9 1.5H2C1.44772 1.5 1 1.94772 1 2.5V18.5C1 19.0523 1.44772 19.5 2 19.5H18C18.5523 19.5 19 19.0523 19 18.5V11.5"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default IOpenNew

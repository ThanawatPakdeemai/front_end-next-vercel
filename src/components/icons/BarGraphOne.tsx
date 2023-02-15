import React from "react"

function IconBarGraphOne({
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
        d="M6 17V8M10 17V10M14 17V14M18 17V8M3 20H21C21.5523 20 22 19.5523 22 19V5C22 4.44772 21.5523 4 21 4H3C2.44772 4 2 4.44772 2 5V19C2 19.5523 2.44772 20 3 20Z"
        stroke={stroke || "#E1E2E2"}
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default IconBarGraphOne

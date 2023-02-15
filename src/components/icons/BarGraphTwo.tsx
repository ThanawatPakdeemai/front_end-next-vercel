import React from "react"

function IconBarGraphTwo({
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
        d="M6 17.5V11.5M10 17.5V11.5M14 17.5V11.5M18 17.5V11.5M3 20.5H21C21.5523 20.5 22 20.0523 22 19.5V5.5C22 4.94772 21.5523 4.5 21 4.5H3C2.44772 4.5 2 4.94772 2 5.5V19.5C2 20.0523 2.44772 20.5 3 20.5Z"
        stroke={stroke || "#E1E2E2"}
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default IconBarGraphTwo

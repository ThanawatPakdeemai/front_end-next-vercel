import React from "react"

function SubstackIcon({
  width = 24,
  height = 24,
  fill
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 11.7973V19L12.4365 14.9595L7 19V11.7973H18ZM18 6V7.73333H7V6H18ZM7 8.96306H18V10.5676H7V8.96306Z"
        fill={fill || "#E1E2E2"}
      />
    </svg>
  )
}

export default SubstackIcon

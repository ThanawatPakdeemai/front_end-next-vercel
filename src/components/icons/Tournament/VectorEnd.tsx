import React from "react"

function Vector({
  width = 12,
  height = 12,
  color = "#232329"
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 1.49153L4 0V3.99999H0L1.49153 5.99999L1.74845e-07 7.99998H4V4H7.99998V0L6 1.49153ZM10.5085 6L12 4.00001H7.99998V7.99998H4V12L6 10.5085L7.99998 12V7.99998H12L10.5085 6Z"
        fill={color}
      />
    </svg>
  )
}
export default Vector

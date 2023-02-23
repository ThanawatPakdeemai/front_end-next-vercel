import React from "react"

function GasIcon({ width = 17, height = 19 }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 2C1 1.44772 1.44772 1 2 1L8 1C8.55228 1 9 1.44772 9 2V17H1L1 2Z"
        stroke="#4E5057"
        strokeWidth="1.2"
      />
      <path
        d="M2 10L6 3V8H8L4 15V10H2Z"
        fill="#4E5057"
      />
      <path
        d="M15.4142 4.58579C14.6331 3.80474 13.3668 3.80474 12.5858 4.58579C12.1952 4.97631 12 5.48815 12 6C12 6.51184 12.1952 7.02369 12.5858 7.41421C13.3668 8.19526 14.6331 8.19526 15.4142 7.41421C15.8047 7.02369 16 6.51184 16 6M15.4142 4.58579L11.8284 1M15.4142 4.58579C15.8047 4.97631 16 5.48815 16 6M16 6L16 15.5C16 16.6046 15.1045 17.5 14 17.5C12.8954 17.5 12 16.6046 12 15.5L12 11C12 10.4477 11.5523 10 11 10H9"
        stroke="#4E5057"
        strokeWidth="1.2"
      />
    </svg>
  )
}
export default GasIcon

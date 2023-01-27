import React from "react"

function Discusion({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 5H19C19.5523 5 20 5.44772 20 6V10L22 12L20 14V18C20 18.5523 19.5523 19 19 19H4C3.44772 19 3 18.5523 3 18V6C3 5.44772 3.44772 5 4 5Z"
        stroke="#70727B"
        strokeWidth="1.2"
      />
      <path
        d="M13 12C13 12.8284 12.3284 13.5 11.5 13.5C10.6716 13.5 10 12.8284 10 12C10 11.1716 10.6716 10.5 11.5 10.5C12.3284 10.5 13 11.1716 13 12Z"
        fill="#70727B"
      />
      <path
        d="M8.5 12C8.5 12.8284 7.82843 13.5 7 13.5C6.17157 13.5 5.5 12.8284 5.5 12C5.5 11.1716 6.17157 10.5 7 10.5C7.82843 10.5 8.5 11.1716 8.5 12Z"
        fill="#70727B"
      />
      <path
        d="M17.5 12C17.5 12.8284 16.8284 13.5 16 13.5C15.1716 13.5 14.5 12.8284 14.5 12C14.5 11.1716 15.1716 10.5 16 10.5C16.8284 10.5 17.5 11.1716 17.5 12Z"
        fill="#70727B"
      />
    </svg>
  )
}
export default Discusion

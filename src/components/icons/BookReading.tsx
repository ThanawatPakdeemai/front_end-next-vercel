import React from "react"

function IBookReading({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 19.4V9C15.7895 9 12 11.6 12 11.6C12 11.6 8.21053 9 3 9V19.4C8.21053 19.4 12 22 12 22C12 22 15.7895 19.4 21 19.4Z"
        stroke="#010101"
        stroke-width="1.2"
      />
      <path
        d="M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z"
        stroke="#010101"
        stroke-width="1.2"
      />
    </svg>
  )
}

export default IBookReading

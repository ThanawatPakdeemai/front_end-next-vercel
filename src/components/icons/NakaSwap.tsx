import React from "react"

function INakaSwap({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.5 16H5L6.5 17.5L8 16H6.5ZM6.5 16V8C6.5 6.34315 7.84315 5 9.5 5C11.1569 5 12.5 6.34315 12.5 8V15C12.5 16.6569 13.8431 18 15.5 18C17.1569 18 18.5 16.6569 18.5 15V7M18.5 7H17L18.5 5.5L20 7H18.5Z"
        stroke="#010101"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default INakaSwap

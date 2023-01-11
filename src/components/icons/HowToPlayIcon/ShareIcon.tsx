import React from "react"

function ShareIcon({
  width = 24,
  height = 24,
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.6833 7.26367L8.18359 10.809M14.6833 16.7367L8.18359 13.1914"
        stroke="#A6A9AE"
        stroke-width="1.2"
      />
      <path
        d="M19.4 6C19.4 7.32548 18.3255 8.4 17 8.4C15.6745 8.4 14.6 7.32548 14.6 6C14.6 4.67452 15.6745 3.6 17 3.6C18.3255 3.6 19.4 4.67452 19.4 6ZM8.4 12C8.4 13.3255 7.32548 14.4 6 14.4C4.67452 14.4 3.6 13.3255 3.6 12C3.6 10.6745 4.67452 9.6 6 9.6C7.32548 9.6 8.4 10.6745 8.4 12ZM19.4 18C19.4 19.3255 18.3255 20.4 17 20.4C15.6745 20.4 14.6 19.3255 14.6 18C14.6 16.6745 15.6745 15.6 17 15.6C18.3255 15.6 19.4 16.6745 19.4 18Z"
        stroke="#A6A9AE"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default ShareIcon

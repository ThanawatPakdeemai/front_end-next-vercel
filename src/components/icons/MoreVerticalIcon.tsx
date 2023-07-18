import React from "react"

function MoreVerticalIcon({
  width = 24,
  height = 24,
  stroke = "#E1E2E2",
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 5.9C10.9507 5.9 10.1 5.04934 10.1 4C10.1 2.95066 10.9507 2.1 12 2.1C13.0493 2.1 13.9 2.95066 13.9 4C13.9 5.04934 13.0493 5.9 12 5.9ZM12 13.4C10.9507 13.4 10.1 12.5493 10.1 11.5C10.1 10.4507 10.9507 9.6 12 9.6C13.0493 9.6 13.9 10.4507 13.9 11.5C13.9 12.5493 13.0493 13.4 12 13.4ZM12 20.9C10.9507 20.9 10.1 20.0493 10.1 19C10.1 17.9507 10.9507 17.1 12 17.1C13.0493 17.1 13.9 17.9507 13.9 19C13.9 20.0493 13.0493 20.9 12 20.9Z"
        stroke={stroke}
        stroke-width="1.2"
      />
    </svg>
  )
}

export default MoreVerticalIcon

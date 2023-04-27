import React from "react"

function SportEsportIcon({
  width = 24,
  height = 24,
  stroke = "#E1E2E2",
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
        d="M12.2593 15.3168H8.11047L5.60375 17.5912C4.52494 18.57 2.81083 17.6632 3.01702 16.2226L4.09858 8.6664C4.31757 7.13643 5.63043 6 7.17894 6H16.8211C18.3696 6 19.6824 7.13643 19.9014 8.6664L20.983 16.2226C21.1892 17.6632 19.4751 18.57 18.3962 17.5912L15.8895 15.3168H11.7407"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M17 11.5C17.2761 11.5 17.5 11.7239 17.5 12C17.5 12.2761 17.2761 12.5 17 12.5C16.7239 12.5 16.5 12.2761 16.5 12C16.5 11.7239 16.7239 11.5 17 11.5Z"
        fill={stroke}
      />
      <path
        d="M15.5 8.5C15.7761 8.5 16 8.72386 16 9C16 9.27614 15.7761 9.5 15.5 9.5C15.2239 9.5 15 9.27614 15 9C15 8.72386 15.2239 8.5 15.5 8.5Z"
        fill={stroke}
      />
      <path
        d="M9 13V8M6.5 10.5H11.5M17.5 12V12C17.5 12.2761 17.2761 12.5 17 12.5V12.5C16.7239 12.5 16.5 12.2761 16.5 12V12C16.5 11.7239 16.7239 11.5 17 11.5V11.5C17.2761 11.5 17.5 11.7239 17.5 12ZM16 9V9C16 9.27614 15.7761 9.5 15.5 9.5V9.5C15.2239 9.5 15 9.27614 15 9V9C15 8.72386 15.2239 8.5 15.5 8.5V8.5C15.7761 8.5 16 8.72386 16 9Z"
        stroke={stroke}
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default SportEsportIcon

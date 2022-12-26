import React from "react"

function DollarPaperIcon({
  width = 24,
  height = 24
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
        d="M12 7V9M12 17V15M9.39844 15H13.9C13.9552 15 14 14.9552 14 14.9V12.1C14 12.0448 13.9552 12 13.9 12H10.1C10.0448 12 10 11.9552 10 11.9V9.1C10 9.04477 10.0448 9 10.1 9H14.6055M3.99679 19C9.18206 19 17.217 19 20.0062 19C20.5585 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.4445 19 3.99679 19Z"
        stroke="#E1E2E2"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default DollarPaperIcon

import React from "react"

function FacebookIcon({
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
        d="M14.7334 7.32403H16V5.09804C15.3867 5.03178 14.7706 4.99907 14.154 5.00002C12.3215 5.00002 11.0683 6.16204 11.0683 8.29003V10.124H9V12.616H11.0683V19H13.5476V12.616H15.6092L15.9192 10.124H13.5476V8.53503C13.5476 7.80003 13.7363 7.32403 14.7334 7.32403Z"
        fill="#E1E2E2"
      />
    </svg>
  )
}

export default FacebookIcon

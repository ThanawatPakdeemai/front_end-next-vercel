import React from "react"

function FireOutLineIcon({
  width = 24,
  height = 25,
  stroke,
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
        d="M8.07685 10.9773L8.40616 10.4941L8.07685 10.9773C8.17376 11.0434 8.27924 11.0789 8.37843 11.0919C9.47392 11.2352 10.3846 10.9098 11.0966 10.2923C11.7897 9.6911 12.2711 8.8357 12.5976 7.93348C13.1265 6.47173 13.296 4.75523 13.2156 3.41872C15.8669 4.62369 19.9 7.95873 19.9 14.25C19.9 18.4582 16.3801 21.9 12 21.9C7.61994 21.9 4.1 18.4582 4.1 14.25C4.1 11.8903 5.20374 9.77483 6.94798 8.36847C6.99207 8.83725 7.06726 9.25183 7.17644 9.61012C7.35235 10.1874 7.63466 10.676 8.07685 10.9773Z"
        stroke={stroke}
        stroke-width="1.2"
      />
    </svg>
  )
}
export default FireOutLineIcon

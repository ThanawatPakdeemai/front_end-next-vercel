import React from "react"

function LinkIcon({
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
        d="M16.2427 13.4142L19.0711 10.5857C20.6332 9.02365 20.6332 6.49099 19.0711 4.92889V4.92889C17.509 3.36679 14.9763 3.36679 13.4142 4.92889L10.5858 7.75732M13.4142 16.2426L10.5858 19.071C9.02372 20.6331 6.49106 20.6331 4.92897 19.071V19.071C3.36687 17.5089 3.36687 14.9763 4.92897 13.4142L7.75739 10.5857M15.5356 8.46442L8.4645 15.5355"
        stroke="#70727B"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default LinkIcon

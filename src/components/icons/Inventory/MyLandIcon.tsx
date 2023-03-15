import React from "react"

function MyLandIcon({
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
        d="M8 10L11 13L16 8M19 10C19 13.111 14.4672 18.3381 12.6967 20.2612C12.3176 20.6729 11.6824 20.6729 11.3033 20.2612C9.53278 18.3381 5 13.111 5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10Z"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default MyLandIcon

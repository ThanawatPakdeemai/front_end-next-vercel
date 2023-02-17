import React from "react"

function FriendsActivitiesIcon({
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
        d="M4 15L8 11L12 15L20 7M4 15V20H21M4 15V4M20 7H16M20 7V11"
        stroke="#E1E2E2"
        stroke-width="1.2"
      />
    </svg>
  )
}
export default FriendsActivitiesIcon

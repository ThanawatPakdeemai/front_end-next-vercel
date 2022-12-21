import React from "react"

function StoryBoardIcon({
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
        d="M9 4L3.06838 5.97721C3.02754 5.99082 3 6.02903 3 6.07208V20.8613C3 20.9295 3.06687 20.9777 3.13162 20.9561L9 19M9 4L15 6M9 4V19M15 6L20.8684 4.04387C20.9331 4.02229 21 4.07049 21 4.13874V18.9279C21 18.971 20.9725 19.0092 20.9316 19.0228L15 21M15 6V21M15 21L9 19"
        strokeWidth={1.2}
      />
    </svg>
  )
}

export default StoryBoardIcon

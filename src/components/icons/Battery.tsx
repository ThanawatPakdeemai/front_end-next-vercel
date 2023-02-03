import React from "react"

function IBattery({
  width = 24,
  height = 24,
  className,
  color
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20.4 14.5L20.4 17.4L2.6 17.4L2.6 6.6L20.4 6.6L20.4 9.5L20.4 10.1L21 10.1L22.4 10.1L22.4 13.9L21 13.9L20.4 13.9L20.4 14.5Z"
        stroke={color || "#F42728"}
        stroke-width="1.2"
      />
      <rect
        x="15"
        y="7"
        width="10"
        height="12"
        transform="rotate(90 15 7)"
        fill={color || "#F42728"}
      />
    </svg>
  )
}

export default IBattery

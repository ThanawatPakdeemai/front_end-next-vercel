import React from "react"

function ISignalTube({
  width = 70,
  height = 10,
  className,
  color
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width="2"
        height="6"
        fill={color || "#F42728"}
      />
      <rect
        x="5"
        width="2"
        height="6"
        fill={color || "#F42728"}
      />
      <rect
        x="10"
        width="2"
        height="6"
        fill={color || "#F42728"}
      />
      <rect
        x="15"
        width="2"
        height="6"
        fill={color || "#F42728"}
      />
      <rect
        x="20"
        width="2"
        height="6"
        fill={color || "#F42728"}
      />
      <rect
        x="25"
        width="2"
        height="6"
        fill={color || "#F42728"}
      />
      <rect
        x="30"
        width="2"
        height="6"
        fill={color || "#F42728"}
      />
      <rect
        x="35"
        width="2"
        height="6"
        fill="#232329"
      />
      <rect
        x="40"
        width="2"
        height="6"
        fill="#232329"
      />
    </svg>
  )
}

export default ISignalTube

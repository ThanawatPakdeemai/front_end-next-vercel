import React from "react"

function IconArrowUpBorder({
  width = 24,
  height = 24,
  stroke = "E1E2E2",
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path
        d="M12 21L20 21C20.5523 21 21 20.5523 21 20L21 4C21 3.44771 20.5523 3 20 3L4 3C3.44771 3 3 3.44772 3 4L3 20C3 20.5523 3.44772 21 4 21L12 21ZM12 21L12 9M12 9L7 14M12 9L17 14"
        stroke={stroke || "#E1E2E2"}
        stroke-width="1.2"
      />
    </svg>
  )
}

export default IconArrowUpBorder

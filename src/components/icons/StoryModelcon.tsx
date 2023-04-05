import React from "react"

function StoryModeIcon({
  width = 24,
  height = 24,
  stroke = "#E1E2E2",
  className
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 2C6.44772 2 6 2.44772 6 3V20H5C4.44772 20 4 20.4477 4 21C4 21.5523 4.44772 22 5 22H9C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20H8V3C8 2.44772 7.55228 2 7 2Z"
        fill={stroke || "#98A0B5"}
      />
      <path
        d="M10 14.5C10 15.3331 10.6781 16 11.5018 16H18.498C19.6403 16 20.3675 14.7715 19.8088 13.7695L17.7069 10L19.8088 6.23051C20.3675 5.22854 19.6403 4 18.498 4H11.5018C10.6781 4 10 4.66686 10 5.5V14.5Z"
        fill={stroke || "#98A0B5"}
      />
    </svg>
  )
}

export default StoryModeIcon

import React from "react"

function CircleNakaIcon({
  width = 34,
  height = 34
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width={width}
        height={height}
        rx="17"
        fill="#F42728"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.0473 13.5C10.5835 13.5 10.1667 13.5 10.1667 12.7395V11.5L8 11.5V14.5H5V16.5H9L8 17V17.5H6V19.5H10L8.73736 20.1313C9.61702 21.559 11.1971 22.5 13 22.5C14.6356 22.5 16.0878 21.7147 17 20.5005C17.9122 21.7147 19.3644 22.5 21 22.5C22.8029 22.5 24.383 21.559 25.2626 20.1313L24 19.5H28V17.5H26V17L25 16.5H29V14.5H26V11.5H23.8333V12.7395C23.8333 13.5 23.3333 13.5 22.9527 13.5H11.0473ZM16 16.5L15 17C15 18.1046 14.1046 19 13 19C11.8954 19 11 18.1046 11 17L10 16.5H16ZM24 16.5L23 17C23 18.1046 22.1046 19 21 19C19.8954 19 19 18.1046 19 17L18 16.5H24Z"
        fill="#F1F4F4"
      />
    </svg>
  )
}

export default CircleNakaIcon

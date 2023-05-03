import * as React from "react"

const DownloadIcons = ({
  width = 16,
  height = 17,
  color = "#E1E2E2"
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 0V14M8 14L3 9M8 14L13 9M0 16H16"
      stroke={color}
      strokeWidth="1.2"
    />
  </svg>
)
export default DownloadIcons

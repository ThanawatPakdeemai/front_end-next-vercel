import React from "react"

const MusicGameIcon = ({
  width = 24,
  height = 24,
  className,
  stroke = "#E1E2E2"
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8.40234 18.1742L8.40234 7.78977M20.396 18.0202V6.78978M20.396 6.78978V4L8.40234 5V7.78977M20.396 6.78978L8.40234 7.78977"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <path
      d="M8.4 18.1006C8.4 19.2698 7.21228 20.4001 5.5 20.4001C3.78772 20.4001 2.6 19.2698 2.6 18.1006C2.6 16.9314 3.78772 15.8012 5.5 15.8012C7.21228 15.8012 8.4 16.9314 8.4 18.1006ZM20.4 18.1006C20.4 19.2698 19.2123 20.4001 17.5 20.4001C15.7877 20.4001 14.6 19.2698 14.6 18.1006C14.6 16.9314 15.7877 15.8012 17.5 15.8012C19.2123 15.8012 20.4 16.9314 20.4 18.1006Z"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default MusicGameIcon

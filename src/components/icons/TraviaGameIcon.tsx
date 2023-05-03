import React from "react"

const TraviaGameIcon = ({
  width = 25,
  height = 24,
  className,
  stroke = "#E1E2E2"
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.85547 20H12.8555M17.8555 20H12.8555M12.8555 20V17M12.8555 17H4.85547C4.30318 17 3.85547 16.5523 3.85547 16V6C3.85547 5.44772 4.30318 5 4.85547 5H20.8555C21.4078 5 21.8555 5.44772 21.8555 6V16C21.8555 16.5523 21.4078 17 20.8555 17H12.8555Z"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <path
      d="M6.85547 9H18.8555M6.85547 13H16.8555"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default TraviaGameIcon

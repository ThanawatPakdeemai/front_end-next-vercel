import React from "react"

const EducationalGameIcon = ({
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
      d="M22.1367 17V9M18.5 10.6667L21.5 9L12.5 4L3.5 9L6.5 10.6667M18.5 10.6667L12.5 14L6.5 10.6667M18.5 10.6667V16.5L12.5 20L6.5 16.5V10.6667"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default EducationalGameIcon

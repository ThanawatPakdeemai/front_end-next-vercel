import React from "react"

const CardGameIcon = ({
  width = 24,
  height = 24,
  className,
  stroke
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
      d="M9.96058 7.36926C8.55809 7.36926 7.42114 8.51011 7.42114 9.91743C7.42114 10.4911 7.45948 11.1878 8.1102 11.9495C8.76091 12.7113 12.5 16.6307 12.5 16.6307C12.5 16.6307 16.2391 12.7113 16.8898 11.9495C17.5405 11.1878 17.5789 10.4911 17.5789 9.91743C17.5789 8.51011 16.4419 7.36926 15.0394 7.36926C13.637 7.36926 12.5 8.51011 12.5 9.91743C12.5 8.51011 11.3631 7.36926 9.96058 7.36926Z"
      stroke={stroke}
      strokeWidth="1.2"
    />
    <path
      d="M4.5 2C4.5 1.44772 4.94772 1 5.5 1H19.5C20.0523 1 20.5 1.44772 20.5 2V22C20.5 22.5523 20.0523 23 19.5 23H5.5C4.94772 23 4.5 22.5523 4.5 22V2Z"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default CardGameIcon

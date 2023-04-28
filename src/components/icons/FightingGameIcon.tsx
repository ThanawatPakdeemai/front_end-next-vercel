import React from "react"

const FightingGameIcon = ({
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
      d="M16.5 10V8M16.5 8V5C16.5 4.44772 16.0523 4 15.5 4H7.5C6.94772 4 6.5 4.44772 6.5 5V10.8769C6.5 10.9587 6.51003 11.0401 6.52986 11.1194L7.48106 14.9243C7.49219 14.9688 7.53219 15 7.57808 15H17.4219C17.4678 15 17.5078 14.9688 17.5189 14.9243L18.4701 11.1194C18.49 11.0401 18.5 10.9587 18.5 10.8769V9C18.5 8.44772 18.0523 8 17.5 8H16.5ZM8.5 17.5V19.9C8.5 19.9552 8.54477 20 8.6 20H16.4C16.4552 20 16.5 19.9552 16.5 19.9V17.5H8.5ZM9.5 8V9H13.5V8H9.5Z"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default FightingGameIcon

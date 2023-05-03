import React from "react"

const PuzzleGameIcon = ({
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
      d="M12 8C13.6569 8 15 6.65685 15 5H19V9C20.6569 9 22 10.3431 22 12C22 13.6569 20.6569 15 19 15V19H15C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19H5V15C3.34315 15 2 13.6569 2 12C2 10.3431 3.34315 9 5 9L5 5H9C9 6.65685 10.3431 8 12 8Z"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default PuzzleGameIcon

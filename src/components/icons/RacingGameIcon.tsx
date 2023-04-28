import React from "react"

const RacingGameIcon = ({
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
      d="M7.5 7.00668C9.10126 5.78209 11.221 5 14 5C17.866 5 21 8.13401 21 12C21 15.866 17.866 19 14 19C13.6329 18.9871 7.62242 18.9929 3.93077 18.9985C3.40549 18.9993 2.96818 18.5935 2.96307 18.0683C2.95128 16.8585 3.07119 15.4435 3.39592 14M7.5 7.00668L11.7394 9.32834C12.4925 9.75907 13 10.5703 13 11.5C13 12.8807 11.8807 14 10.5 14H3.39592M7.5 7.00668C5.20476 8.762 3.97485 11.4265 3.39592 14"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default RacingGameIcon

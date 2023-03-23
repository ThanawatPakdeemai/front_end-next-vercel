import * as React from "react"

const WandIcon = ({
  width = 24,
  height = 24,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.5407 9.32199L14.9585 9.36381L12.6405 6.85193L13.7364 3.6144L10.6312 5.04273L7.89074 3L8.28958 6.39463L5.5 8.36969L8.85174 9.03936L9.8681 12.3027L11.5407 9.32199ZM11.5407 9.32199L18.3907 21.1865"
      stroke="#010101"
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
  </svg>
)

export default WandIcon

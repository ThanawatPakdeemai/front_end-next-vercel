import React from "react"

const StrategyGameIcon = ({
  width = 24,
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
      d="M9.85547 4L3.92385 5.97721C3.88301 5.99082 3.85547 6.02903 3.85547 6.07208V20.8613C3.85547 20.9295 3.92234 20.9777 3.98709 20.9561L9.85547 19M9.85547 4L15.8555 6M9.85547 4V19M15.8555 6L21.7238 4.04387C21.7886 4.02229 21.8555 4.07049 21.8555 4.13874V18.9279C21.8555 18.971 21.8279 19.0092 21.7871 19.0228L15.8555 21M15.8555 6V21M15.8555 21L9.85547 19"
      stroke={stroke}
      strokeWidth="1.2"
    />
  </svg>
)

export default StrategyGameIcon

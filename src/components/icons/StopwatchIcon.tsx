import { SVGProps } from "react"

const StopwatchIcon = ({
  width = 24,
  height = 24,
  className,
  stroke
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 10.7693 20.1884 8.72806 18.8444 7.15559M12 4C14.7398 4 17.1937 5.22427 18.8444 7.15559M12 4V3M12 7.5V14M21 5L18.8444 7.15559M12 3H10M12 3H14"
      stroke={stroke}
      strokeWidth={1.2}
    />
  </svg>
)
export default StopwatchIcon
